import Deck from "deck-of-cards";
import { useEffect } from "react";
import { loadCards } from "../../store/whist/actions/cards";
import { loadGame } from "../../store/whist/actions/game";

export default function useDeck(dispatch, cards, game) {
  useEffect(() => {
    var deck = Deck();

    dispatch(loadGame());

    if (game.hasStarted) {
      if (
        cards.spades.length === 0 ||
        game.amountOfParticipants !== cards.amountOfParticipants
      ) {
        dispatch(loadCards(game.amountOfParticipants));
      }
      var container = document.getElementById("container");
      if (container && cards.spades.length !== 0) {
        deck.mount(container);
        deck.shuffle();

        const ranks = cards.spades.map((card) => card.rankNumber);

        deck.cards.forEach((card) => {
          if (!ranks.includes(card.rank) && card.$root) {
            card.unmount();
          } else {
            card.setSide("front");
            card.enableDragging();
          }
        });

        return () => {
          deck.unmount();
        };
      }
    }
  }, [cards, game.amountOfParticipants]);
}
