import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "../common/Board";
import Participants from "../common/Participants";
import { CardBack } from "./Cards/CardBack";
import { CardFront } from "./Cards/CardFront";
import GameData from "./GameData";
import Dragable from "./Dragable";
import getOffset from "../../utils/getOffset";
import { placeCard } from "../../socket";
import { useParams } from "react-router";
import getCookie from "../../utils/getCookie";

export default function RWhist() {
  const game = useSelector((state) => state.game);
  const player = useSelector((state) => state.player);
  const players = useSelector((state) => state.players);
  const params = useParams();
  const gameId = params["id"];
  const playerId = getCookie("playerId");

  const [cards, setCards] = useState([]);
  const [ownHand, setOwnHand] = useState([]);
  const [otherHands, setOtherHands] = useState([]);

  function setDeck() {
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
  }

  function playerHand() {
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

    setOwnHand(temp);
  }

  function hands() {
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

    setOtherHands(temp);
  }

  function setPlaced(card) {
    placeCard(gameId, playerId, card.card);
  }

  function setHands() {
    playerHand();
    hands();
  }

  useEffect(() => {
    setDeck();
    setHands();
  }, [game]);

  return (
    <GameData>
      {/* //   <Scoreboard />
       */}
      <Participants>
        <Board>
          <div className="flex items-center justify-center h-full relative">
            <div className="absolute top-0 right-0">
              {/* setPlaced={() => setPlaced(card, index)} */}
              {cards.map((card, index) => (
                // Enable dragging after cards are dealt
                <Dragable
                  key={index}
                  initial={card.initial}
                  dragable={card.dragable}
                >
                  {card.back}
                </Dragable>
              ))}
              {ownHand.map((card, index) => (
                <Dragable
                  key={`own-` + index}
                  initial={card.initial}
                  dragable={card.dragable}
                  setPlaced={() => setPlaced(card)}
                >
                  {card.front}
                </Dragable>
              ))}
              {otherHands.map((card, index) => (
                <Dragable
                  key={`other-` + index}
                  initial={card.initial}
                  dragable={card.dragable}
                >
                  {card.back}
                </Dragable>
              ))}
            </div>
          </div>
        </Board>
      </Participants>
    </GameData>
  );
}
