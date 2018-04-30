// Using controller-as, but $scope must be used to set angular material properties
/* eslint angular/controller-as: 0 */

'use strict';

angular.module('rainboots')

  .controller('NavigationController', ['$scope', '$location', '$mdSidenav', 'log', 'enums', 'features', function ($scope, $location, $mdSidenav, log, enums, features) {
    log.setStack(enums.codeBlocks.controller, 'NavigationController');

    var vm = this;

    vm.navItems = [];

    vm.navItems.push(
      {
        name: '/home',
        href: '#home',
        label: 'Home'
      }
    );

    if (features.migrations.enabled) {
      vm.navItems.push({
        name: '/migrations',
        href: '#migrations',
        label: 'Migrations'
      });
    }

    $scope.$root.$on('$routeChangeSuccess', function (e, current) {
      $scope.currentNavItem = current.$$route.originalPath;
    });

    vm.loadRoute = function(route) {
      log.setStack(enums.codeBlocks.controller, ['NavigationController', 'loadRoute(' + route + ')']);
      $location.path(route);
      vm.closeSidenav();
    };

    vm.openSidenav = function() {
      log.setStack(enums.codeBlocks.controller, ['NavigationController', 'openSidenav()']);
      $mdSidenav('right').open();
    };

    vm.closeSidenav = function() {
      log.setStack(enums.codeBlocks.controller, ['NavigationController', 'closeSidenav()']);
      $mdSidenav('right').close();
    };

    vm.isSidenavOpen = function(){
      log.setStack(enums.codeBlocks.controller, ['NavigationController', 'isSidenavOpen()']);
      return $mdSidenav('right').isOpen();
    };
  }]);
