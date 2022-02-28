import { io } from "socket.io-client";
import { getGame } from "../store/actions/game";
import { getPlayer, getPlayers } from "../store/actions/player";
import { getRooms } from "../store/actions/rooms";
import getCookie from "../utils/getCookie";
import setCookie from "../utils/setCookie";

const ENDPOINT = "http://localhost:3001";

const socket = io(ENDPOINT);

export function joinGameRoom(id, dispatch) {
  socket.emit("join", `game-${id}`);
}

function dispatchAll(dispatch, gameId) {
  const playerId = parseInt(getCookie("playerId"));

  dispatch(getGame(gameId));
  dispatch(getPlayers(playerId, gameId));
  dispatch(getPlayer(playerId, gameId));
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

  socket.on("PLAYER_JOINED", (message) => {
    console.log("Player just joined");
    dispatchAll(dispatch, message);
  });

  socket.on("GAME_FULL", () => {
    console.log("game is full");
  });

  socket.on("GAME_STARTING", (message) => {
    console.log(message);
    dispatchAll(message);
  });

  socket.on("PLAYER_ID", (message) => {
    setCookie("playerId", message, toString(), 1);
  });

  socket.on("CARD_PLAYED", (message) => {
    dispatchAll(message);
  });

  socket.on("ROUND_FINISHED", (message) => {
    dispatchAll(message);
  });
}

export function makeGame(dispatch, game) {
  socket.emit("ADD_NEW_GAME", game);
}

export function joinGame(dispatch, gameId, playerName) {
  socket.emit("join", `game-${gameId}`);
  socket.emit("PLAYER_JOIN", { gameId, name: playerName });
}

export function placeCard(gameId, playerId, card) {
  socket.emit("PLAY_CARD", { gameId, playerId, card });
}
