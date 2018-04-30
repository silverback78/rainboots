// This exception to using Angular window service is to load environment variables
/* eslint angular/window-service: 0 */

'use strict';

angular.module('rainboots')

  .constant('environment', window.__rainboots.environment);

