const { configureServer } = require("./config/configureServer");
const { configureDb } = require("./config/configureDb");
const { configureSocket } = require("./config/configureSocket");
const { configureMiddleware } = require("./config/configureMiddleware");

const { app, server, port } = configureServer();
configureMiddleware(app);

const { db } = configureDb();

const socket = configureSocket(server, db);

require("./routes/game")(app, db, socket);
require("./routes/player")(app, db, socket);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
