'use strict';

describe('Service: page', function () {

  beforeEach(module('rainboots', 'templates', 'config-mock', 'log-mock'));

  var $rootScope;
  var log;
  var page;

  beforeEach(inject(function (_$rootScope_, _log_, _page_) {
    $rootScope = _$rootScope_;
    page = _page_;
    log = _log_;
  }));

  describe('registerTitleEventHandler()', function () {
    it('should register a $routeChangeSuccess eventhandler on $rootScope', function () {
      spyOn($rootScope, '$on');
      page.registerTitleEventHandler();
      expect($rootScope.$on).toHaveBeenCalledWith('$routeChangeSuccess', jasmine.any(Function));
    });

    it('should call setTitle when the route changes', function () {
      page.registerTitleEventHandler();
      var currentPage = {
        $$route: {
          title: 'currentPage',
          originalPath: 'currentPage'
        }
      };

      var previousPage = {
        $$route: {
          title: 'previousPage',
          originalPath: 'previousPage'
        }
      };

      $rootScope.$broadcast('$routeChangeSuccess', currentPage, previousPage);
      expect($rootScope.title).toBe('currentPage');
    });
  });

  describe('setTitle()', function () {
    it('should set the title', function () {
      page.setTitle('pageTitle');
      expect($rootScope.title).toBe('pageTitle');
    });

    it('should warn when the title is empty', function () {
      spyOn(log, 'warn');
      page.setTitle('');
      expect(log.warn).toHaveBeenCalledWith('No title was given, exiting.');
    });
  });
});
