'use strict';

angular.module('rainboots')

  .controller('MigrationsController', ['api', 'log', 'constants', function(api, log, constants) {
    log.setStack(constants.enums.codeBlocks.controller, 'MigrationsController');

    var vm = this;
    vm.title = 'Migrations';

    api.getMigrations()
      .then(function(data) {
        log.setStack(constants.enums.codeBlocks.controller, ['MigrationsController', 'getMigrations()']);
        log.debug('data', data);
        vm.migrations = data;
      });
  }]);