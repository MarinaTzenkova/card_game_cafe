import { initialState } from "../../initialState";
import { GET_PLAYERS_SUCCESS } from "../../types";

export default function playersReducer(state = initialState.players, action) {
  switch (action.type) {
    case GET_PLAYERS_SUCCESS:
      return action.players;
    default:
      return state;
  }
}
