// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */
/* eslint angular/file-name: 0 */
/* eslint angular/controller-as: 0 */
/* eslint angular/function-type: 0 */
/* eslint no-undef: 0 */
/* eslint no-console: 0 */

'use strict';

describe('Service: log', function() {
  var originalEnv;
  var originalFeatures;
  var config;
  var env;
  var codeBlocks;
  var $log;
  var log;
  var stack1 = 'stackLevel1';
  var stack2 = 'stackLevel2';
  var stack3 = 'stackLevel3';
  var comment = 'Lorem ipsum dolor sit amet';
  var testObj = {
    value1: 'Value 1',
    int1: 1,
    value2: 'Value 2',
    int2: 2
  };

  beforeEach(function() {
    module('rainboots', 'config-mock');

    $log = jasmine.createSpyObj('$log', {
      debug: jasmine.createSpy('debug'),
      warn: jasmine.createSpy('warn'),
      error: jasmine.createSpy('error')
    });

    module(function($provide) {
      $provide.constant('$log', $log);
    });

    inject(function($injector) {
      log = $injector.get('log');
      codeBlocks = $injector.get('enums.codeBlocks');
      env = $injector.get('enums.env');
      config = $injector.get('config');
    });

    $log.debug.calls.reset();
    $log.warn.calls.reset();
    $log.error.calls.reset();
    log.reset();
  });

  beforeEach(function() {
    config.features.log.stylesEnabled = false;
    originalEnv = config.env;
    config.env = env.dev;

    $log.debug.calls.reset();
    $log.warn.calls.reset();
    $log.error.calls.reset();
    log.reset();
  });

  afterEach(function() {
    config.env = originalEnv;
  });

  describe('Service: log - behavior in production environment', function() {
    beforeEach(function() {
      originalEnv = config.env;
      config.env = env.prod;

      $log.debug.calls.reset();
      $log.warn.calls.reset();
      $log.error.calls.reset();
      log.reset();
    });

    afterEach(function() {
      config.env = originalEnv;
    });

    it('should not log anything to console if environment is production', function() {
      log.debug(comment);
      expect($log.debug).not.toHaveBeenCalled();
      expect($log.warn).not.toHaveBeenCalled();
    });
  });

  describe('Features should work according to the features config', function() {
    beforeEach(function() {
      originalFeatures = {
        log: {
          enabled: config.features.log.enabled,
          stylesEnabled: config.features.log.stylesEnabled
        }
      };

      $log.debug.calls.reset();
      $log.warn.calls.reset();
      $log.error.calls.reset();
      log.reset();
    });

    afterEach(function() {
      config.features.log.enabled = originalFeatures.log.enabled;
      config.features.log.stylesEnabled = originalFeatures.log.stylesEnabled;
    });

    it('should not log anything if the feature is disabled', function() {
      config.features.log.enabled = false;
      log.setStack(codeBlocks.javascript, stack1);
      log.debug(comment);
      expect($log.debug).not.toHaveBeenCalled();
    });

    it('should log with styles if styles are enabled', function() {
      config.features.log.stylesEnabled = true;
      console.debug = [0];
      log.setStack(codeBlocks.javascript, [stack1, stack2, stack3]);
      log.debug(comment);
      expect($log.debug).toHaveBeenCalledWith('%cjavascript: stackLevel1 -> stackLevel2 -> stackLevel3%c // Lorem ipsum dolor sit amet', 'color: #222;', 'color: #090;');
    });
  });

  describe('Service: log - behavior in dev environment', function() {
    describe('Service: log.setCodeBlock(string)', function() {
      it('should be able to set every code block from enums.codeblocks', function() {
        angular.forEach(Object.keys(codeBlocks), function(codeBlock) {
          log.setStack(codeBlocks[codeBlock]);
          expect($log.error).not.toHaveBeenCalled();
        }, codeBlocks);
      });
    });

    describe('Service: log.setStack(string|array)', function() {
      it('should set the stack if a string is passed', function() {
        log.setStack(codeBlocks.javascript, stack1);
        log.debug(comment);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 // Lorem ipsum dolor sit amet');
      });

      it('should set the stack if an array is passed', function() {
        log.setStack(codeBlocks.javascript, [stack1, stack2, stack3]);
        log.debug(comment);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 -> stackLevel2 -> stackLevel3 // Lorem ipsum dolor sit amet');
      });

      it('should log a default message when the stack is set and a code block is defined', function() {
        log.setStack(codeBlocks.javascript, [stack1, stack2, stack3]);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 -> stackLevel2 -> stackLevel3 -> called');
      });

      it('should throw an error if the style given does not exist in the config', function() {
        log.setStack('invalidStack', [stack1, stack2, stack3]);
        expect($log.error).toHaveBeenCalledWith('Error setting code block: invalidStack is not a valid code block.');
      });
    });

    describe('Service: log.debug(string, object)', function() {
      it('should be able to log a debug without a code block or a stack, but with a warning', function() {
        log.debug(comment);
        expect($log.warn).toHaveBeenCalledWith('Warning: No code block is set:  // Lorem ipsum dolor sit amet');
      });

      it('should be able to log a debug object without a code block or a stack, but with a warning', function() {
        log.debug(comment, testObj);
        expect($log.warn).toHaveBeenCalledWith('Warning: No code block is set:  // Lorem ipsum dolor sit amet: {"value1":"Value 1","int1":1,"value2":"Value 2","int2":2}');
      });

      it('should be able to log a debug without a stack, but with a warning', function() {
        angular.forEach(Object.keys(codeBlocks), function(codeBlock) {
          log.setStack(codeBlocks[codeBlock]);
          log.debug(comment);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ':  // Lorem ipsum dolor sit amet');
        }, codeBlocks);
      });

      it('should be able to log a debug without an object passed', function() {
        angular.forEach(Object.keys(codeBlocks), function(codeBlock) {
          log.setStack(codeBlocks[codeBlock], stack1);
          log.debug(comment);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ': stackLevel1 // Lorem ipsum dolor sit amet');
        }, codeBlocks);
      });

      it('should be able to log a debug with an object passed', function() {
        angular.forEach(Object.keys(codeBlocks), function(codeBlock) {
          log.setStack(codeBlocks[codeBlock], stack1);
          log.debug('testObj', testObj);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ': stackLevel1 -> testObj = {"value1":"Value 1","int1":1,"value2":"Value 2","int2":2}');
        }, codeBlocks);
      });
    });

    describe('Service: log.warn(string)', function() {
      it('should be able to log a warning', function() {
        log.setStack(codeBlocks.javascript, stack1);
        log.warn(comment);
        expect($log.warn).toHaveBeenCalledWith('Warning: javascript: stackLevel1 // Lorem ipsum dolor sit amet');
      });
    });

    describe('Service: log.error(string)', function() {
      it('should be able to log an error', function() {
        log.setStack(codeBlocks.javascript, stack1);
        log.error(comment);
        expect($log.error).toHaveBeenCalledWith('Error: javascript: stackLevel1 // Lorem ipsum dolor sit amet');
      });
    });
  });
});