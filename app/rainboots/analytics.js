// Turning off linting for uglified code snippet provided by Google Analytics
/* eslint angular/no-run-logic: 0 */
/* eslint indent: 0 */
/* eslint semi: 0 */
/* eslint no-magic-numbers: 0 */
/* eslint brace-style: 0 */

'use strict';

angular.module('rainboots')

.run(['constants', 'log', function(constants, log) {
    if (constants.environment === constants.enums.environments.prod) {
      log.setStack(constants.enums.codeBlocks.run, ['analytics', 'calling google analytics']);
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-104965860-1', 'auto');
      ga('send', 'pageview');
    }
  }]);