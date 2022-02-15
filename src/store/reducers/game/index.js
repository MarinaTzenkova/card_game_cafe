import { initialState } from "../../initialState";
import { CREATE_GAME_SUCCESS, GAME_CREATED_UPDATE } from "../../types";

export default function gameReducer(state = initialState.game, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
      return action.game;
    // socket case
    case GAME_CREATED_UPDATE:
      return action.game;
    default:
      return state;
  }
}
