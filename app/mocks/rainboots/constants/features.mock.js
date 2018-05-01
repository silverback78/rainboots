// This is a mock file, the variables will be used in specs.
/* eslint angular/file-name: 0 */
/* eslint angular/function-type: 0 */

'use strict';

var features = {
  log: {
    enabled: true,
    styles: true
  },
  migrations: {
    enabled: true
  }
};

angular.module('features-mock', []).constant('features', features);
angular.module('features-mock-value', []).constant('featuresMockValue', features);
