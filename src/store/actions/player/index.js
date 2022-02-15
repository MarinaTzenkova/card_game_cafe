import * as playerService from "../../../api/player";
import { SET_PLAYER_SUCCESS } from "../../types";
import { gameCreated } from "../game";

export function setPlayer(name) {
  return function (dispatch) {
    return playerService
      .loginPlayer(name)
      .then((player) => dispatch(setPlayerSuccess(player)));
  };
}

export function subscribeToUpdates(socket) {
  return function (dispatch) {
    dispatch(gameCreated(socket));
  };
}

export function setPlayerSuccess(player) {
  return { type: SET_PLAYER_SUCCESS, player };
}
