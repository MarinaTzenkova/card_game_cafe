import { useEffect, useState } from "react";
import { updateHand } from "../../store/actions/participants";
import { CardBack } from "./Cards/CardBack";
import { CardFront } from "./Cards/CardFront";
import getOffset from "./utils/getOffset";

export default function useCards(
  deck,
  game,
  scores,
  participants,
  player,
  dispatch
) {
  const [cards, setCards] = useState([]);
  const [dealt, setDealt] = useState(false);

  function generateCard(participant, card) {
    const participantPosition = document.getElementById(
      `participant-${participant.id}`
    );

    const { left, top } = getOffset(participantPosition);

    const offetX = card.initial.x + left / 1.6;
    const offetY = card.initial.y - top / 2.2;

    const toUpdate = {
      ...card,
      transform: `translate(${offetX}px, ${offetY}px)`,
      initial: {
        x: offetX,
        y: offetY,
      },
      dragable: game.currentPlayer === participant.id ? true : false,
      card: {
        ...card.card,
        dealt: true,
      },
    };

    return toUpdate;
  }
  function deal() {
    // get scoreboard of current player
    const hasHands = participants.every(
      (participant) => participant.hand.length !== 0
    );

    if (!hasHands) {
      const currentRound = scores[player.id][game.currentRound];
      const participantsCopy = [];
      participants.forEach((participant) => {
        const participantCopy = { ...participant, hand: [] };
        const hand = [];
        [...Array(currentRound)].forEach(() => {
          const reverseIndex = cards.length - 1 - participant.id;
          const toMove = cards[reverseIndex];
          const card = generateCard(participant, toMove);

          hand.push({
            index: reverseIndex,
            id: { suit: card.suit, rank: card.rank },
            placed: false,
          });

          setCards((oldDeck) =>
            oldDeck.map((oldCard, i) => {
              const toInclude = i === reverseIndex ? card : oldCard;
              return toInclude;
            })
          );
        });
        participantCopy.hand = hand;
        participantsCopy.push(participantCopy);
        dispatch(updateHand(game.id, participant.id, hand));
      });
      // dispatch(updateHand(game.id, participantsCopy));
    } else {
      participants.forEach((participant) => {
        participant.hand.forEach(({ id, index }) => {
          const cardElement = cards[index];

          if (cardElement !== null) {
            const card = generateCard(participant, cardElement);
            setCards((oldDeck) =>
              oldDeck.map((oldCard, i) => {
                const toInclude = i === index ? card : oldCard;
                return toInclude;
              })
            );
          }
        });
      });
    }
  }
  function setPlaced(card, index) {
    console.log(card);
    card.dragable = false;

    setCards((oldCards) => {
      return oldCards.map((oldCard, i) => (i === index ? card : oldCard));
    });

    // send to backend
    // in backend we check if all of the cards are placed, we flip them
    // and we set score
  }

  useEffect(() => {
    if (game.hasStarted && deck.length !== 0) {
      const temp = deck.map((card, index) => {
        // cleanup this function a bit
        const z = (deck.length - index) / 4;
        return {
          back: <CardBack />,
          front: <CardFront suit={card.suitName} rank={card.rank} />,
          card,
          transform: `translate(-${z}px, -${z}px)`,
          initial: { x: z, y: z },
          dragable: false,
          suit: card.suit,
          rank: card.rank,
        };
      });
      setCards(temp);

      if (cards.length !== 0 && !dealt) {
        deal();
        setDealt(true);
      }
    }
  }, [deck, game.amountOfParticipants, game.hasStarted]);

  return { cards, setPlaced };
}
