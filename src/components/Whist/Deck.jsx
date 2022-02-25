import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardBack } from "./Cards/CardBack";
import { CardFront } from "./Cards/CardFront";
import Dragable from "./Effects/Dragable";

export default function Deck() {
  const game = useSelector((state) => state.game);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const temp = game.deck.map((card, index) => {
      const z = (game.deck.length - index) / 4;
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
  }, [game]);

  return (
    <>
      {cards.map((card, index) => (
        // Enable dragging after cards are dealt
        <Dragable key={index} initial={card.initial} dragable={card.dragable}>
          {card.back}
        </Dragable>
      ))}
    </>
  );
}
