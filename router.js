'use strict';

function route(handle, pathname) {
  console.log("routing request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]();
  }
  else {
    console.log("No request handler found for " + pathname);
    return "404 Not found";
  }
};

exports.route = route;
