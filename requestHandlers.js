'use strict';

var exec = require('child_process').exec;

function logReq(name) {
  console.log("Request handler '" + name + "' was called.")
};

function writeTextContent(resp, content) {
  resp.writeHead(200, {"Content-Type": "text/plain"});
  resp.write(content);
  resp.end();
};

// function sleep(milliseconds) {
//   var startTime = new Date().getTime();
//   while (new Date().getTime() < startTime + milliseconds) {
//     ; // just spin uncomfortably here for the moment
//   }
// };

function start(response) {
  logReq("start");
  //sleep(5000);

  exec("find /",
    { timeout: 10000, maxBuffer: 20000 * 1024 },
    function(error, stdout, stderr) {
      writeTextContent(response, stdout);
  });
};

function upload(response) {
  logReq("upload");
  writeTextContent(response, "Chill yer drill, Bill");
};

exports.start = start;
exports.upload = upload;
