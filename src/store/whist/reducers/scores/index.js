import { gameActionTypes } from "../../types";
import initialState from "../initialState";

export default function scoresReducer(state = initialState.scores, action) {
  switch (action.type) {
    case gameActionTypes.SET_SCORES_SUCCESS:
      return action.scores;
    case gameActionTypes.LOAD_SCORES_SUCCESS:
      return action.scores;
    default:
      return state;
  }
}
