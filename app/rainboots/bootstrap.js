'use strict';

var rainboots = rainboots || {};

angular.element(document).ready(function () {
  var initialize = function(data) {
    rainboots.loadConfig(data);
    rainboots.loadRoutes();
  };

  var bootstrap = function() {
    angular.bootstrap(document, ['rainboots']);
  };

  var requests = new rainboots.RequestHandler();

  requests.addRequest('GET', './rainboots.config.json', initialize);

  requests.sendAll(bootstrap);
});