import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getOffset from "../../utils/getOffset";
import { CardBack } from "./Cards/CardBack";
import { CardFront } from "./Cards/CardFront";
import Dragable from "./Effects/Dragable";

export default function OwnHand({ setPlaced }) {
  const game = useSelector((state) => state.game);
  const player = useSelector((state) => state.player);

  const [cards, setCards] = useState([]);

  function place(placedCard, index) {
    setCards((oldcards) => {
      const temp = [...oldcards];
      temp[index] = { ...placedCard, dragable: false };
      return temp;
    });
    setPlaced(placedCard);
  }

  useEffect(() => {
    const participantPosition = document.getElementById(`current-${player.id}`);

    const { left, top } = getOffset(participantPosition);
    const temp = [];
    player.hand.forEach((card) => {
      const offetX = left / 1.6;
      const offetY = -(top / 2.2);

      const cardUI = {
        back: <CardBack />,
        front: <CardFront suit={card.suit} rank={card.rank} />,
        card,
        transform: `translate(${offetX}px, ${offetY}px)`,
        initial: { x: offetX, y: offetY },
        dragable: game.currentPlayer === player.id ? true : false,
        suit: card.suit,
        rank: card.rank,
      };

      temp.push(cardUI);
    });

    setCards(temp);
  }, [game, player]);

  return (
    <>
      {cards.map((card, index) => (
        <Dragable
          key={`own-` + index}
          initial={card.initial}
          dragable={card.dragable}
          setPlaced={() => place(card, index)}
        >
          {card.front}
        </Dragable>
      ))}
    </>
  );
}
