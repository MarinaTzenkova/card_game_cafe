import { gameActionTypes } from "../../types";
import * as gameService from "../../../../api/whist/game";

export function loadGame() {
  return function (dispatch) {
    return gameService.fetchGame().then((game) => {
      dispatch(loadGameSuccess(game));
    });
  };
}

export function updateGame(game) {
  return function (dispatch) {
    return gameService.setGame(game).then((newGame) => {
      dispatch(updateGameSuccess(newGame));
    });
  };
}

export function loadGameSuccess(game) {
  return { type: gameActionTypes.LOAD_GAME_SUCCESS, game };
}

export function updateGameSuccess(game) {
  return { type: gameActionTypes.UPDATE_GAME_SUCCESS, game };
}
