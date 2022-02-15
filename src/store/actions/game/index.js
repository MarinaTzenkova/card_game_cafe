import * as gameService from "../../../api/game";
import { joinGameRoom } from "../../../socket";
import { CREATE_GAME_SUCCESS, GET_GAME_SUCCESS } from "../../types";

export function createGame(game) {
  return gameService.startGame(game);
}

export function getGame(id) {
  return function (dispatch) {
    return gameService.getGame(id).then((game) => {
      joinGameRoom(id);
      dispatch(getGameSuccess(game));
    });
  };
}

export function createGameSuccess(game) {
  return { type: CREATE_GAME_SUCCESS, game };
}

export function getGameSuccess(game) {
  return { type: GET_GAME_SUCCESS, game };
}
