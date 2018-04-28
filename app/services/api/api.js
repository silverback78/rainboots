'use strict';

angular.module('rainboots')

  .factory('api', ['$http', '$q', 'constants', 'log', function($http, $q, constants, log) {
    log.setStack(constants.enums.codeBlocks.factory, 'api');
    return {
      getMigrations: function () {
        log.setStack(constants.enums.codeBlocks.factory, ['api', 'getMigrations()']);
        var deferred = $q.defer();

        $http.get(constants.apiUrl + '/migrations')
          .then(
            function(response) {
              log.setStack(constants.enums.codeBlocks.factory, ['api', 'getMigrations()', '$http.get(' + constants.apiUrl + '/migrations)']);
              log.debug('response', response);
              deferred.resolve(response.data);
            },
            function() {
              log.setStack(constants.enums.codeBlocks.factory, ['api', 'getMigrations()', '$http.get(' + constants.apiUrl + '/migrations)', '$http error callback']);
              log.error('Failed to get migrations');
              deferred.reject('Failed to get migrations');
            }
          );

        return deferred.promise;
      }
    };
  }]);