// This is a mock file, the variables will be used in specs.
/* eslint angular/file-name: 0 */
/* eslint angular/function-type: 0 */

'use strict';

var enums = {
  environments: {
    dev: 'dev',
    prod: 'prod',
    spec: 'spec'
  },
  severities: {
    warning: 'warning',
    error: 'error'
  },
  codeBlocks: {
    controller: 'controller',
    directive: 'directive',
    filter: 'filter',
    service: 'service',
    factory: 'factory',
    constant: 'constant',
    value: 'value',
    decorator: 'decorator',
    provider: 'provider',
    run: 'run',
    javascript: 'javascript'
  },
  types: {
    undefined: 'undefined',
    null: 'null',
    string: 'string',
    object: 'object'
  }
};

angular.module('enums-mock', []).constant('enums', enums);
angular.module('enums-mock-value', []).constant('enumsMockValue', enums);
