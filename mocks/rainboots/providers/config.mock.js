// Using controller-as, but $scope must be used to set angular material properties
/* eslint angular/controller-as: 0 */
/* eslint angular/file-name: 0 */
/* eslint no-magic-numbers: 0 */

'use strict';

angular.module('config-mock', [])

  .provider('config', function () {
    var configurationData = {
      env: 'dev',
      api: {
        migrations: '../../parka/migrations',
        features: '../../parka/features'
      },
      features: {
        log: {
          enabled: true,
          stylesEnabled: false,
          setStackCalled: 'called',
          severities: {
            debug: 'debug',
            warn: 'warn',
            error: 'error'
          },
          errors: {
            codeBlockError: 'Error setting code block: {codeBlock} is not a valid code block.',
            noCodeBlock: 'Warning: No code block is set',
            warn: 'Warning: ',
            error: 'Error: '
          },
          separators: {
            comment: ' // ',
            data: ' -> ',
            log: ': ',
            equals: ' = ',
            style: '%c'
          },
          styles: {
            warn: 'color: #493a05',
            error: 'color: #f00; font-weight: bold;',
            comment: 'color: #090;',
            data: 'color: #222',
            controller: 'color: #015eb5;',
            directive: 'color: #31a7d6;',
            filter: 'color: #18979b;',
            service: 'color: #ae06ba;',
            factory: 'color: #ae06ba;',
            constant: 'font-weight: bold; color: #493a05;',
            value: 'color: #493a05;',
            decorator: 'color: #f76f9e;',
            provider: 'color: #c61930;',
            run: 'color: #222',
            javascript: 'color: #222;'
          }
        },
        migrations: {
          enabled: true
        },
        spinner: {
          delayStart: 1500
        }
      },
      locale: {
        DATETIME_FORMATS: {
          AMPMS: [
            'AM',
            'PM'
          ],
          DAY: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturda'
          ],
          ERANAMES: [
            'Before Christ',
            'Anno Domini'
          ],
          ERAS: [
            'BC',
            'AD'
          ],
          FIRSTDAYOFWEEK: 6,
          MONTH: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'Decembe'
          ],
          SHORTDAY: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ],
          SHORTMONTH: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          STANDALONEMONTH: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          WEEKENDRANGE: [
            5,
            6
          ],
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          medium: 'MMM d, y h:mm:ss a',
          mediumDate: 'MMM d, y',
          mediumTime: 'h:mm:ss a',
          short: 'M/d/yy h:mm a',
          shortDate: 'M/d/yy',
          shortTime: 'h:mm a'
        },
        NUMBER_FORMATS: {
          CURRENCY_SYM: '$',
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              gSize: 3,
              lgSize: 3,
              maxFrac: 3,
              minFrac: 0,
              minInt: 1,
              negPre: '-',
              negSuf: '',
              posPre: '',
              posSuf: ''
            },
            {
              gSize: 3,
              lgSize: 3,
              maxFrac: 2,
              minFrac: 2,
              minInt: 1,
              negPre: '-¤',
              negSuf: '',
              posPre: '¤',
              posSuf: ''
            }
          ]
        },
        id: 'en-us',
        default: 'en-us',
        localeID: 'en_US'
      }
    };

    this.initialize = function (data) {
      configurationData = angular.fromJson(data);
    };

    this.$get = function () {
      return configurationData;
    };
  });