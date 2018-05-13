// Using controller-as, but $scope must be used to set angular material properties
/* eslint angular/controller-as: 0 */
/* eslint angular/file-name: 0 */

'use strict';

angular.module('NavigationController-mock', [])

  .controller('NavigationController', function () {
    var vm = this;
    vm.navItems = [];
    vm.loadRoute = function () {};
    vm.openSidenav = function () {};
    vm.closeSidenav = function () {};
    vm.isSidenavOpen = function (){};
  });
