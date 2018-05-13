'use strict';

angular.module('rainboots')

  .provider('config', function () {
    var config;

    this.setConfig = function(data) {
      config = angular.fromJson(data);
    };

    this.getConfig = function() {
      return config;
    };

    this.$get = function configFactory() {
      return config;
    };
  });