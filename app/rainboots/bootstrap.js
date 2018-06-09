// Run blocks are allowed go log.
/* eslint angular/no-run-logic: 0 */

'use strict';

var rainboots = rainboots || {};

/**
 * Summary.     Manual bootstrapping of the application.
 *
 * Description. Manual bootstrapping is required in order to hook into the config portion of the application lifecycle
 *              and allow the config provider to fetch the local and remote configurations before initializing the application.
 *              This means that the configurationi settings can be used anywhere in the app, including during the config cycle.
 *              This allows all portions of the application to be controlled by the config.
 *
 *              Request handler is instantiated to handle getting the configuration files, and passes that information to the
 *              config provider. Only after all configuration has been initialized will the application finally be bootstrapped
 *              to the DOM.
 */
angular.element(document).ready(function () {
  var bootstrap = function() {
    rainboots.loadRoutes();
    angular.bootstrap(document, ['rainboots']);
  };

  var configFile = './rainboots.config.json';
  var serverConfigUrl = '../../parka/config';
  var requestType = 'GET';

  var requestHandler = new rainboots.RequestHandler();
  requestHandler.addRequest(requestType, configFile, rainboots.loadLocalConfig);
  requestHandler.addRequest(requestType, serverConfigUrl, rainboots.loadRemoteConfig);

  requestHandler.sendAll(bootstrap);
});

angular.module('rainboots')
  .run(['enums.codeBlocks', 'config', 'log', function(codeBlocks, config, log) {
    log.setStack(codeBlocks.run, 'bootstrap');
    log.debug('config', config);
  }]);