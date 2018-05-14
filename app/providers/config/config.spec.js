// Specs are allowed leniency with linting
/* eslint angular/file-name: 0 */

'use strict';

describe('Provider: config', function () {

  var configProvider;

  beforeEach(function () {
    angular.module('configProviderTestApp', [])

      .config(function (_configProvider_) {
        configProvider = _configProvider_;
      });
  });

  beforeEach(module('rainboots', 'configProviderTestApp'));

  beforeEach(inject(function(){ }));

  it('should be defined', function () {
    expect(configProvider).toBeDefined();
  });

  it('should be able to set and get config data as a provider', function() {
    var expected = {
      configData: 'configDataValue'
    };

    configProvider.setConfig(angular.toJson(expected));
    var actual = configProvider.getConfig();
    expect(actual).toEqual(expected);
  });

  it('should return the config from $get', function() {
    var expected = {
      configData: 'configDataValue'
    };

    configProvider.setConfig(angular.toJson(expected));
    var actual = configProvider.$get();
    expect(actual).toEqual(expected);
  });
});
