// This is a mock file, the variables will be used in specs.
/* eslint angular/file-name: 0 */

'use strict';

angular.module('log-mock', [])
  .factory('log', function () {
    return {
      setStack: function () {},
      debug: function () {},
      warn: function () {},
      error: function () {},
      reset: function () {}
    };
  });
