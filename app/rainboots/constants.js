// Constants cannot have dependencies, this exception to using Angular window service is to load environment variables
/* eslint angular/window-service: 0 */

'use strict';

angular.module('rainboots')

  .constant('constants', {
    environment: window.__env.environment,
    apiUrl: window.__env.apiUrl,
    enums: {
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
        string: 'string'
      }
    },
    limits: {
      maxInt: 9007199254740991,
      minInt: -9007199254740991
    }
  });

