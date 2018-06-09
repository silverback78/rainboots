'use strict';

angular.module('rainboots')

  /**
   * Summary. Spinner directive to show a spinner while loading
   */
  .directive('spinner', ['$timeout', 'config', function($timeout, config) {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        'spinner': '=spinner'
      },
      link: function(scope){
        $timeout(function() {
          scope.delayComplete = true;
          scope.$apply();
        }, config.features.spinner.delayStart);
      },
      templateUrl: 'directives/spinner/spinner.html'
    };
  }]);
