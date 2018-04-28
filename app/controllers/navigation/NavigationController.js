// Using controller-as, but $scope must be used to set angular material properties
/* eslint angular/controller-as: 0 */

'use strict';

angular.module('rainboots')

  .controller('NavigationController', ['$scope', '$location', '$mdSidenav', 'log', 'constants', function ($scope, $location, $mdSidenav, log, constants) {
    log.setStack(constants.enums.codeBlocks.controller, 'NavigationController');

    var vm = this;

    vm.navItems = [
      {
        name: '/home',
        href: '#home',
        label: 'Home'
      },
      {
        name: '/migrations',
        href: '#migrations',
        label: 'Migrations'
      }
    ];

    $scope.$root.$on('$routeChangeSuccess', function (e, current) {
      $scope.currentNavItem = current.$$route.originalPath;
    });

    vm.loadRoute = function(route) {
      log.setStack(constants.enums.codeBlocks.controller, ['NavigationController', 'loadRoute(' + route + ')']);
      $location.path(route);
      vm.closeSidenav();
    };

    vm.openSidenav = function() {
      log.setStack(constants.enums.codeBlocks.controller, ['NavigationController', 'openSidenav()']);
      $mdSidenav('right').open();
    };

    vm.closeSidenav = function() {
      log.setStack(constants.enums.codeBlocks.controller, ['NavigationController', 'closeSidenav()']);
      $mdSidenav('right').close();
    };

    vm.isSidenavOpen = function(){
      log.setStack(constants.enums.codeBlocks.controller, ['NavigationController', 'isSidenavOpen()']);
      return $mdSidenav('right').isOpen();
    };
  }]);
