'use strict';

angular.module('rainboots')

  .constant('enums', {
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
  });

