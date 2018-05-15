'use strict';

var rainboots = rainboots || {};

/**
 * Summary.     Class for resolving multiple XMLHttpRequest objects with a final callback. This class was added to handle
 *              http requests that happen in the config portion of the application lifecycle where Angular services are not
 *              yet available. Opted to use native JavaScript instead of JQuery because this is the only place where external
 *              services are required.
 *
 * Description. RequestHandler an accept one or more requests of any type. It will resolve all of the requests, running
 *              success or failure callback functions for each request. Once all requests are finished, it will run a final
 *              success or failure callback function.
 *
 * var requestHandler = new rainboots.RequestHandler();
 *              Initializes the class with a new instance.
 */
rainboots.RequestHandler = function () {
  this.requests = [];
  this.successCount = 0;
  this.completeCount = 0;
};

/**
 * Summary. Method for adding requests
 *
 * requestHandler.addRequest(string requestType, string requestUrl, function successCallback, function failureCallback)
 *              Adds a request to the request handler. The request type can be any valid type such as GET or POST. The requestUrl
 *              should be a fully qualified or relative URL. The success and failure callbacks shoudl be functions. If the call is
 *              successful, the success callback will be called. Otherwise, the failure callback will be called.
 *
 *              @param  {string} requestType               Any valid request type such as GET or POST
 *              @param  {string} requestUrl                A fully qualified or relative Url to the desired resource.
 *              @param  {function} successCallback         Optional function to run on success.
 *              @param  {function} failureCallback         Optional function to run on failure
 *              @return {void}
 */
rainboots.RequestHandler.prototype.addRequest = function(requestType, requestUrl, successCallback, failureCallback) {
  var successStatus = 200;
  var xhttp = new XMLHttpRequest();

  xhttp.successCallback = successCallback;
  xhttp.failureCallback = failureCallback;
  xhttp.requestType = requestType;
  xhttp.requestUrl = requestUrl;
  xhttp.parent = this;

  xhttp.onreadystatechange = function () {
    var requestComplete = this.readyState === this.DONE;
    var successfulResponse = this.status === successStatus;

    if (requestComplete) {
      if (successfulResponse) {
        angular.isFunction(this.successCallback) && this.successCallback(xhttp.responseText);
        xhttp.parent.completeRequest(true);
      }
      else {
        angular.isFunction(this.failureCallback) && this.failureCallback(xhttp.responseText);
        xhttp.parent.completeRequest(false);
      }
    }
  };

  this.requests.push(xhttp);
};

/**
 * Summary. Method to make all requests
 *
 * requestHandler.sendAll(function finalSuccessCallback, function finalFailureCallback)
 *              Sends all requests that have been added. Each request will run the corresponding callback functions
 *              depending on the success or failure of that particular request. After all requests have resolved, a final
 *              success or failure callback function will be run. The final success callback will run if all requests were
 *              a success. If any request failed, the final failure callback will be run.
 *
 *              @param  {function} successCallback         Optional function to run on success of all requests.
 *              @param  {function} failureCallback         Optional function to run on failure of any request
 *              @return {void}
 */
rainboots.RequestHandler.prototype.sendAll = function(finalSuccessCallback, finalFailureCallback) {
  this.finalSuccessCallback = finalSuccessCallback;
  this.finalFailureCallback = finalFailureCallback;

  for (var i = 0; i < this.requests.length; i++) {
    var xhttp = this.requests[i];
    xhttp.open(xhttp.requestType, xhttp.requestUrl);
    xhttp.send();
  }
};

/**
 * Summary. Private method to handle request completions. Should not be called from an instance of RequestHandler.
 */
rainboots.RequestHandler.prototype.completeRequest = function(success) {
  success && this.successCount++;
  this.completeCount++;

  var allComplete = this.requests.length === this.completeCount;

  if (allComplete) {
    var allSuccess = this.successCount === this.requests.length;

    if (allSuccess) {
      angular.isFunction(this.finalSuccessCallback) && this.finalSuccessCallback();
    }
    else {
      angular.isFunction(this.finalFailureCallback) && this.finalFailureCallback();
    }
  }
};