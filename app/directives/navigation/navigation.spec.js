// Specs are allowed leniency with linting
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

'use strict';

describe('Directive: navigation', function() {
  var $compile;
  var $rootScope;
  var element;
  var log;

  beforeEach(module('rainboots', 'templates', 'NavigationController-mock', 'config-mock', 'log-mock'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should compile', function() {
    element = $compile('<navigation></navigation>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('md-nav-bar');
  });
});
