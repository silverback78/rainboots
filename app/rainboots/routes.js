'use strict';

var rainboots = rainboots || {};

/**
 * Summary.     Initializes routing.
 *
 * Description. Handles registering a function to be called during the bootstrap process that will initialize routing
 *              for the application. Also registers an event handler to change the page title on a successful route change.
 */
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