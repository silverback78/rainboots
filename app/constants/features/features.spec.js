// Specs are allowed leniency with linting
/* eslint no-undef: 0 */

'use strict';

describe('Constant: features', function() {
  var features;
  var featuresMockValue;

  beforeEach(module('rainboots', 'features-mock-value'));

  beforeEach(inject(function(_features_, _featuresMockValue_){
    features = _features_;
    featuresMockValue = _featuresMockValue_;
  }));

  it('should define constants', function() {
    expect(features).toEqual(featuresMockValue);
  });
});