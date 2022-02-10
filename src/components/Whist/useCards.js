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

export default function useCards(dispatch, deck, game, scores, participants) {
  const [cards, setCards] = useState([]);

  function deal() {
    // get scoreboard of current player
    const currentRound = scores[0][game.currentRound];
    [...Array(currentRound)].forEach(() => {
      participants.forEach((participant) => {
        const participantPosition = document.getElementById(
          `participant-${participant.id}`
        );

        const { left, top } = getOffset(participantPosition);

        const reverseIndex = cards.length - 1 - participant.id;
        const toMove = cards[reverseIndex];

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

        setCards((oldDeck) =>
          oldDeck.map((card, i) => {
            const toInclude = i === reverseIndex ? toUpdate : card;
            if (i === reverseIndex) {
              console.log(toInclude);
            }
            return toInclude;
          })
        );
      });
    });
  }

  useEffect(() => {
    if (game.hasStarted && deck.length !== 0) {
      const temp = deck.map((card, index) => {
        const z = (deck.length - index) / 4;
        return {
          back: cardBack,
          front: cardFront(card.suitName, card.rankValue),
          card,
          transform: `translate(-${z}px, -${z}px)`,
          initial: { x: z, y: z },
          dragable: false,
        };
      });
      setCards(temp);
    }
  }, [deck, game.amountOfParticipants, game.hasStarted]);

  return { cards, deal };
}
