import * as gameService from "../../../api/game";
import { joinGameRoom } from "../../../socket";
import { GET_GAME_SUCCESS } from "../../types";

export function getGame(id) {
  return function (dispatch) {
    return gameService.getGame(id).then((game) => {
      joinGameRoom(id);
      dispatch(getGameSuccess(game));
    });
  };
}

export function getGameSuccess(game) {
  return { type: GET_GAME_SUCCESS, game };
}
