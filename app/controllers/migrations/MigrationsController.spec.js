// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */
/* eslint no-undef: 0 */

'use strict';

describe('Controller: MigrationsController', function () {
  beforeEach(module('rainboots', 'templates', 'api-mock', 'enums-mock', 'config-mock', 'log-mock'));

  var MigrationsController;
  var $scope;

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $scope = _$rootScope_.$new();

    MigrationsController = _$controller_('MigrationsController', {
      $scope: $scope
    });
  }));

  it('should have a title', function (){
    expect(MigrationsController.title).toBeDefined();
  });

  it('should request migrations on load', function() {
    $scope.$root.$digest();
    expect(MigrationsController.migrations[0].timestamp).toBe('4/1/2018 @ 2:31 pm');
  });
});
