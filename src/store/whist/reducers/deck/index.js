import { gameActionTypes } from "../../types";
import initialState from "../initialState";

export default function deckReducer(state = initialState.deck, action) {
  switch (action.type) {
    case gameActionTypes.SET_DECK_SUCCESS:
      return action.deck;
    case gameActionTypes.LOAD_DECK_SUCCESS:
      return { ...state, ...action.deck };
    default:
      return state;
  }
}
