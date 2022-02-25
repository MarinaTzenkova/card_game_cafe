const express = require("express");
const http = require("http");

function configureServer() {
  const app = express();
  const port = process.env.PORT || 3001;
  let server = http.createServer(app);
  app.use(function (req, res, next) {
    setTimeout(next, 0);
  });

  return { app, server, port };
}

module.exports = {
  configureServer,
};
