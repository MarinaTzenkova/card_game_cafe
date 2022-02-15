import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

const io = socketIOClient(ENDPOINT);

export function joinGameRoom(id) {
  io.on("connection", (socket) => {
    socket.join("game_room");
  });
}

export function joinGameCafe() {
  io.on("connection", (socket) => {
    socket.join("game_cafe");
  });
}
// // connection with server
// socket.on("connect", function () {
//   console.log("Connected to Server");
// });

// // message listener from server
// socket.on("newMessage", function (message) {
//   console.log(message);
// });

// // when disconnected from server
// socket.on("disconnect", function () {
//   console.log("Disconnect from server");
// });
