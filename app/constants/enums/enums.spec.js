'use strict';

describe('Constant: enums', function() {
  var enums;

  beforeEach(module('rainboots'));

  beforeEach(inject(function(_enums_){
    enums = _enums_;
  }));

  it('should define constants', function() {
    expect(typeof enums).toBe('object');
  });
});