import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getOffset from "../../utils/getOffset";
import { CardBack } from "./Cards/CardBack";
import Dragable from "./Effects/Dragable";

export default function PlayerCards() {
  const [cards, setCards] = useState([]);
  const players = useSelector((state) => state.players);
  const game = useSelector((state) => state.game);

  useEffect(() => {
    const temp = [];
    players.forEach((player, _index) => {
      const participantPosition = document.getElementById(`other-${_index}`);
      const { left, top } = getOffset(participantPosition);
      [...Array(player.hand)].forEach((_, index) => {
        const offetX = left / 1.6;
        const offetY = -(top / 2.2);

        const cardUI = {
          back: <CardBack />,
          front: null,
          transform: `translate(${offetX}px, ${offetY}px)`,
          initial: { x: offetX, y: offetY },
          dragable: game.currentPlayer === player.id ? true : false,
        };

        temp.push(cardUI);
      });
    });

    setCards(temp);
  }, [game, players]);

  return (
    <>
      {cards.map((card, index) => (
        <Dragable
          key={`other-` + index}
          initial={card.initial}
          dragable={card.dragable}
        >
          {card.back}
        </Dragable>
      ))}
    </>
  );
}
