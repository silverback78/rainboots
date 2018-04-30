// This exception to using Angular window service is to load environment variables
/* eslint angular/window-service: 0 */

'use strict';

angular.module('rainboots')

  .constant('features', window.__rainboots.features);

