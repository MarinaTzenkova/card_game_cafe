import * as gameService from "../../../api/game";
import { GET_ROOMS_SUCCESS } from "../../types";

export function getRooms() {
  return function (dispatch) {
    return gameService.getGames().then((games) => {
      dispatch(getRoomsSuccess(games));
    });
  };
}

export function getRoomsSuccess(games) {
  return { type: GET_ROOMS_SUCCESS, games };
}
