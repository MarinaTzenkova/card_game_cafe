import { combineReducers } from "redux";
import game from "./game";
import deck from "./deck";
import participants from "./participants";
import scores from "./scores";
import player from "./player";

const rootReducer = combineReducers({
  game,
  deck,
  participants,
  scores,
  player,
});

export default rootReducer;
