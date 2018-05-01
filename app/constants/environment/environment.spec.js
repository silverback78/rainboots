// Specs are allowed leniency with linting
/* eslint no-undef: 0 */

'use strict';

describe('Constant: environment', function() {
  var environment;
  var environmentMockValue;

  beforeEach(module('rainboots', 'environment-mock-value'));

  beforeEach(inject(function(_environment_, _environmentMockValue_){
    environment = _environment_;
    environmentMockValue = _environmentMockValue_;
  }));

  it('should define constants', function() {
    expect(environment).toEqual(environmentMockValue);
  });
});