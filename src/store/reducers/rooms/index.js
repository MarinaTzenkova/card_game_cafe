import { initialState } from "../../initialState";
import { GET_ROOMS_SUCCESS } from "../../types";

export default function roomReducer(state = initialState.rooms, action) {
  switch (action.type) {
    case GET_ROOMS_SUCCESS:
      return action.games;
    default:
      return state;
  }
}
