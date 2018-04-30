'use strict';

describe('Constant: environment', function() {
  var environment;

  beforeEach(module('rainboots'));

  beforeEach(inject(function(_environment_){
    environment = _environment_;
  }));

  it('should define constants', function() {
    expect(typeof environment).toBe('object');
  });
});