import { useEffect, useState } from "react";
import { loadCards } from "../../store/whist/actions/cards";
import { loadGame } from "../../store/whist/actions/game";

const cardBack = (
  <div className="bg-blue-300 rounded-md border-2 border-gray-600 w-24 h-32 text-center cursor-pointer">
    Card back
  </div>
);

const cardFront = (suit, rank) => (
  <div className="bg-white rounded-md border-2 border-gray-600 w-24 h-32 text-center cursor-pointer">
    {suit} - {rank}
  </div>
);

export default function useCards(dispatch, cards, game) {
  const [deck, setDeck] = useState([]);
  useEffect(() => {
    dispatch(loadGame());

    if (game.hasStarted) {
      if (
        cards.spades.length === 0 ||
        game.amountOfParticipants !== cards.amountOfParticipants
      ) {
        dispatch(loadCards(game.amountOfParticipants));
      }
      if (cards.spades.length !== 0) {
        const merged = [
          ...cards.spades,
          ...cards.hearts,
          ...cards.diamonds,
          ...cards.clubs,
        ];

        const shuffled = shuffle(merged);

        const temp = shuffled.map((card, index) => {
          const z = (54 - index) / 4;
          return {
            back: cardBack,
            front: cardFront(card.suitName, card.rankValue),
            card,
            transform: `translate(-${z}px, -${z}px)`,
          };
        });

        setDeck(temp);
      }
    }
  }, [cards, game.amountOfParticipants]);

  return { deck };
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
