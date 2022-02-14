import socketIOClient from "socket.io-client";
import { messageTypes } from "./messageTypes";
const ENDPOINT = "http://localhost:3001";

const socket = socketIOClient(ENDPOINT);

// connection with server
socket.on("connect", function () {
  console.log("Connected to Server");
});

// message listener from server
socket.on("newMessage", function (message) {
  console.log(message);
});

// when disconnected from server
socket.on("disconnect", function () {
  console.log("Disconnect from server");
});

socket.on(messageTypes.GAME_STARTED, (msg) => {
  console.log(msg);
});
