import { gameActionTypes } from "../../types";
import initialState from "../initialState";

export default function participantsReducer(
  state = initialState.participants,
  action
) {
  switch (action.type) {
    case gameActionTypes.SET_PARTICIPANTS_SUCCESS:
      return action.participants;
    case gameActionTypes.LOAD_PARTICIPANTS_SUCCESS:
      return action.participants;
    case gameActionTypes.SET_HAND_SUCCESS:
      return action.participants;
    default:
      return state;
  }
}
