'use strict';

angular.module('rainboots')

/**
 * Summary. Service for handling various aspects of the web page itself, such as page title.
 */
  .factory('page', ['$rootScope', 'enums.codeBlocks', 'log', function ($rootScope, codeBlocks, log) {
    log.setStack(codeBlocks.factory, 'page');

    var setTitle = function (title) {
      log.setStack(codeBlocks.factory, ['page', 'setTitle("' + title + '")']);
      if (!title) {
        log.warn('No title was given, exiting.');
        return;
      }
      $rootScope.title = title;
    };

    var registerTitleEventHandler = function () {
      log.setStack(codeBlocks.factory, ['page', 'registerTitleEventHandler()']);
      $rootScope.$on('$routeChangeSuccess', function (event, current) {
        setTitle(current.$$route.title);
      });
    };

    return {
      setTitle: setTitle,
      registerTitleEventHandler: registerTitleEventHandler
    };
  }]);