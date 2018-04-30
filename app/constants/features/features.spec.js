'use strict';

describe('Constant: features', function() {
  var features;

  beforeEach(module('rainboots'));

  beforeEach(inject(function(_features_){
    features = _features_;
  }));

  it('should define constants', function() {
    expect(typeof features).toBe('object');
  });
});