import { cardsActionTypes } from "../../types";
import { fetchCards } from "../../../../api/whist/romanianWhistService";
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
