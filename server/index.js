const { configureServer } = require("./config/configureServer");
const { configureDb } = require("./config/configureDb");
const { configureMiddleware } = require("./config/configureMiddleware");

const { app, server, port } = configureServer();
configureMiddleware(app);

const { db } = configureDb();

require("./socket")(app, db);
require("./routes/game")(app, db);
require("./routes/player")(app, db);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
