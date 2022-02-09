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
            initial: { x: z, y: z },
            dragable: false,
          };
        });

        setDeck(temp);
      }
    }
  }, [cards, game.amountOfParticipants]);

  return { deck, deal };
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
