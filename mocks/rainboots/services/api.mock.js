// This is a mock file, the variables will be used in specs.
/* eslint angular/file-name: 0 */

'use strict';

var migrationsData = [
  {
    timestamp: '4/1/2018 @ 2:31 pm',
    version: '1.0.001',
    description: 'Initialize database tables'
  },
  {
    timestamp: '4/1/2018 @ 2:37 pm',
    version: '1.0.002',
    description: 'Add data to words'
  },
  {
    timestamp: '',
    version: '1.0.003',
    description: 'Add data to nouns'
  },
  {
    timestamp: '',
    version: '1.0.004',
    description: 'Add data to adjectives'
  }
];

angular.module('api-mock', [])
  .factory('api', ['$q', function ($q) {
    return {
      getMigrations: function () {
        return $q(function (resolve) {
          resolve(migrationsData);
        });
      }
    };
  }]);

