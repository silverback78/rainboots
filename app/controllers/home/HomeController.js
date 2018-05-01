'use strict';

angular.module('rainboots')

  .controller('HomeController', ['enums', 'log', function(enums, log) {
    log.setStack(enums.codeBlocks.controller, 'HomeController');

    var vm = this;

    vm.title = 'Home';

  }]);