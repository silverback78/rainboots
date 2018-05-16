'use strict';

angular.module('rainboots')

  /**
   * Summary. Controller for the home page.
   */
  .controller('HomeController', ['enums.codeBlocks', 'log', function(codeBlocks, log) {
    log.setStack(codeBlocks.controller, 'HomeController');

    var vm = this;

    vm.title = 'Home';

  }]);