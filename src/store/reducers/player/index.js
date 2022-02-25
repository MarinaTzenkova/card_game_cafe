import { initialState } from "../../initialState";
import { GET_PLAYER_SUCCESS } from "../../types";

export default function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case GET_PLAYER_SUCCESS:
      return action.player;
    default:
      return state;
  }
}
