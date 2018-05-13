// Specs are allowed leniency with linting
/* eslint no-undef: 0 */
/* eslint no-magic-numbers: 0 */

'use strict';

describe('Model: RequestHandler', function () {
  var requestHandler;

  beforeEach(function() {
    requestHandler = new rainboots.RequestHandler();
  });

  it('should be defined', function() {
    expect(requestHandler).not.toBe(null);
  });

  it('should add a request to the request handler', function() {
    requestHandler.addRequest('GET', '/base/app/rainboots.config.json');
    expect(requestHandler.requests.length).toBe(1);
  });

  it('should make an xmlhttp request', function() {
    requestHandler.addRequest('GET', '/base/app/rainboots.config.json');

    spyOn(requestHandler.requests[0], 'onreadystatechange');
    requestHandler.sendAll();

    expect(requestHandler.requests[0].onreadystatechange).toHaveBeenCalled();
  });
});