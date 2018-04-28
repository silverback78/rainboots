// Allowing magic numbers for function overloading
/* eslint no-magic-numbers: 0 */

// Not using console, simply checking to see if it supports colors. Using $log service to actually log.
/* eslint no-console: 0 */

'use strict';

angular.module('rainboots')

  /**
   * Summary.     logServiceConfig is the configuration object for the log factory.
   *
   * Description. This object contains all text strings, styles, named items and so on used in log factory.
   **/
  .constant('logServiceConfig', {
    setStackCalled: 'entered',
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
  })

  /**
   * Summary. Factory for logging information.
   *
   * Description. The log factory should log to the console in the development environment, and to the database
   *              in production environment. It should utilize colors when available and coherently display the
   *              current stack, comment, and any objects associated with the log.
   *
   * Supoprts the following functions:
   *
   * setStack(string, string|array)
   *                  sets the current code block and stack for this log. Code block and stack will persist until it is changed.
   *                  A code block is the type of code block currently running. It can be an angular block such as
   *                  controller or factory, or a plain javascript code block. It will log an error if you attempt to
   *                  set a code block not listed in constants.enums.codeBlocks.
   *
   *                  @param {string} codeBlock          One of the code blocks from constants.enums.codeBlocks.
   *                  @param {string|array} stack        A string or an array that makes up the current stack.
   *                  @return {void}
   *
   * debug(string, object)
   *                  will log a debug message, including the current code block and stack. It will also
   *                  log the contents of an object if passed.
   *
   *                  @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
   *                  @param {object} object             An object to be stringified and logged.
   *                  @return {void}
   *
   * warn(string, object)
   *                  will log a warn message, including the current code block and stack. It will also
   *                  log the contents of an object if passed.
   *
   *                  @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
   *                  @param {object} object             An object to be stringified and logged.
   *                  @return {void}
   *
   * error(string, object)
   *                  will log an error message, including the current code block and stack. It will also
   *                  log the contents of an object if passed.
   *
   *                  @param {string} comment|name       A string that acts as the comment, or the name of an object if an object is passed.
   *                  @param {object} object             An object to be stringified and logged.
   *                  @return {void}
   */
  .factory('log', ['$log', 'constants', 'logServiceConfig', function($log, constants, logServiceConfig) {
    var codeBlock;
    var stack;

    var setStack = function(cb, st) {
      if (logServiceConfig.styles.hasOwnProperty(cb)) {
        codeBlock = cb;
      }
      else {
        $log.error(logServiceConfig.errors.codeBlockError(cb));
      }

      stack = Array.isArray(st)
        ? st
        : [st];

      writeLog(logServiceConfig.severities.debug, logServiceConfig.setStackCalled);
    };

    var writeLog = function (logSeverity, info, obj) {
      if (constants.environment !== constants.enums.environments.dev) return {};

      var logMessage = [];

      if (!codeBlock) {
        logMessage.push(logServiceConfig.errors.nocodeBlock);
        logMessage.push(logServiceConfig.separators.log);
        logMessage.push(Array.isArray(stack)
          ? stack.join(logServiceConfig.separators.data)
          : '');
        logMessage.push(logServiceConfig.separators.comment, info);
        if (obj) {
          logMessage.push(logServiceConfig.separators.log, JSON.stringify(obj));
        }
        $log.warn(logMessage.join(''));
        return;
      }

      var stylesEnabled = console.debug.length === 1;
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

        logMessage.push(JSON.stringify(obj));
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

        logMessage.push(logServiceConfig.separators.comment, info);
        infoStyle = logSeverity === logServiceConfig.severities.warn
          ? logServiceConfig.styles.warn
          : logSeverity === logServiceConfig.severities.error
            ? logServiceConfig.styles.error
            : logServiceConfig.styles.comment;
      }

      if (stylesEnabled) {
        $log[logSeverity](logMessage.join(''), stackStyle, infoStyle);
      }
      else {
        $log[logSeverity](logMessage.join(''));
      }
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
      }
    };
  }]);
