// This is a mock file, the variables will be used in specs.
/* eslint angular/file-name: 0 */
/* eslint angular/function-type: 0 */

'use strict';

var environment = {
  environment: 'dev',
  apiUrl: '../../parka'
};

angular.module('environment-mock', []).constant('environment', environment);
angular.module('environment-mock-value', []).constant('environmentMockValue', environment);
