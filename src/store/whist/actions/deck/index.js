import * as deckService from "../../../../api/whist/deck";
import { gameActionTypes } from "../../types";

export function setDeck(id, players) {
  return function (dispatch) {
    return deckService.setDeck(id, players).then((newDeck) => {
      dispatch(setDeckSuccess(newDeck));
    });
  };
}

export function setDeckSuccess(deck) {
  return { type: gameActionTypes.SET_DECK_SUCCESS, deck };
}
