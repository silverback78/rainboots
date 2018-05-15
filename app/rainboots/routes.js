'use strict';

var rainboots = rainboots || {};

rainboots.loadRoutes = function () {
  angular.module('rainboots')

    .config(['$locationProvider', '$routeProvider', 'configProvider', function($locationProvider, $routeProvider, configProvider) {
      var config = configProvider.getConfig();

      $locationProvider.hashPrefix('');

      $routeProvider
        .when('/home', {
          title: 'Home',
          templateUrl: 'controllers/home/HomeController.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        });

      if (config.features.migrations.enabled) {
        $routeProvider.when('/migrations', {
          title: 'Migrations',
          templateUrl: 'controllers/migrations/MigrationsController.html',
          controller: 'MigrationsController',
          controllerAs: 'vm'
        });
      }

      $routeProvider.otherwise({redirectTo: '/home'});
    }])

    .run(['page', function(page) {
      page.registerTitleEventHandler();
    }]);
};