'use strict';

describe('Controller: HomeController', function() {
  beforeEach(module('rainboots'));

  var HomeController;

  beforeEach(inject(function($controller) {
    HomeController = $controller('HomeController', {});
  }));

  it('should have a title of "Home"', function() {
    expect(HomeController.title).toEqual('Home', {});
  });
});