// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */
/* eslint angular/file-name: 0 */
/* eslint angular/controller-as: 0 */
/* eslint angular/function-type: 0 */

'use strict';

describe('Service: log', function() {
  var originalEnvironment;
  var originalFeatures;
  var enums;
  var env;
  var features;
  var utilities;
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
    module('rainboots');

    $log = jasmine.createSpyObj('$log', {
      debug: jasmine.createSpy('debug'),
      warn: jasmine.createSpy('warn'),
      error: jasmine.createSpy('error')
    });

    features = {
      log: {
        enabled: true,
        styles: true
      }
    };

    module(function($provide) {
      $provide.constant('$log', $log);
      $provide.constant('features', features);
    });

    inject(function($injector) {
      log = $injector.get('log');
      enums = $injector.get('enums');
      env = $injector.get('environment');
      features = $injector.get('features');
      utilities = $injector.get('utilities');
    });

    $log.debug.calls.reset();
    $log.warn.calls.reset();
    $log.error.calls.reset();
    log.reset();
  });

  beforeEach(function() {
    originalEnvironment = utilities.clone(env);
    env.environment = enums.environments.dev;

    $log.debug.calls.reset();
    $log.warn.calls.reset();
    $log.error.calls.reset();
    log.reset();
  });

  afterEach(function() {
    env.environment = originalEnvironment.environment;
  });

  describe('Service: log - behavior in production environment', function() {
    beforeEach(function() {
      originalEnvironment = utilities.clone(env);
      env.environment = enums.environments.prod;

      $log.debug.calls.reset();
      $log.warn.calls.reset();
      $log.error.calls.reset();
      log.reset();
    });

    afterEach(function() {
      env.environment = originalEnvironment.environment;
    });

    it('should not log anything to console if environment is production', function() {
      log.debug(comment);
      expect($log.debug).not.toHaveBeenCalled();
      expect($log.warn).not.toHaveBeenCalled();
    });
  });

  describe('Features should work according to the features config', function() {
    beforeEach(function() {
      originalFeatures = utilities.clone(features);
      features.log.enabled = false;
      features.log.styles = false;

      $log.debug.calls.reset();
      $log.warn.calls.reset();
      $log.error.calls.reset();
      log.reset();
    });

    afterEach(function() {
      features.log.enabled = originalFeatures.log.enabled;
      features.log.styles = originalFeatures.log.styles;
    });

    it('should not log anything if the feature is disabled', function() {
      log.setStack(enums.codeBlocks.javascript, stack1);
      log.debug(comment);
      expect($log.debug).not.toHaveBeenCalled();
    });
  });

  describe('Service: log - behavior in dev environment', function() {
    describe('Service: log.setCodeBlock(string)', function() {
      it('should be able to set every code block from enums.codeblocks', function() {
        Object.keys(enums.codeBlocks).forEach(function(codeBlock) {
          log.setStack(enums.codeBlocks[codeBlock]);
          expect($log.error).not.toHaveBeenCalled();
        }, enums.codeBlocks);
      });
    });

    describe('Service: log.setStack(string|array)', function() {
      it('should set the stack if a string is passed', function() {
        log.setStack(enums.codeBlocks.javascript, stack1);
        log.debug(comment);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 // Lorem ipsum dolor sit amet');
      });

      it('should set the stack if an array is passed', function() {
        log.setStack(enums.codeBlocks.javascript, [stack1, stack2, stack3]);
        log.debug(comment);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 -> stackLevel2 -> stackLevel3 // Lorem ipsum dolor sit amet');
      });

      it('should log a default message when the stack is set and a code block is defined', function() {
        log.setStack(enums.codeBlocks.javascript, [stack1, stack2, stack3]);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 -> stackLevel2 -> stackLevel3 -> called');
      });
    });

    describe('Service: log.debug(string, object)', function() {
      it('should be able to log a debug without a code block or a stack, but with a warning', function() {
        log.debug(comment);
        expect($log.warn).toHaveBeenCalledWith('Warning: No code block is set:  // Lorem ipsum dolor sit amet');
      });

      it('should be able to log a debug without a stack, but with a warning', function() {
        Object.keys(enums.codeBlocks).forEach(function(codeBlock) {
          log.setStack(enums.codeBlocks[codeBlock]);
          log.debug(comment);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ':  // Lorem ipsum dolor sit amet');
        }, enums.codeBlocks);
      });

      it('should be able to log a debug without an object passed', function() {
        Object.keys(enums.codeBlocks).forEach(function(codeBlock) {
          log.setStack(enums.codeBlocks[codeBlock], stack1);
          log.debug(comment);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ': stackLevel1 // Lorem ipsum dolor sit amet');
        }, enums.codeBlocks);
      });

      it('should be able to log a debug with an object passed', function() {
        Object.keys(enums.codeBlocks).forEach(function(codeBlock) {
          log.setStack(enums.codeBlocks[codeBlock], stack1);
          log.debug('testObj', testObj);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ': stackLevel1 -> testObj = {"value1":"Value 1","int1":1,"value2":"Value 2","int2":2}');
        }, enums.codeBlocks);
      });
    });
  });
});