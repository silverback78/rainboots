'use strict';

angular.module('rainboots')

  .controller('HomeController', ['log', 'enums', function(log, enums) {
    log.setStack(enums.codeBlocks.controller, 'HomeController');

    var vm = this;

    vm.title = 'Home';

  }]);