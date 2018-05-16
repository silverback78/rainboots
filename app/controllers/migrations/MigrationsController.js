'use strict';

angular.module('rainboots')

  /**
   * Summary. Controller for migrations page.
   */
  .controller('MigrationsController', ['api', 'enums.codeBlocks', 'config', 'log', function(api, codeBlocks, config, log) {
    if (!config.features.migrations.enabled) return {};

    log.setStack(codeBlocks.controller, 'MigrationsController');

    var vm = this;
    vm.config = config;
    log.debug('vm.config.features.migrations.enabled', vm.config.features.migrations.enabled);
    vm.title = 'Migrations';

    api.getMigrations()
      .then(function(data) {
        log.setStack(codeBlocks.controller, ['MigrationsController', 'api.getMigrations().then()']);
        log.debug('data', data);
        vm.migrations = data;
      });
  }]);