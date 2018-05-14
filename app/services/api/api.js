'use strict';

angular.module('rainboots')

  .factory('api', ['$http', '$q', 'config', 'enums', 'log', function($http, $q, config, enums, log) {
    log.setStack(enums.codeBlocks.factory, 'api');
    return {
      getMigrations: function () {
        log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()']);

        return $q(function(resolve) {
          $http.post(config.env.api.migrations)
            .then(
              function(response) {
                log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()', '$http.post(' + config.env.api.migrations + ')']);
                log.debug('response', response);
                resolve(response.data);
              },
              function() {
                log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()', '$http.post(' + config.env.api.migrations + ')', '$http error callback']);
                log.error('Failed to get migrations');
              }
            );
        });
      }
    };
  }]);