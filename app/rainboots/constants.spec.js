// Specs are allowed to have magic numbers
/* eslint no-magic-numbers: 0 */

'use strict';

describe('Constant: constants', function() {
  var constants;

  beforeEach(module('rainboots'));

  beforeEach(inject(function(_constants_){
    constants = _constants_;
  }));

  it('should define constants', function() {
    expect(constants.enums.types.undefined).toBeDefined('undefined');
    expect(constants.enums.types.null).toBeDefined('null');
    expect(constants.enums.types.string).toBeDefined('string');
    expect(constants.enums.environments.dev).toBeDefined('dev');
    expect(constants.enums.environments.prod).toBeDefined('prod');
    expect(constants.enums.environments.spec).toBeDefined('spec');
    expect(constants.limits.maxInt).toBe(9007199254740991, 'maxInt');
    expect(constants.limits.minInt).toBe(-9007199254740991, 'minInt');
    expect(constants.environment).toBeDefined('environment');
    expect(constants.apiUrl).toBeDefined('apiUrl');
  });
});