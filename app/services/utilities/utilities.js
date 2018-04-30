'use strict';

angular.module('rainboots')

  .factory('utilities', ['log', 'enums', function(log, enums) {
    log.setStack(enums.codeBlocks.factory, 'utilities');

    var clone = function(obj) {
      log.setStack(enums.codeBlocks.factory, ['utilities', 'clone(' + obj + ')']);
      if (obj === null || typeof(obj) !== enums.types.object) {
        return obj;
      }

      var copy = new obj.constructor();
      for (var key in obj) {
        copy[key] = clone(obj[key]);
      }

      return copy;
    };

    return {
      clone: clone
    };
  }]);