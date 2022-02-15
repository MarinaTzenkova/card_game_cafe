import * as gameService from "../../../api/game";
import { CREATE_GAME_SUCCESS, GET_GAME_SUCCESS } from "../../types";

export function createGame(game) {
  return function (dispatch) {
    return gameService
      .startGame(game)
      .then((newGame) => dispatch(createGameSuccess(newGame)));
  };
}

export function getGame(id) {
  return function (dispatch) {
    return gameService
      .getGame(id)
      .then((game) => dispatch(getGameSuccess(game)));
  };
}

export function createGameSuccess(game) {
  return { type: CREATE_GAME_SUCCESS, game };
}

export function getGameSuccess(game) {
  return { type: GET_GAME_SUCCESS, game };
}
