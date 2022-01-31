import { gameActionTypes } from "../../types";
import initialState from "../initialState";

export default function gameReducers(state = initialState.game, action) {
  switch (action.type) {
    case gameActionTypes.LOAD_GAME_SUCCESS:
      return { ...action.game };
    case gameActionTypes.UPDATE_GAME_SUCCESS:
      return { ...action.game };
    default:
      return state;
  }
}
