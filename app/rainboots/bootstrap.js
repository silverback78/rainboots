'use strict';

var rainboots = rainboots || {};

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