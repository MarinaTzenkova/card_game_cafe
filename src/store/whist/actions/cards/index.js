import { cardsActionTypes } from "../../types";
import {
  fetchCards,
  generateDeck,
} from "../../../../api/whist/romanianWhistService";
export function loadCards(amountOfPlayers = 3) {
  return function (dispatch) {
    return fetchCards()
      .then((cards) => {
        dispatch(loadCardsSuccess(cards, amountOfPlayers));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function loadCardsSuccess(cards, amountOfPlayers) {
  return { type: cardsActionTypes.LOAD_CARDS_SUCCESS, cards, amountOfPlayers };
}

export function loadDeck(amountOfPlayers = 3) {
  return function (dispatch) {
    return generateDeck(amountOfPlayers)
      .then((deck) => {
        dispatch(loadDeckSuccess(deck));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function loadDeckSuccess(deck) {
  return { type: cardsActionTypes.LOAD_DECK_SUCCESS, deck };
}
