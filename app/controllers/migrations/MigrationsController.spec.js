// Specs are allowed leniency with linting
/* eslint no-magic-numbers: 0 */
/* eslint no-undef: 0 */

'use strict';

describe('Controller: MigrationsController', function () {
  beforeEach(module('rainboots', 'templates', 'api-mock', 'enums-mock', 'config-mock', 'log-mock'));

  var $scope;
  var config;
  var MigrationsController;

  describe('Feature enabled', function() {
    beforeEach(inject(function (_$controller_, _$rootScope_, _config_) {
      $scope = _$rootScope_.$new();
      config = _config_;

      MigrationsController = _$controller_('MigrationsController', {
        $scope: $scope,
        config: config
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

  describe('Feature disabled', function() {
    beforeEach(inject(function (_$controller_, _$rootScope_, _config_) {
      _config_.features.migrations.enabled = false;

      $scope = _$rootScope_.$new();
      config = _config_;

      MigrationsController = _$controller_('MigrationsController', {
        $scope: $scope,
        config: config
      });
    }));
    beforeEach(function() {
      config.features.migrations.enabled = false;
    });

    it('should be disabled if the feature is disabled', function() {
      expect(MigrationsController.title).not.toBeDefined();
    });
  });
});