'use strict';

angular.module('rainboots')

  .controller('MigrationsController', ['api', 'config', 'enums', 'log', function(api, config, enums, log) {
    if (!config.features.migrations.enabled) return {};

    log.setStack(enums.codeBlocks.controller, 'MigrationsController');

    var vm = this;
    vm.config = config;
    log.debug('vm.config.features.migrations.enabled', vm.config.features.migrations.enabled);
    vm.title = 'Migrations';

    api.getMigrations()
      .then(function(data) {
        log.setStack(enums.codeBlocks.controller, ['MigrationsController', 'api.getMigrations().then()']);
        log.debug('data', data);
        vm.migrations = data;
      });
  }]);