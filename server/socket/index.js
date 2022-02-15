const socketIO = require("socket.io");

function configureSocket(server) {
  var io = socketIO(server, { cors: { origin: "http://localhost:3000" } });

  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join", (room) => {
      socket.join(room);

      // emitting to a room from specific socket
      // socket.to("game_cafe").emit("test", "sup bi4");

      io.to("game_cafe").emit("welcome", "Welcome to game cafe");
    });

    // when server disconnects from user
    socket.on("disconnect", () => {
      console.log("disconnected from user");
    });
  });

  return io;
}

module.exports = {
  configureSocket,
};
