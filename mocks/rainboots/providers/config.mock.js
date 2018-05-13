// Using controller-as, but $scope must be used to set angular material properties
/* eslint angular/controller-as: 0 */
/* eslint angular/file-name: 0 */

'use strict';

angular.module('config-mock', [])

  .provider('config', function () {
    var configurationData = {
      env: {
        env: 'dev',
        api: {
          migrations: '../../parka/migrations',
          features: '../../parka/features'
        }
      },
      features: {
        log: {
          enabled: true,
          styles: true
        },
        migrations: {
          enabled: true
        }
      }
    };

    this.initialize = function (data) {
      configurationData = angular.fromJson(data);
    };

    this.$get = function () {
      return configurationData;
    };
  });