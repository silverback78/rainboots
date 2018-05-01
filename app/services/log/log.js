// Allowing magic numbers for function overloading
/* eslint no-magic-numbers: 0 */

// Not using console, simply checking to see if it supports colors. Using $log service to actually log.
/* eslint no-console: 0 */

'use strict';

angular.module('rainboots')

  /**
   * Summary. Factory for logging information.
   *
   * Description. The log factory should log to the console in the development environment, and to the database
   *              in production environment. It should utilize colors when available and coherently display the
   *              current stack, comment, and any objects associated with the log.
   *
   *              Examples:
   *
   *              // With a single level stack as a string
   *              log.setStack('controller', 'ViewController');
   *              logs: controller: ViewController -> called
   *
   *              // With an array as the stack
   *              log.setStack('controller', ['ViewController', 'getData()', 'api.getData().then()'])
   *              logs: controller: ViewController -> getData() -> api.getData().then() -> called
   *
   *              // With the stack set, you can log a comment. You can use debug, warn, or error.
   *              log.debug('Checking to see if data exists');
   *              logs:  controller: ViewController -> getData() -> api.getData().then() // Checking to see if data exists
   *
   *              // You can pass an object as a second parameter to log data
   *              log.debug('data', data);
   *              logs:  controller: ViewController -> getData() -> api.getData().then() -> data = { value1: 'One', value2: 'Two' }
   *
   * setStack(string, string|array)
   *              sets the current code block and stack for this log. Code block and stack will persist until it is changed.
   *              A code block is the type of code block currently running. It can be an angular block such as
   *              controller or factory, or a plain javascript code block. It will log an error if you attempt to
   *              set a code block not listed in enums.codeBlocks.
   *
   *              @param {string} codeBlock          One of the code blocks from enums.codeBlocks.
   *              @param {string|array} stack        A string or an array that makes up the current stack.
   *              @return {void}
   *
   * debug(string, object)
   *              will log a debug message, including the current code block and stack. It will also
   *              log the contents of an object if passed.
   *
   *              @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
   *              @param {object} object             An object to be stringified and logged.
   *              @return {void}
   *
   * warn(string, object)
   *              will log a warn message, including the current code block and stack. It will also
   *              log the contents of an object if passed.
   *
   *              @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
   *              @param {object} object             An object to be stringified and logged.
   *              @return {void}
   *
   * error(string, object)
   *              will log an error message, including the current code block and stack. It will also
   *              log the contents of an object if passed.
   *
   *              @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
   *              @param {object} object             An object to be stringified and logged.
   *              @return {void}
   *
   * reset()
   *              Resets the code block and stack.
   *
   *              @return {void}
   */
  .factory('log', ['$log', 'enums', 'environment', 'features', function($log, enums, env, features) {
    var logServiceConfig = {
      setStackCalled: 'called',
      severities: {
        debug: 'debug',
        warn: 'warn',
        error: 'error'
      },

      errors: {
        codeBlockError: function(cb) {
          return 'Error setting code block: ' + cb + ' is not a valid code block.';
        },
        nocodeBlock: 'Warning: No code block is set',
        warn: 'Warning: ',
        error: 'Error: '
      },

      separators: {
        comment: ' // ',
        data: ' -> ',
        log: ': ',
        equals: ' = ',
        style: '%c'
      },

      styles: {
        warn: 'color: #493a05',
        error: 'color: #f00; font-weight: bold;',
        comment: 'color: #090;',
        data: 'color: #222',
        controller: 'color: #015eb5;',
        directive: 'color: #31a7d6;',
        filter: 'color: #18979b;',
        service: 'color: #ae06ba;',
        factory: 'color: #ae06ba;',
        constant: 'font-weight: bold; color: #493a05;',
        value: 'color: #493a05;',
        decorator: 'color: #f76f9e;',
        provider: 'color: #c61930;',
        run: 'color: #222',
        javascript: 'color: #222;'
      }
    };

    var codeBlock = '';
    var stack = '';

    var setStack = function(cb, st) {
      if (env.environment !== enums.environments.dev || !features.log.enabled) return {};

      if (logServiceConfig.styles.hasOwnProperty(cb)) {
        codeBlock = cb;
      }
      else {
        $log.error(logServiceConfig.errors.codeBlockError(cb));
      }

      stack = angular.isArray(st)
        ? st
        : [st];

      writeLog(logServiceConfig.severities.debug, logServiceConfig.setStackCalled);
    };

    var writeLog = function (logSeverity, info, obj) {
      if (env.environment !== enums.environments.dev || !features.log.enabled) return {};

      var logMessage = [];

      if (!codeBlock) {
        logMessage.push(logServiceConfig.errors.nocodeBlock);
        logMessage.push(logServiceConfig.separators.log);
        logMessage.push(angular.isArray(stack)
          ? stack.join(logServiceConfig.separators.data)
          : '');
        logMessage.push(logServiceConfig.separators.comment, info);
        if (obj) {
          logMessage.push(logServiceConfig.separators.log, angular.toJson(obj));
        }
        $log.warn(logMessage.join(''));
        return;
      }

      var stylesEnabled = console.debug.length === 1 && features.log.styles;
      var infoStyle;

      var stackStyle = logSeverity === logServiceConfig.severities.warn
        ? logServiceConfig.styles.warn
        : logSeverity === logServiceConfig.severities.error
          ? logServiceConfig.styles.error
          : logServiceConfig.styles[codeBlock];
      stack = stack || [];

      logMessage.push(stylesEnabled
        ? logServiceConfig.separators.style
        : '');

      logMessage.push(logSeverity === logServiceConfig.severities.warn || logSeverity === logServiceConfig.severities.error
        ? logServiceConfig.errors[logSeverity]
        : '');

      logMessage.push(codeBlock, logServiceConfig.separators.log, stack.join(logServiceConfig.separators.data));

      if (obj) {
        logMessage.push(logServiceConfig.separators.data, info, logServiceConfig.separators.equals);

        logMessage.push(stylesEnabled
          ? logServiceConfig.separators.style
          : '');

        logMessage.push(angular.toJson(obj));
        infoStyle = logSeverity === logServiceConfig.severities.warn
          ? logServiceConfig.styles.warn
          : logSeverity === logServiceConfig.severities.error
            ? logServiceConfig.styles.error
            : logServiceConfig.styles.data;
      }
      else {
        logMessage.push(stylesEnabled
          ? logServiceConfig.separators.style
          : '');

        logMessage.push(info === logServiceConfig.setStackCalled
          ? logServiceConfig.separators.data
          : logServiceConfig.separators.comment
        );

        logMessage.push(info);
        infoStyle = logSeverity === logServiceConfig.severities.warn
          ? logServiceConfig.styles.warn
          : logSeverity === logServiceConfig.severities.error
            ? logServiceConfig.styles.error
            : info === logServiceConfig.setStackCalled
              ? logServiceConfig.styles.data
              : logServiceConfig.styles.comment;
      }

      if (stylesEnabled) {
        $log[logSeverity](logMessage.join(''), stackStyle, infoStyle);
      }
      else {
        $log[logSeverity](logMessage.join(''));
      }
    };

    var reset = function() {
      codeBlock = '';
      stack = '';
    };

    return {
      setStack: setStack,
      debug: function(info, obj) {
        writeLog(logServiceConfig.severities.debug, info, obj);
      },
      warn: function(info, obj) {
        writeLog(logServiceConfig.severities.warn, info, obj);
      },
      error: function(info, obj) {
        writeLog(logServiceConfig.severities.error, info, obj);
      },
      reset: function() {
        reset();
      }
    };
  }]);
