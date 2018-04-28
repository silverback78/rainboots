// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */
/* eslint quotes: 0 */

'use strict';

describe('Service: balanceService', function () {

  beforeEach(module('rainboots', 'templates'));

  // instantiate service
  var api;
  var $httpBackend;
  var migrations;
  var response = {
    data: [
      {
        timestamp: '4/1/2018 @ 2:31 pm',
        version: '1.0.001',
        description: 'Initialize database tables'
      },
      {
        timestamp: '4/1/2018 @ 2:37 pm',
        version: '1.0.002',
        description: 'Add data to words'
      },
      {
        timestamp: '',
        version: '1.0.003',
        description: 'Add data to nouns'
      },
      {
        timestamp: '',
        version: '1.0.004',
        description: 'Add data to adjectives'
      }
    ],
    status: 200,
    config: {
      method: 'GET',
      transformRequest: [
        null
      ],
      transformResponse: [
        null
      ],
      jsonpCallbackParam: 'callback',
      url: 'http://localhost/tuchka/parka/migrations',
      headers: {
        Accept: 'application/json, text/plain, */*'
      }
    },
    statusText: 'OK',
    xhrStatus: 'complete'
  };

  beforeEach(inject(function (_$httpBackend_, _api_) {
    api = _api_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should GET the balance from the server', function () {
    $httpBackend.expectGET('/migrations').respond(response);

    migrations = api.getMigrations();

    $httpBackend.flush();

    migrations.then(function(response) {
      expect(response.data[0].timestamp).toBe('4/1/2018 @ 2:31 pm');
    });
  });
});
