'use strict';

angular.module('rainboots')

  /**
   * Summary. Controller for migrations page.
   */
  .controller('MigrationsController', ['$mdDialog', 'api', 'enums.codeBlocks', 'config', 'enums.env', 'log', function($mdDialog, api, codeBlocks, config, env, log) {
    if (!config.features.migrations.enabled) return {};

    log.setStack(codeBlocks.controller, 'MigrationsController');

    var vm = this;
    vm.lang = '';
    vm.key = '';
    vm.config = config;
    vm.env = env;
    vm.title = vm.lang.title;
    vm.migrations;
    vm.migrationsLoading = true;

    log.debug('vm.config.features.migrations.enabled', vm.config.features.migrations.enabled);

    vm.applyMigration = function(event, migrationVersion) {
      var confirm = $mdDialog.prompt()
        .title(vm.lang.keyDialogTitle)
        .textContent(vm.lang.keyDialogContent)
        .placeholder(vm.lang.keyDialogPlaceholder)
        .ariaLabel(vm.lang.keyDialogPlaceholder)
        .targetEvent(event)
        .required(true)
        .ok(vm.lang.keyDialogOk)
        .cancel(vm.lang.keyDialogCancel);

      $mdDialog.show(confirm).then(function(result) {
        console.log(migrationVersion);
        console.log(result);
      });
    };

    api.getLanguage('controllers/migrations/MigrationsController.lang').then(function(data) {
      log.setStack(codeBlocks.controller, 'MigrationsController', 'api.getLanguage(\'controllers/migrations/MigrationsController.lang\')');
      vm.lang = data;
    });

    api.getMigrations().then(function(data) {
      log.setStack(codeBlocks.controller, 'MigrationsController', 'api.getMigrations()');
      vm.migrations = data;
      vm.migrationsLoading = false;
    });
  }]);