// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */
/* eslint no-undef: 0 */

'use strict';

describe('Controller: HomeController', function() {
  beforeEach(module('rainboots', 'enums-mock', 'config-mock', 'log-mock'));

  var HomeController;

  beforeEach(inject(function($controller) {
    HomeController = $controller('HomeController');
  }));

  it('should have a title of "Home"', function() {
    expect(HomeController.title).toEqual('Home', {});
  });
});