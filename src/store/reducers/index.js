import { combineReducers } from "redux";
import game from "./game";
import rooms from "./rooms";

const rootReducer = combineReducers({
  game,
  rooms,
});

export default rootReducer;
