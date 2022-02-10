import { gameActionTypes } from "../../types";
import initialState from "../initialState";

export default function participantsReducers(
  state = initialState.participants,
  action
) {
  switch (action.type) {
    case gameActionTypes.SET_PARTICIPANTS_SUCCESS:
      return { ...action.participants };
    default:
      return state;
  }
}
