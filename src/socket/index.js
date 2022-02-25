import { io } from "socket.io-client";
import { getGame } from "../store/actions/game";
import { getRooms } from "../store/actions/rooms";
import setCookie from "../utils/setCookie";

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

  socket.on("UPDATE_GAMES", function () {
    dispatch(getRooms());
  });

  socket.on("GAME_FULL", () => {
    console.log("game is full");
  });

  socket.on("GAME_STARTING", (message) => {
    console.log(message);
    dispatch(getGame(message));
  });

  socket.on("PLAYER_ID", (message) => {
    setCookie("playerId", message, toString(), 1);
  });
}

export function makeGame(dispatch, game) {
  socket.emit("ADD_NEW_GAME", game);
}

export function joinGame(dispatch, gameId, playerName) {
  socket.emit("PLAYER_JOIN", { gameId, name: playerName });
  socket.emit("join", `game-${gameId}`);
}

export function placeCard(gameId, playerId, card) {
  socket.emit("PLAY_CARD", { gameId, playerId, card });
}
