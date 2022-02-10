import { useEffect, useState } from "react";

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

function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

export default function useCards(dispatch, cards, game) {
  const [deck, setDeck] = useState([]);

  function deal() {
    // get scoreboard of current player
    const scores = game.scores[0];
    const currentRound = scores[game.currentRound];
    [...Array(currentRound)].forEach(() => {
      [...Array(game.amountOfParticipants)].forEach((participant, _index) => {
        const participantPosition = document.getElementById(
          `participant-${_index + 1}`
        );

        const { left, top } = getOffset(participantPosition);

        const reverseIndex = deck.length - 1 - _index;
        const toMove = deck[reverseIndex];

        const offetX = toMove.initial.x + left / 1.6;
        const offetY = toMove.initial.y - top / 2.2;

        const toUpdate = {
          ...toMove,
          transform: `translate(${offetX}px, ${offetY}px)`,
          initial: {
            x: offetX,
            y: offetY,
          },
          dragable: true,
        };

        setDeck((oldDeck) =>
          oldDeck.map((card, i) => {
            const toInclude = i === reverseIndex ? toUpdate : card;
            return toInclude;
          })
        );
      });
    });
  }

  useEffect(() => {
    if (game.hasStarted) {
      if (cards.length !== 0) {
        const temp = cards.map((card, index) => {
          const z = (cards.length - index) / 4;
          return {
            back: cardBack,
            front: cardFront(card.suitName, card.rankValue),
            card,
            transform: `translate(-${z}px, -${z}px)`,
            initial: { x: z, y: z },
            dragable: false,
          };
        });

        setDeck(temp);
      }
    }
  }, [cards, game.amountOfParticipants, game.hasStarted]);

  return { cards: deck, deal };
}
