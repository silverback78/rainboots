'use strict';

angular.module('rainboots')

  /**
   * Summary. Navigation directive for the top level page navigation.
   */
  .directive('navigation', [function() {
    return {
      restrict: 'E',
      scope: {},
      transclude: false,
      controller: 'NavigationController',
      controllerAs: 'vm',
      templateUrl: 'controllers/navigation/NavigationController.html'
    };
  }]);