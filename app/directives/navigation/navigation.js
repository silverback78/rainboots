'use strict';

angular.module('rainboots')

  .directive('navigation', [function() {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      controller: 'NavigationController',
      controllerAs: 'vm',
      templateUrl: 'controllers/navigation/NavigationController.html'
    };
  }]);