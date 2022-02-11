const socketIO = require("socket.io");

function configureSocket(server) {
  var io = socketIO(server, { cors: { origin: "http://localhost:3000" } });

  io.on("connection", (socket) => {
    console.log("New user connected");
    //emit message from server to user
    socket.emit("newMessage", "sup bi4");

    // listen for message from user
    socket.on("createMessage", (newMessage) => {
      console.log("newMessage", newMessage);
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
