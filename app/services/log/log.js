// Not using console, simply checking to see if it supports colors. Using $log service to actually log.
/* eslint no-console: 0 */

'use strict';

angular.module('rainboots')

  /**
   * Summary.     Factory for logging information.
   *
   * Description. The log factory should log to the console in the development environment, and to the database
   *              in production environment. It should utilize colors when available and coherently display the
   *              current stack, comment, and any objects associated with the log.
   *
   *              Because logging is frequently run, in many areas code readability was sacrificed for speed.
   *
   *              Examples:
   *
   *              // With a single level stack as a string
   *              log.setStack('controller', 'ViewController');
   *              output: controller: ViewController -> called
   *
   *              // With an array as the stack
   *              log.setStack('controller', ['ViewController', 'getData()', 'api.getData().then()'])
   *              output: controller: ViewController -> getData() -> api.getData().then() -> called
   *
   *              // With the stack set, you can log a comment. You can use debug, warn, or error.
   *              log.debug('Checking to see if data exists');
   *              output:  controller: ViewController -> getData() -> api.getData().then() // Checking to see if data exists
   *
   *              // You can pass an object as a second parameter to log data
   *              log.debug('data', data);
   *              output:  controller: ViewController -> getData() -> api.getData().then() -> data = { value1: 'One', value2: 'Two' }
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
  .factory('log', ['$log', 'config', 'enums.env', function($log, config, env) {
    var codeBlock = '';
    var stack = '';

    var setStack = function(codeBlockParam, stackParam) {
      var logsDisabled = config.env !== env.dev || !config.features.log.enabled;
      var validCodeBlock = config.features.log.styles.hasOwnProperty(codeBlockParam);

      if (logsDisabled) return {};      

      if (validCodeBlock) {
        codeBlock = codeBlockParam;
      }
      else {
        $log.error(config.features.log.errors.codeBlockError.replace('{codeBlock}', codeBlockParam));
      }

      stack = angular.isArray(stackParam)
        ? stackParam
        : [stackParam];

      writeLog(config.features.log.severities.debug, config.features.log.setStackCalled);
    };

    var writeLog = function (logSeverity, info, obj) {
      var logsDisabled = config.env !== env.dev || !config.features.log.enabled;
      if (logsDisabled) return {};

      var logMessage = [];

      if (!codeBlock) {
        logMessage.push(config.features.log.errors.noCodeBlock);
        logMessage.push(config.features.log.separators.log);
        logMessage.push(angular.isArray(stack)
          ? stack.join(config.features.log.separators.data)
          : '');
        logMessage.push(config.features.log.separators.comment, info);
        if (obj) {
          logMessage.push(config.features.log.separators.log, angular.toJson(obj));
        }
        $log.warn(logMessage.join(''));
        return;
      }

      var styleParamPosition = 1;
      var stylesEnabled = console.debug.length === styleParamPosition && config.features.log.stylesEnabled;
      var infoStyle;

      var stackStyle = logSeverity === config.features.log.severities.warn
        ? config.features.log.styles.warn
        : logSeverity === config.features.log.severities.error
          ? config.features.log.styles.error
          : config.features.log.styles[codeBlock];

      stack = stack || [];

      logMessage.push(stylesEnabled
        ? config.features.log.separators.style
        : '');

      logMessage.push(logSeverity === config.features.log.severities.warn || logSeverity === config.features.log.severities.error
        ? config.features.log.errors[logSeverity]
        : '');

      logMessage.push(codeBlock, config.features.log.separators.log, stack.join(config.features.log.separators.data));

      if (obj) {
        logMessage.push(config.features.log.separators.data, info, config.features.log.separators.equals);

        logMessage.push(stylesEnabled
          ? config.features.log.separators.style
          : '');

        logMessage.push(angular.toJson(obj));
        infoStyle = logSeverity === config.features.log.severities.warn
          ? config.features.log.styles.warn
          : logSeverity === config.features.log.severities.error
            ? config.features.log.styles.error
            : config.features.log.styles.data;
      }
      else {
        logMessage.push(stylesEnabled
          ? config.features.log.separators.style
          : '');

        logMessage.push(info === config.features.log.setStackCalled
          ? config.features.log.separators.data
          : config.features.log.separators.comment
        );

        logMessage.push(info);
        infoStyle = logSeverity === config.features.log.severities.warn
          ? config.features.log.styles.warn
          : logSeverity === config.features.log.severities.error
            ? config.features.log.styles.error
            : info === config.features.log.setStackCalled
              ? config.features.log.styles.data
              : config.features.log.styles.comment;
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
        writeLog(config.features.log.severities.debug, info, obj);
      },
      warn: function(info, obj) {
        writeLog(config.features.log.severities.warn, info, obj);
      },
      error: function(info, obj) {
        writeLog(config.features.log.severities.error, info, obj);
      },
      reset: function() {
        reset();
      }
    };
  }]);
