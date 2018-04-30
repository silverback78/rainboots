// This file the environment file and is not part of angular. Should not use angular linting rules.
/* eslint angular/window-service: 0 */

'use strict';

(function (window) {
  window.__rainboots = window.__rainboots || {};
  window.__rainboots.environment = {
    environment: 'dev',
    apiUrl: '../../parka'
  };
  window.__rainboots.features = {
    log: {
      enabled: true,
      styles: true
    },
    migrations: {
      enabled: true
    }
  };
}(this));