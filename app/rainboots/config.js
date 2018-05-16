'use strict';

var rainboots = rainboots || {};

/**
 * Summary. Handles passing the local and remote configs fethed from bootstrap to the config provider.
 */
rainboots.loadLocalConfig = function (data) {
  angular.module('rainboots')

    .config(['configProvider', function(configProvider) {
      configProvider.setLocalConfig(data);
    }]);
};

rainboots.loadRemoteConfig = function (data) {
  angular.module('rainboots')

    .config(['configProvider', function(configProvider) {
      configProvider.setRemoteConfig(data);
    }]);
};