import * as gameService from "../../../api/game";
import { CREATE_GAME_SUCCESS, GAME_CREATED_UPDATE } from "../../types";

export function createGame(game) {
  return function (dispatch) {
    return gameService
      .startGame(game)
      .then((newGame) => dispatch(createGameSuccess(newGame)));
  };
}

export function gameCreated(socket) {
  return function (dispatch) {
    socket.on("GAME_CREATED", (game) => {
      console.log(game);
      dispatch(createGameSuccess(game));
    });
  };
}

export function createGameSuccess(game) {
  return { type: CREATE_GAME_SUCCESS, game };
}

export function gameCreatedSuccess(game) {
  return { type: GAME_CREATED_UPDATE, game };
}
