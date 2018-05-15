// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */
/* eslint quotes: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

'use strict';

describe('Service: api', function () {

  beforeEach(module('rainboots', 'templates', 'config-mock', 'enums-mock', 'log-mock'));

  // instantiate service
  var api;
  var config;
  var log;
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
    ]
  };

  beforeEach(inject(function (_$httpBackend_, _api_, _config_, _log_) {
    $httpBackend = _$httpBackend_;
    api = _api_;
    config = _config_;
    log = _log_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should POST the migrations from the server', function () {
    $httpBackend.expectPOST(config.api.migrations).respond(response);

    migrations = api.getMigrations();

    $httpBackend.flush();

    migrations.then(function(response) {
      expect(response.data[0].timestamp).toBe('4/1/2018 @ 2:31 pm');
    });
  });

  it('should handle errors', function() {
    spyOn(log, 'error');
    $httpBackend.expectPOST(config.api.migrations).respond(400, {});
    migrations = api.getMigrations();

    $httpBackend.flush();

    migrations.then();
    expect(log.error).toHaveBeenCalledWith('Failed to get migrations');
  });
});
