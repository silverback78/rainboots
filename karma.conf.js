'use strict';

module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-route/angular-route.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-aria/angular-aria.js',
      './node_modules/angular-messages/angular-messages.js',
      './node_modules/angular-material/angular-material.js',

      './app/rainboots.config.js',
      './app/rainboots/rainboots.js',
      './app/constants/**/*.js',
      './app/rainboots/routes.js',

      './app/controllers/**/*.js',
      './app/directives/**/*.js',
      './app/services/**/*.js',

      './app/controllers/**/*.html',
      './app/directives/**/*.html',
      './app/icons/**/*.svg',

      './app/**/*.spec.js'
    ],

    frameworks: ['jasmine'],
    browsers: ['Chrome', 'PhantomJS'],
    reporters: ['progress'],
    port: 9876,

    customLaunchers: {
      'PhantomJS_debug': {
        base: 'PhantomJS',
        debug: true
      }
    },

    preprocessors: {
      './app/directives/**/*.html': 'ng-html2js',
      './app/controllers/**/*.html': 'ng-html2js',
      './app/icons/**/*.svg': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'templates'
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  });
};