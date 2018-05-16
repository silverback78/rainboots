// Specs are allowed to have magic numbers
/* eslint no-magic-numbers: 0 */
/* eslint no-undef: 0 */

'use strict';

describe('Directive: NavigationController', function() {
  beforeEach(module('rainboots', 'config-mock', 'log-mock'));

  describe('NavigationController', function() {
    var $controller;
    var $location;
    var $mdSidenav;
    var $rootScope;
    var $scope = {};
    var NavigationController;

    beforeEach(inject(function(_$controller_, _$location_, _$mdSidenav_, _$rootScope_){
      $controller = _$controller_;
      $location = _$location_;
      $mdSidenav = _$mdSidenav_;
      $rootScope = _$rootScope_;

      $scope.$root = $rootScope;
      NavigationController = $controller('NavigationController', {
        $location: $location,
        $mdSidenav: $mdSidenav,
        $scope: $scope
      });
    }));

    it('should have a list of nav items', function() {
      expect(NavigationController.navItems.length).toBeGreaterThan(1);
    });

    it('should select the current navigation item on routechange', function() {
      var currentPage = {
        $$route: {
          title: 'currentPage',
          originalPath: 'currentPage'
        }
      };

      var previousPage = {
        $$route: {
          title: 'previousPage',
          originalPath: 'previousPage'
        }
      };

      $rootScope.$broadcast('$routeChangeSuccess', currentPage, previousPage);
      expect($scope.currentNavItem).toBe('currentPage');
    });

    it('should be able to open the Sidenav', function() {
      spyOn($mdSidenav('right'), 'open');
      NavigationController.openSidenav();
      expect($mdSidenav('right').open).toHaveBeenCalled;
    });

    it('should be able to close the Sidenav', function() {
      spyOn($mdSidenav('right'), 'close');
      NavigationController.closeSidenav();
      expect($mdSidenav('right').close).toHaveBeenCalled;
    });

    it('should know the open state of the Sidenav', function() {
      spyOn($mdSidenav('right'), 'isOpen');
      NavigationController.isSidenavOpen();
      expect($mdSidenav('right').isOpen).toHaveBeenCalled;
    });

    it('should load a route', function() {
      spyOn($location, 'path');
      NavigationController.loadRoute('route');
      expect($location.path).toHaveBeenCalledWith('route');
    });

    it('should close the side nav when a route is loaded', function() {
      spyOn(NavigationController, 'closeSidenav');
      NavigationController.loadRoute('route');
      expect(NavigationController.closeSidenav).toHaveBeenCalled();
    });
  });
});
