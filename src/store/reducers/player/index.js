import { initialState } from "../../initialState";
import { SET_PLAYER_SUCCESS } from "../../types";

export default function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case SET_PLAYER_SUCCESS:
      return action.player;
    default:
      return state;
  }
}
