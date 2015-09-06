'use strict';

var querystring = require('querystring');

function logReq(name) {
  console.log("Request handler '" + name + "' was called.")
};

function writeTextContent(resp, content, type) {
  resp.writeHead(200, {"Content-Type": "text/" + (type || "plain")});
  resp.write(content);
  resp.end();
};

// function sleep(milliseconds) {
//   var startTime = new Date().getTime();
//   while (new Date().getTime() < startTime + milliseconds) {
//     ; // just spin uncomfortably here for the moment
//   }
// };

function start(response, postData) {
  logReq("start");

  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" method="POST">' +
    '<textarea name="text" rows="20" cols="60"></textarea>' +
    '<input type="submit" value="Submit text" />' +
    '</form>' +
    '</body>' +
    '</html>';

  writeTextContent(response, body, "html");
};

function upload(response, postData) {
  logReq("upload: " + postData);
  writeTextContent(response, "You said: " + querystring.parse(postData).text);
};

exports.start = start;
exports.upload = upload;
