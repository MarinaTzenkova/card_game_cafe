import Deck from "deck-of-cards";
import { useEffect, useState } from "react";
import { loadCards } from "../../store/actions/cards";
import { loadGame } from "../../store/actions/game";

export default function useDeck(dispatch, cards, game) {
  const [deck, setDeck] = useState(null);
  function onTouch(card) {
    card.disableDragging();
    card.enableDragging();
    card.enableFlipping();
    console.log(card);
  }
  function deal() {
    console.log("deal");
  }

  useEffect(() => {
    setDeck(Deck());

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
        deck.shuffle();

        const ranks = cards.spades.map((card) => card.rankNumber);
        console.log(deck);
        deck.cards.forEach((card, index) => {
          if (!ranks.includes(card.rank) && card.$root) {
            card.unmount();
          } else {
            // card.$el.style.transform = `translate(0px, ${card.y}px)`;
            card.$el.addEventListener("mousedown", () => onTouch(card));
          }
        });

        // deal(deck);
        deck.mount(container);

        return () => {
          deck.unmount();
        };
      }
    }
  }, [cards, game.amountOfParticipants]);

  return { deal };
}
