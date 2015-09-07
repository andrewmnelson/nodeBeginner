'use strict';

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("request for " + pathname + " received");
    route(handle, pathname, response, request);
  };

  http.createServer(onRequest).listen(8765);
  console.log("server started");
};

exports.start = start;
