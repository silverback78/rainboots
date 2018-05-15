// Specs are allowed leniency with linting
/* eslint no-undef: 0 */
/* eslint no-magic-numbers: 0 */
/* eslint quotes: 0 */

'use strict';

describe('Model: RequestHandler', function () {
  var requestHandler;

  beforeEach(function() {
    requestHandler = new rainboots.RequestHandler();
  });

  it('should be defined', function() {
    expect(requestHandler).not.toBe(null);
  });

  it('should add a request to the request handler', function() {
    requestHandler.addRequest('GET', '/base/app/rainboots.config.json');
    expect(requestHandler.requests.length).toBe(1);
  });

  it('should make an xmlhttp request', function() {
    requestHandler.addRequest('GET', '/base/app/rainboots.config.json');

    spyOn(requestHandler.requests[0], 'onreadystatechange');
    requestHandler.sendAll();

    expect(requestHandler.requests[0].onreadystatechange).toHaveBeenCalled();
  });

  describe('Request success callback', function() {
    var successCallback;

    beforeEach(function(done) {
      successCallback = jasmine.createSpy('successCallback').and.callFake(function() {
        done();
      });

      requestHandler.addRequest('GET', '/base/app/rainboots.config.json', successCallback);
      requestHandler.sendAll();
    });

    it('should call the success callback on a successful request', function() {
      expect(successCallback).toHaveBeenCalled();
    });
  });

  describe('Request failure callback', function() {
    var failureCallback;

    beforeEach(function(done) {
      failureCallback = jasmine.createSpy('failureCallback').and.callFake(function() {
        done();
      });

      requestHandler.addRequest('GET', '/invalid/file.json', null, failureCallback);
      requestHandler.sendAll();
    });

    it('should call the failure callback on a failed request', function() {
      expect(failureCallback).toHaveBeenCalled();
    });
  });

  describe('Async functionality', function() {

    beforeEach(function() {
      jasmine.Ajax.install();
      rainboots.testVal = 0;

      var addOne = function() {
        rainboots.testVal += 1;
      };

      var multiplyByZero = function() {
        rainboots.testVal *= 0;
      };

      requestHandler.addRequest('GET', '/config1.json', addOne);
      requestHandler.addRequest('GET', '/config2.json', multiplyByZero);

      requestHandler.sendAll();

      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": "text/plain",
        "responseText": "responseText"
      });

      jasmine.Ajax.requests.first().respondWith({
        "status": 200,
        "contentType": "text/plain",
        "responseText": "responseText"
      });
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it('The second request should finish first if the first request takes longer', function() {
      expect(rainboots.testVal).toBe(1);
    });
  });

  describe('Final success callback', function() {
    var successCallback;

    beforeEach(function(done) {
      successCallback = jasmine.createSpy('successCallback').and.callFake(function() {
        done();
      });

      requestHandler.addRequest('GET', '/base/app/rainboots.config.json');
      requestHandler.addRequest('GET', '/base/app/rainboots.config.json');
      requestHandler.addRequest('GET', '/base/app/rainboots.config.json');
      requestHandler.sendAll(successCallback);
    });

    it('should call the final success callback after all requests have completed', function() {
      expect(successCallback).toHaveBeenCalled();
    });
  });

  describe('Final failure callback', function() {
    var failureCallback;

    beforeEach(function(done) {
      failureCallback = jasmine.createSpy('successCallback').and.callFake(function() {
        done();
      });

      requestHandler.addRequest('GET', '/base/app/rainboots.config.json');
      requestHandler.addRequest('GET', '/base/app/rainboots.config.json');
      requestHandler.addRequest('GET', '/invalid/file.json');
      requestHandler.sendAll(null, failureCallback);
    });

    it('should call the final failure callback after all requests have completed and there was at least one failure', function() {
      expect(failureCallback).toHaveBeenCalled();
    });
  });
});