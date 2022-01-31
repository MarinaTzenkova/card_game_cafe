import { fetchGame, setPlayers } from "../../../../api/whist/whistGameService";
import { gameActionTypes } from "../../types";

export function loadGame() {
  return function (dispatch) {
    return fetchGame().then((game) => {
      dispatch(loadGameSuccess(game));
    });
  };
}

export function updatePlayers(game) {
  return function (dispatch) {
    return setPlayers(game).then((newGame) => {
      dispatch(setGameSuccess(newGame));
    });
  };
}

export function loadGameSuccess(game) {
  return { type: gameActionTypes.LOAD_GAME_SUCCESS, game };
}

export function setGameSuccess(game) {
  return { type: gameActionTypes.UPDATE_GAME_SUCCESS, game };
}
