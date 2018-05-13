'use strict';

var rainboots = rainboots || {};

rainboots.loadConfig = function (data) {
  angular.module('rainboots')

    .config(['$locationProvider', '$routeProvider', 'configProvider', function($locationProvider, $routeProvider, configProvider) {
      configProvider.setConfig(data);
    }]);
};