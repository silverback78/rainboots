// Using controller-as so this rule is being followed. $scope must be used to set angular material properties and triggering a false lint error
/* eslint angular/controller-as: 0 */

'use strict';

angular.module('rainboots')

  /**
   * Summary. Controller for the navigation directive.
   *
   * Description. This controller handles several different aspects of the navigation directive. First, it manages
   *              an array of menu items to be displayed. It also handles the necessary scripting for opening and
   *              closing the sidebar nav when displaying in a mobile viewport. Additionaly, it registers an event
   *              handler on route changes to update the active link.
   */
  .controller('NavigationController', ['$location', '$mdSidenav', '$scope', 'enums.codeBlocks', 'config', 'log', function ($location, $mdSidenav, $scope, codeBlocks, config, log) {
    log.setStack(codeBlocks.controller, 'NavigationController');

    var vm = this;

    vm.navItems = [];

    vm.navItems.push({
      name: '/home',
      href: '#home',
      label: 'Home'
    });

    if (config.features.migrations.enabled) {
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
      log.setStack(codeBlocks.controller, ['NavigationController', 'loadRoute(' + route + ')']);
      $location.path(route);
      vm.closeSidenav();
    };

    vm.openSidenav = function() {
      log.setStack(codeBlocks.controller, ['NavigationController', 'openSidenav()']);
      $mdSidenav('right').open();
    };

    vm.closeSidenav = function() {
      log.setStack(codeBlocks.controller, ['NavigationController', 'closeSidenav()']);
      $mdSidenav('right').close();
    };

    vm.isSidenavOpen = function(){
      log.setStack(codeBlocks.controller, ['NavigationController', 'isSidenavOpen()']);
      return $mdSidenav('right').isOpen();
    };
  }]);
