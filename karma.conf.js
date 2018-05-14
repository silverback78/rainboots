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

      { pattern: './app/rainboots.config.json', included: false, served: true },
      './mocks/rainboots/**/*.js',

      './app/models/**/*.js',
      './app/rainboots/rainboots.js',

      './app/providers/**/*.js',
      './app/constants/**/*.js',
      './app/services/**/*.js',
      './app/controllers/**/*.js',
      './app/directives/**/*.js',

      './app/controllers/**/*.html',
      './app/icons/**/*.svg'
    ],

    frameworks: ['jasmine'],
    browsers: ['Chrome', 'PhantomJS'],
    reporters: ['progress', 'coverage'],
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
      './app/icons/**/*.svg': 'ng-html2js',
      './app/**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'templates'
    },

    coverageReporter: {
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ],

    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  });
};