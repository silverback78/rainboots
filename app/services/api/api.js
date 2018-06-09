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

    var getMigrations = function () {
      log.setStack(codeBlocks.factory, ['api', 'getMigrations()']);

      return $q(function(resolve, reject) {
        $http.get(config.api.migrations)
          .then(
            function(response) {
              log.setStack(codeBlocks.factory, ['api', 'getMigrations()', '$http.get(' + config.api.migrations + ')']);
              log.debug('response', response);
              resolve(response.data);
            },
            function() {
              log.setStack(codeBlocks.factory, ['api', 'getMigrations()', '$http.get(' + config.api.migrations + ')', '$http error callback']);
              log.error('Failed to get migrations');
              reject('Failed to get migrations');
            }
          );
      });
    };

    var getLanguage = function(languageFile) {
      log.setStack(codeBlocks.factory, ['api', 'getLanguage(' + languageFile + ')']);

      var languageFileUrl = languageFile + '.' + config.locale.id + '.json';

      return $q(function(resolve) {
        $http.get(languageFileUrl)
          .then(
            function(response) {
              log.setStack(codeBlocks.factory, ['api', 'getLanguage(' + languageFile + ')', '$http.get(' + languageFileUrl]);
              log.debug('response', response);
              resolve(response.data);
            },
            function() {
              log.setStack(codeBlocks.factory, ['api', 'getLanguage(' + languageFile + ')', '$http.get(' + languageFileUrl + ')', '$http error callback']);
              log.error('Unable to find language file ' + languageFileUrl);
              resolve(getDefaultLanguage(languageFile));
            }
          );
      });
    };

    var getDefaultLanguage = function(languageFile) {
      log.setStack(codeBlocks.factory, ['api', 'getDefaultLanguage(' + languageFile + ')']);

      var languageFileUrl = languageFile + '.' + config.locale.default + '.json';

      return $q(function(resolve, reject) {
        $http.get(languageFileUrl)
          .then(
            function(response) {
              log.setStack(codeBlocks.factory, ['api', 'getLanguage(' + languageFile + ')', '$http.get(' + languageFileUrl + ')']);
              log.debug('response', response);
              resolve(response.data);
            },
            function() {
              $http.get(languageFile + '.invalid.json');
              log.setStack(codeBlocks.factory, ['api', 'getLanguage(' + languageFile + ')', '$http.get(' + languageFileUrl + ')', '$http error callback']);

              var error = 'Unable to find language file ' + languageFileUrl;
              log.error(error);
              reject(error);
            }
          );
      });
    };

    return {
      getMigrations: getMigrations,
      getLanguage: getLanguage,
      getDefaultLanguage: getDefaultLanguage
    };
  }]);