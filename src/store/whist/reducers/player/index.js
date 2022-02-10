import { gameActionTypes } from "../../types";
import initialState from "../initialState";

export default function participantsReducer(
  state = initialState.player,
  action
) {
  switch (action.type) {
    case gameActionTypes.SET_PLAYER_SUCCESS:
      return action.player;
    case gameActionTypes.LOAD_PLAYER_SUCCESS:
      return action.player;
    default:
      return state;
  }
}
