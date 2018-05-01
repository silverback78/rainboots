'use strict';

angular.module('rainboots')

  .factory('api', ['$http', '$q', 'enums', 'environment', 'log', function($http, $q, enums, env, log) {
    log.setStack(enums.codeBlocks.factory, 'api');
    return {
      getMigrations: function () {
        log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()']);

        return $q(function(resolve, reject) {
          $http.get(env.apiUrl + '/migrations')
            .then(
              function(response) {
                log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()', '$http.get(' + env.apiUrl + '/migrations)']);
                log.debug('response', response);
                resolve(response.data);
              },
              function() {
                log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()', '$http.get(' + env.apiUrl + '/migrations)', '$http error callback']);
                log.error('Failed to get migrations');
                reject('Failed to get migrations');
              }
            );

        });
      }
    };
  }]);