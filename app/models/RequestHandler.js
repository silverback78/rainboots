'use strict';

var rainboots = rainboots || {};

rainboots.RequestHandler = function () {
  this.requests = [];
  this.successCount = 0;
  this.failureCount = 0;
};

rainboots.RequestHandler.prototype.addRequest = function(requestType, requestUrl, successCallback, failureCallback) {
  var doneReadyState = 4;
  var successStatus = 200;
  var xhttp = new XMLHttpRequest();

  xhttp.successCallback = successCallback;
  xhttp.failureCallback = failureCallback;
  xhttp.requestType = requestType;
  xhttp.requestUrl = requestUrl;
  xhttp.parent = this;

  xhttp.onreadystatechange = function () {
    if (this.readyState === doneReadyState) {
      if (this.status === successStatus) {
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

rainboots.RequestHandler.prototype.sendAll = function(finalSuccessCallback, finalFailureCallback) {
  this.finalSuccessCallback = finalSuccessCallback;
  this.finalFailureCallback = finalFailureCallback;

  for (var i = 0; i < this.requests.length; i++) {
    var xhttp = this.requests[i];
    xhttp.open(xhttp.requestType, xhttp.requestUrl);
    xhttp.send();
  }
};

rainboots.RequestHandler.prototype.completeRequest = function(success) {
  success
    ? this.successCount++
    : this.successCount--;

  var complete = this.requests.length === this.successCount + this.failureCount;

  if (complete) {
    if (this.successCount === this.requests.length) {
      angular.isFunction(this.finalSuccessCallback) && this.finalSuccessCallback();
    }
    else {
      angular.isFunction(this.finalFailureCallback) && this.finalFailureCallback();
    }
  }
};