// This event listener inside .run is specifically for changing title based on route, and belongs in the routes file and not a separate service.
/* eslint angular/no-run-logic: 0 */

'use strict';

angular.module('rainboots')

  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/home', {
        title: 'Home',
        templateUrl: 'controllers/home/HomeController.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })

      .when('/migrations', {
        title: 'Migrations',
        templateUrl: 'controllers/migrations/MigrationsController.html',
        controller: 'MigrationsController',
        controllerAs: 'vm'
      })

      .otherwise({redirectTo: '/home'});
  }])

  .run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
      $rootScope.title = current.$$route.title;
    });
  }]);