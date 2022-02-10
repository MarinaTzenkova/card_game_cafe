import { combineReducers } from "redux";
import game from "./game";
import deck from "./deck";
import participants from "./participants";
import scores from "./scores";

const rootReducer = combineReducers({ game, deck, participants, scores });

export default rootReducer;
