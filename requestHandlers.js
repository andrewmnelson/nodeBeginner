'use strict';

var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function logReq(name) {
  console.log("Request handler '" + name + "' was called.")
};

function writeTextContent(resp, content, type) {
  resp.writeHead(200, {"Content-Type": "text/" + (type || "plain")});
  resp.write(content);
  resp.end();
};

function start(response) {
  logReq("start");

  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; charset="UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" multiple="multiple" />' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';

  writeTextContent(response, body, "html");
};

function upload(response, request) {
  logReq("upload");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log(form);
    console.log("parsing complete");
    console.log(error, fields, files);  // why (null, {} {})?
    // check for possible error: trying to rename over existing named file
    fs.rename(files.upload.path, "C:/temp/test.jpg", function(error) {
      if (error) {
        fs.unlink("C:/temp/test.jpg");
        fs.rename(file.upload.path, "C:/temp/test.jpg");
      }
    });
    writeTextContent(response, "Received image:<BR/><img src='/show'/>", "html");
  });
};

function show(response) {
  logReq("show");
  response.writeHead(200, {"Content-Type": "image/jpg"});
  fs.createReadStream("C:/temp/test.jpg").pipe(response);
};

exports.start = start;
exports.upload = upload;
exports.show = show;
