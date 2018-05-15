'use strict';

angular.module('rainboots')

  .provider('config', function () {
    var config = {};
    var localConfig;
    var remoteConfig;

    this.mergeConfigs = function() {
      if (!localConfig || !remoteConfig) return;

      config = angular.merge(localConfig, remoteConfig);
    };

    this.setLocalConfig = function(data) {
      localConfig = angular.fromJson(data);
      this.mergeConfigs();
    };

    this.setRemoteConfig = function(data) {
      remoteConfig = angular.fromJson(data);
      this.mergeConfigs();
    };

    this.getLocalConfig = function() {
      return localConfig;
    };

    this.getRemoteConfig = function() {
      return remoteConfig;
    };

    this.getConfig = function() {
      return config;
    };

    this.$get = function configFactory() {
      return config;
    };
  });