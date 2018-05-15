'use strict';

var rainboots = rainboots || {};

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