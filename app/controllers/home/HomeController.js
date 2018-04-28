'use strict';

angular.module('rainboots')

  .controller('HomeController', ['log', 'constants', function(log, constants) {
    log.setStack(constants.enums.codeBlocks.controller, 'HomeController');

    var vm = this;

    vm.title = 'Home';

  }]);