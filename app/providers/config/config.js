'use strict';

angular.module('rainboots')

/**
 * Summary.     Configuration provider to get the site configuration during the config portion of the application lifecycle..
 *
 * Description. The purpose of this provider is to read the local configuration file as well as make a request to the api to
 *              get the configuration of the api. It will then merge the configurations, preferring values from the api. This
 *              allows the UI to have features enabled or disabled, but also the ability for the server to override enabled
 *              or disabled features. That way in a distributed environment, different environments would be able to connect
 *              to different servers and operate based on that servers capabilities. It also allows the server to provide the
 *              UI with the appropriate api urls so that the UI is not concerned at all with back-end configuration.
 */
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