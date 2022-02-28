import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardFront } from "../Cards/CardFront";

export default function PlacedCards() {
  const game = useSelector((state) => state.game);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const temp = game.placed.map((card, index) => {
      const z = (game.placed.length - index) / 4;

      const x = `${100 * index}%`;
      return {
        back: null,
        front: <CardFront suit={card.suit} rank={card.rank} />,
        card,
        transform: `translate(${x}, -${z}px)`,
        dragable: false,
        suit: card.suit,
        rank: card.rank,
      };
    });

    setCards(temp);
  }, [game]);

  return (
    <div className="absolute top-1/3 left-1/3">
      {cards.map((card, index) => (
        <div
          style={{ transform: card.transform }}
          className="absolute"
          key={`placed-` + index}
        >
          {card.front}
        </div>
      ))}
    </div>
  );
}
