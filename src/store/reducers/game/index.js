import { initialState } from "../../initialState";
import { CREATE_GAME_SUCCESS, GET_GAME_SUCCESS } from "../../types";

export default function gameReducer(state = initialState.game, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
      return action.game;
    // socket case
    case GET_GAME_SUCCESS:
      return action.game;
    default:
      return state;
  }
}
