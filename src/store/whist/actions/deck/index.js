import * as deckService from "../../../../api/whist/deck";
import { gameActionTypes } from "../../types";

export function setDeck(id, players) {
  return function (dispatch) {
    return deckService.setDeck(id, players).then((newDeck) => {
      dispatch(setDeckSuccess(newDeck[id]));
    });
  };
}

export function loadDeck(id) {
  return function (dispatch) {
    return deckService.loadDeck(id).then((deck) => {
      dispatch(loadDeckSuccess(deck[id]));
    });
  };
}

export function setDeckSuccess(deck) {
  return { type: gameActionTypes.SET_DECK_SUCCESS, deck };
}

export function loadDeckSuccess(deck) {
  return { type: gameActionTypes.LOAD_DECK_SUCCESS, deck };
}
