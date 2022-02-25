const socketIO = require("socket.io");
const { gameDbHelper, playerDbHelper } = require("../service");

module.exports = (server, db) => {
  var io = socketIO(server, { cors: { origin: "http://localhost:3000" } });
  const gameService = gameDbHelper(db);
  const playerService = playerDbHelper(db);

  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join", (room) => {
      socket.join(room);

      io.to("game_cafe").emit("welcome", "Welcome to game cafe!");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from user");
    });

    require("./game")(gameService, playerService, socket, io);
  });
};
