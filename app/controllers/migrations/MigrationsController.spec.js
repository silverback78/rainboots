// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */

'use strict';

describe('Controller: MigrationsController', function () {
  beforeEach(module('rainboots', 'templates'));

  var MigrationsController;
  var api;
  var $scope;
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

  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _api_) {
    $scope = _$rootScope_.$new();
    api = _api_;

    spyOn(api, 'getMigrations').and.callFake(function() {
      var deferred = _$q_.defer();
      deferred.resolve(response);
      return deferred.promise;
    });

    MigrationsController = _$controller_('MigrationsController', {
      balanceService: _api_,
      $scope: $scope
    });
  }));

  it('should have a title', function (){
    expect(MigrationsController.title).toBeDefined();
  });

  it('should request migrations', function() {
    $scope.$root.$digest();
    expect(MigrationsController.migrations.data[0].timestamp).toBe('4/1/2018 @ 2:31 pm');
  });
});
