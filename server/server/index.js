const whitelist = ["http://localhost:3000"];
var bodyParser = require("body-parser");
const cors = require("cors");

function configureServer(app) {
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    setTimeout(next, 0);
  });
}

module.exports = {
  configureServer,
};
