import { useSelector } from "react-redux";
import Board from "../common/Board";
import Participants from "../common/Participants";
import Scoreboard from "../Scoreboard/Scoreboard";
import useCards from "./useCards";
import Dragable from "./Dragable.jsx";
import GameData from "./GameData";
import { useDispatch } from "react-redux";

export default function RWhist() {
  const deck = useSelector((state) => state.deck);
  const game = useSelector((state) => state.game);
  const scores = useSelector((state) => state.scores);
  const participants = useSelector((state) => state.participants);
  const player = useSelector((state) => state.player);

  const dispatch = useDispatch();

  const { cards, setPlaced } = useCards(
    deck,
    game,
    scores,
    participants,
    player,
    dispatch
  );

  return (
    <GameData>
      <Scoreboard />
      <Participants>
        <Board>
          <div className="flex items-center justify-center h-full relative">
            <div className="absolute top-0 right-0">
              {cards.map((card, index) => (
                // Enable dragging after cards are dealt
                <Dragable
                  key={index}
                  initial={card.initial}
                  dragable={card.dragable}
                  setPlaced={() => setPlaced(card, index)}
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
