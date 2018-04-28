// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */
/* eslint angular/file-name: 0 */
/* eslint angular/controller-as: 0 */
/* eslint angular/function-type: 0 */

'use strict';

describe('Service: log', function() {
  var originalEnvironment;
  var constants;
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

    module(function($provide) {
      $provide.constant('$log', $log);
    });

    inject(function($injector) {
      log = $injector.get('log');
      constants = $injector.get('constants');
    });
  });

  beforeEach(function() {
    originalEnvironment = constants.environment;
    constants.environment = constants.enums.environments.dev;
  });

  afterEach(function() {
    constants.environment = originalEnvironment;
  });

  describe('Service: log - behavior in production environment', function() {

    beforeEach(function() {
      originalEnvironment = constants.environment;
      constants.environment = constants.enums.environments.prod;
    });

    afterEach(function() {
      constants.environment = originalEnvironment;
    });

    it('should not log anything to console if environment is production', function() {
      log.debug(comment);
      expect($log.debug).not.toHaveBeenCalled();
      expect($log.warn).not.toHaveBeenCalled();
    });
  });

  describe('Service: log - behavior in dev environment', function() {
    describe('Service: log.setCodeBlock(string)', function() {

      it('should log an error if the parameter is not in constants.enums.codeblocks', function() {
        log.setStack('invalid');
        expect($log.error).toHaveBeenCalledWith('Error setting code block: invalid is not a valid code block.');
      });

      it('should be able to set every code block from constants.enums.codeblocks', function() {
        Object.keys(constants.enums.codeBlocks).forEach(function(codeBlock) {
          log.setStack(constants.enums.codeBlocks[codeBlock]);
          expect($log.error).not.toHaveBeenCalled();
        }, constants.enums.codeBlocks);
      });
    });

    describe('Service: log.setStack(string|array)', function() {

      it('should set the stack if a string is passed', function() {
        log.setStack(constants.enums.codeBlocks.javascript, stack1);
        log.debug(comment);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 // Lorem ipsum dolor sit amet');
      });

      it('should set the stack if an array is passed', function() {
        log.setStack(constants.enums.codeBlocks.javascript, [stack1, stack2, stack3]);
        log.debug(comment);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 -> stackLevel2 -> stackLevel3 // Lorem ipsum dolor sit amet');
      });

      it('should log a default message when the stack is set and a code block is defined', function() {
        log.setStack(constants.enums.codeBlocks.javascript, [stack1, stack2, stack3]);
        expect($log.debug).toHaveBeenCalledWith('javascript: stackLevel1 -> stackLevel2 -> stackLevel3 // entered');
      });
    });

    describe('Service: log.debug(string, object)', function() {

      it('should be able to log a debug without a code block or a stack, but with a warning', function() {
        log.debug(comment);
        expect($log.warn).toHaveBeenCalledWith('Warning: No code block is set:  // Lorem ipsum dolor sit amet');
      });

      it('should be able to log a debug without a stack, but with a warning', function() {
        Object.keys(constants.enums.codeBlocks).forEach(function(codeBlock) {
          log.setStack(constants.enums.codeBlocks[codeBlock]);
          log.debug(comment);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ':  // Lorem ipsum dolor sit amet');
        }, constants.enums.codeBlocks);
      });

      it('should be able to log a debug without an object passed', function() {
        Object.keys(constants.enums.codeBlocks).forEach(function(codeBlock) {
          log.setStack(constants.enums.codeBlocks[codeBlock], stack1);
          log.debug(comment);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ': stackLevel1 // Lorem ipsum dolor sit amet');
        }, constants.enums.codeBlocks);
      });

      it('should be able to log a debug with an object passed', function() {
        Object.keys(constants.enums.codeBlocks).forEach(function(codeBlock) {
          log.setStack(constants.enums.codeBlocks[codeBlock], stack1);
          log.debug('testObj', testObj);
          expect($log.debug).toHaveBeenCalledWith(codeBlock + ': stackLevel1 -> testObj = {"value1":"Value 1","int1":1,"value2":"Value 2","int2":2}');
        }, constants.enums.codeBlocks);
      });
    });
  });
});