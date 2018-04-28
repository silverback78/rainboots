'use strict';

describe('Directive: navigation', function() {
  var $compile;
  var $rootScope;

  beforeEach(module('rainboots', 'templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should compile', function() {
    var element = $compile('<navigation></navigation>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('md-nav-bar');
  });
});
