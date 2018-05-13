'use strict';

angular.module('rainboots')

  .factory('page', ['$rootScope', 'enums', 'log', function ($rootScope, enums, log) {
    log.setStack(enums.codeBlocks.factory, 'page');

    var setTitle = function (title) {
      log.setStack(enums.codeBlocks.factory, ['page', 'setTitle("' + title + '")']);
      if (!title) {
        log.warn('No title was given, exiting.');
        return;
      }
      $rootScope.title = title;
    };

    var registerTitleEventHandler = function () {
      log.setStack(enums.codeBlocks.factory, ['page', 'registerTitleEventHandler()']);
      $rootScope.$on('$routeChangeSuccess', function (event, current) {
        setTitle(current.$$route.title);
      });
    };

    return {
      setTitle: setTitle,
      registerTitleEventHandler: registerTitleEventHandler
    };
  }]);