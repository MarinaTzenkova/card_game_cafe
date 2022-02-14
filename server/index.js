const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 3001;
let server = http.createServer(app);

const path = require("path");
const route = path.join(__dirname, "db.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(route);
const db = low(adapter);

const { configureSocket } = require("./socket");
const { configureServer } = require("./server");

configureServer(app);

app.use((req, res, next) => {
  if (req.method === "POST") {
    // use socket to notify all players when a card is played
  }
  next();
});

app.post("/board", (res, req, next) => {
  next();
});

const socket = configureSocket(server);

require("./routes/game")(app, db, socket);
require("./routes/deck")(app, db, socket);
require("./routes/participants")(app, db, socket);
require("./routes/player")(app, db);
require("./routes/scores")(app, db, socket);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
