// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */

'use strict';

describe('Factory: utilities', function() {

  beforeEach(module('rainboots'));

  var utilities;
  var obj = {
    value1: 'value1',
    value2: 'value2',
    value3: 'value3',
    int1: 1,
    int2: 2,
    obj1: {
      value1: 'value1',
      value2: 'value2',
      int1: 1,
      int2: 2,
      arr1: [1, 2, 3]
    }
  };

  beforeEach(inject(function (_utilities_) {
    utilities = _utilities_;
  }));

  it('should make a clone of an object by value, not by reference', function() {
    var copy = utilities.clone(obj);
    copy.value1 = 'value 1';

    expect(obj.value1).toBe('value1');
    expect(copy.value1).toBe('value 1');
  });
});