// Specs are allowed leniency with linting
/* eslint angular/file-name: 0 */

'use strict';

describe('Provider: config', function () {

  var configProvider;

  var localConfig = {
    env: 'dev',
    features: {
      feature1: {
        enabled: true,
        toggle1: false,
        toggle2: true,
        subFeature: {
          switch: true,
          value1: 'value',
          value2: 'value2'
        }
      },
      feature2: {
        enabled: false
      }
    },
    api: {
      apiUrl1: 'url1',
      apiUrl2: 'url2'
    }
  };

  var remoteConfig = {
    env: 'prod',
    features: {
      feature1: {
        toggle2: false,
        toggle3: true,
        subFeature: {
          value2: 'newValue2'
        }
      },
      feature3: {
        enabled: true
      }
    },
    api: {
      apiUrl1: 'http://url1.api.com',
      apiUrl3: 'http://url3.api.com'
    }
  };

  var mergedConfig = {
    env: 'prod',
    features: {
      feature1: {
        enabled: true,
        toggle1: false,
        toggle2: false,
        toggle3: true,
        subFeature: {
          switch: true,
          value1: 'value',
          value2: 'newValue2'
        }
      },
      feature2: {
        enabled: false
      },
      feature3: {
        enabled: true
      }
    },
    api: {
      apiUrl1: 'http://url1.api.com',
      apiUrl2: 'url2',
      apiUrl3: 'http://url3.api.com'
    }
  };

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

  it('should be able to set and get setLocalConfig data as a provider', function() {
    var expected = localConfig;
    configProvider.setLocalConfig(angular.toJson(expected));

    var actual = configProvider.getLocalConfig();
    expect(actual).toEqual(expected);
  });

  it('should be able to set and get setRemoteConfig data as a provider', function() {
    var expected = remoteConfig;
    configProvider.setRemoteConfig(angular.toJson(expected));

    var actual = configProvider.getRemoteConfig();
    expect(actual).toEqual(expected);
  });

  it('should be automatically merge localConfig with remoteConfig, prefering values from remoteConfig when localConfig is set first', function() {
    configProvider.setLocalConfig(angular.toJson(localConfig));
    configProvider.setRemoteConfig(angular.toJson(remoteConfig));

    var actual = configProvider.getConfig();
    expect(actual).toEqual(mergedConfig);
  });

  it('should be automatically merge localConfig with remoteConfig, prefering values from remoteConfig when remoteConfig is set first', function() {
    configProvider.setRemoteConfig(angular.toJson(remoteConfig));
    configProvider.setLocalConfig(angular.toJson(localConfig));

    var actual = configProvider.getConfig();
    expect(actual).toEqual(mergedConfig);
  });

  it('should return the merged config from $get', function() {
    configProvider.setRemoteConfig(angular.toJson(remoteConfig));
    configProvider.setLocalConfig(angular.toJson(localConfig));

    var actual = configProvider.$get();
    expect(actual).toEqual(mergedConfig);
  });
});
