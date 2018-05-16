'use strict';

angular.module('rainboots')

/**
 * Summary.     API Service.
 *
 * Description. Angular module for abstracting the API into a front end service to maintain all API calls in a single location.
 *              Might be further abstracted as the application grows to have better separation of concerns.
 */
  .factory('api', ['$http', '$q', 'enums.codeBlocks', 'config', 'log', function($http, $q, codeBlocks, config, log) {
    log.setStack(codeBlocks.factory, 'api');
    return {
      getMigrations: function () {
        log.setStack(codeBlocks.factory, ['api', 'getMigrations()']);

        return $q(function(resolve) {
          $http.post(config.api.migrations)
            .then(
              function(response) {
                log.setStack(codeBlocks.factory, ['api', 'getMigrations()', '$http.post(' + config.api.migrations + ')']);
                log.debug('response', response);
                resolve(response.data);
              },
              function() {
                log.setStack(codeBlocks.factory, ['api', 'getMigrations()', '$http.post(' + config.api.migrations + ')', '$http error callback']);
                log.error('Failed to get migrations');
              }
            );
        });
      }
    };
  }]);