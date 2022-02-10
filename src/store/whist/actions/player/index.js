import * as playerService from "../../../../api/whist/player";
import { gameActionTypes } from "../../types";

export function setPlayer(name, id) {
  return function (dispatch) {
    return playerService.setPlayer(name, id).then((newPlayer) => {
      dispatch(setPlayerSuccess(newPlayer));
    });
  };
}

export function loadPlayer() {
  return function (dispatch) {
    return playerService.loadPlayer().then((player) => {
      dispatch(loadPlayerSuccess(player));
    });
  };
}

export function setPlayerSuccess(player) {
  return { type: gameActionTypes.SET_PLAYER_SUCCESS, player };
}

export function loadPlayerSuccess(player) {
  return { type: gameActionTypes.LOAD_PLAYER_SUCCESS, player };
}
