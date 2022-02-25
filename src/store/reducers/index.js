import { combineReducers } from "redux";
import game from "./game";
import rooms from "./rooms";
import player from "./player";
import players from "./players";

const rootReducer = combineReducers({
  game,
  rooms,
  player,
  players,
});

export default rootReducer;
