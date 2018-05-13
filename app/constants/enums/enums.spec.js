// Specs are allowed leniency with linting
/* eslint no-undef: 0 */

'use strict';

describe('Constant: enums', function() {
  var enums;
  var enumsMockValue;

  beforeEach(module('rainboots', 'enums-mock-value', 'config-mock', 'log-mock'));

  beforeEach(inject(function(_enums_, _enumsMockValue_){
    enums = _enums_;
    enumsMockValue = _enumsMockValue_;
  }));

  it('should define constants', function() {
    expect(enums).toEqual(enumsMockValue);
  });
});