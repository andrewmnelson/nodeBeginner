'use strict';

function logReq(name) {
  console.log("Request handler '" + name + "' was called.")
};

function start() {
  logReq("start");
  return "Hello Fellow.";
};

function upload() {
  logReq("upload");
  return "Are you Mellow?";
};

exports.start = start;
exports.upload = upload;
