import * as playerService from "../../../api/players";
import { GET_PLAYERS_SUCCESS, GET_PLAYER_SUCCESS } from "../../types";

export function getPlayer(id, gameId) {
  return function (dispatch) {
    return playerService.getPlayer(id, gameId).then((player) => {
      dispatch(getPlayerSuccess(player));
    });
  };
}

export function getPlayerSuccess(player) {
  return { type: GET_PLAYER_SUCCESS, player };
}

export function getPlayers(id, gameId) {
  return function (dispatch) {
    return playerService.getPlayers(id, gameId).then((players) => {
      dispatch(getPlayersSuccess(players));
    });
  };
}

export function getPlayersSuccess(players) {
  return { type: GET_PLAYERS_SUCCESS, players };
}
