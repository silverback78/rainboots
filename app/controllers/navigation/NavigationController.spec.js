// Specs are allowed to have magic numbers
/* eslint no-magic-numbers: 0 */

'use strict';

describe('Directive: NavigationController', function() {
  beforeEach(module('rainboots'));

  describe('NavigationController', function() {
    var $controller;
    var $rootScope;
    var $scope = {};
    var mdSidenavSpy;
    var openSpy;
    var closeSpy;
    var isOpenSpy;
    var NavigationController;

    beforeEach(inject(function(_$controller_, _$rootScope_){
      $controller = _$controller_;
      $rootScope = _$rootScope_;

      openSpy = jasmine.createSpy('open');
      closeSpy = jasmine.createSpy('close');
      isOpenSpy = jasmine.createSpy('isOpen');

      mdSidenavSpy = jasmine.createSpy('$mdSidenav').and.callFake(
        function() {
          return {
            open: openSpy,
            close: closeSpy,
            isOpen: isOpenSpy
          };
        });

      $scope.$root = $rootScope;
      NavigationController = $controller('NavigationController', {
        $scope: $scope,
        $mdSidenav: mdSidenavSpy
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
      NavigationController.openSidenav();
      expect(mdSidenavSpy).toHaveBeenCalledWith('right');
      expect(openSpy).toHaveBeenCalled();
    });

    it('should be able to close the Sidenav', function() {
      NavigationController.closeSidenav();
      expect(mdSidenavSpy).toHaveBeenCalledWith('right');
      expect(closeSpy).toHaveBeenCalled();
    });

    it('should know the open state of the Sidenav', function() {
      NavigationController.isSidenavOpen();
      expect(mdSidenavSpy).toHaveBeenCalledWith('right');
      expect(isOpenSpy).toHaveBeenCalled();
    });
  });
});
