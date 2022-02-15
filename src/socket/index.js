import { io } from "socket.io-client";
import { getRooms } from "../store/actions/rooms";
const ENDPOINT = "http://localhost:3001";

const socket = io(ENDPOINT);

export function joinGameRoom(id, dispatch) {
  socket.emit("join", `game-${id}`);
}

export function joinGameCafe(dispatch) {
  socket.emit("join", "game_cafe");
  socket.on("welcome", function (message) {
    console.log(message);
  });
  socket.on("NEW_GAME", function () {
    dispatch(getRooms());
  });
}
