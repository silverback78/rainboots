'use strict';

angular.module('rainboots')

  .factory('api', ['$http', '$q', 'enums', 'log', 'environment', function($http, $q, enums, log, env) {
    log.setStack(enums.codeBlocks.factory, 'api');
    return {
      getMigrations: function () {
        log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()']);
        var deferred = $q.defer();

        $http.get(env.apiUrl + '/migrations')
          .then(
            function(response) {
              log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()', '$http.get(' + env.apiUrl + '/migrations)']);
              log.debug('response', response);
              deferred.resolve(response.data);
            },
            function() {
              log.setStack(enums.codeBlocks.factory, ['api', 'getMigrations()', '$http.get(' + env.apiUrl + '/migrations)', '$http error callback']);
              log.error('Failed to get migrations');
              deferred.reject('Failed to get migrations');
            }
          );

        return deferred.promise;
      }
    };
  }]);