'use strict';

angular.module('rainboots')

  .controller('MigrationsController', ['api', 'enums', 'features', 'log', function(api, enums, features, log) {
    if (!features.migrations.enabled) return {};

    log.setStack(enums.codeBlocks.controller, 'MigrationsController');

    var vm = this;
    vm.features = features;
    log.debug('vm.features.migrations.enabled', vm.features.migrations.enabled);
    vm.title = 'Migrations';

    api.getMigrations()
      .then(function(data) {
        log.setStack(enums.codeBlocks.controller, ['MigrationsController', 'api.getMigrations().then()']);
        log.debug('data', data);
        vm.migrations = data;
      });
  }]);