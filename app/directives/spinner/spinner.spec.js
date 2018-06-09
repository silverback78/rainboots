// Specs are allowed leniency with linting
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-magic-numbers: 0 */

'use strict';

describe('Directive: spinner', function() {
  var $compile;
  var $rootScope;
  var $timeout;
  var element;
  var log;

  beforeEach(module('rainboots', 'templates', 'config-mock'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;

    element = $compile('<div spinner="true"></div>')($rootScope);
    $rootScope.$digest();
  }));

  it('should compile and be hidden', function() {
    expect(element.html()).toContain('aria-hidden="true"');
  });

  it('should show the spinner after the delay', function() {
    $timeout.flush();
    $timeout.verifyNoPendingTasks();
    expect(element.html()).toContain('aria-hidden="false"');
  });
});
