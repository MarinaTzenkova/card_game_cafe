import { cardsActionTypes } from "../../types";
import initialState from "../initialState";

export default function handReducer(state = initialState.deck, action) {
  switch (action.type) {
    case cardsActionTypes.LOAD_CARDS_SUCCESS:
      return {
        ...sortSlice(action.cards, action.amountOfPlayers),
        amountOfParticipants: action.amountOfPlayers,
      };
    case cardsActionTypes.LOAD_DECK_SUCCESS:
      return action.deck;
    default:
      return state;
  }
}

function sortSlice(arr, amountOfPlayers) {
  const spades = temp(arr, 0, amountOfPlayers);
  const hearts = temp(arr, 1, amountOfPlayers);
  const diamonds = temp(arr, 2, amountOfPlayers);
  const clubs = temp(arr, 3, amountOfPlayers);
  return { spades, hearts, diamonds, clubs };
}

function temp(arr, suit, nm) {
  // sort cards from 2 to ace
  const amountToSlice = (52 - nm * 8) / 4;
  return arr.filter((card) => card.suit === suit).slice(amountToSlice);
}
