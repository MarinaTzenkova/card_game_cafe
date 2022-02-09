import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Board from "../common/Board";
import Participants from "../common/Participants";
import Scoreboard from "../Scoreboard/Scoreboard";
import useCards from "./useCards";
import Dragable from "./Dragable.jsx";
import { useEffect } from "react";

export default function RWhist() {
  const cards = useSelector((state) => state.cards);
  const game = useSelector((state) => state.game);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(updatePlayers({ ...game, currentRound: 1 }));
  }, []);

  const { deck, deal } = useCards(dispatch, cards, game);

  return (
    <>
      <Scoreboard />
      <Participants>
        <Board>
          <div
            onClick={() => deal()}
            className="bg-white w-min rounded-md px-2 py-1"
          >
            Deal
          </div>
          <div className="flex items-center justify-center h-full relative">
            <div className="absolute top-0 right-0">
              {deck.map((card, index) => (
                // Enable dragging after cards are dealt
                <Dragable key={index} initial={card.initial}>
                  {card.back}
                </Dragable>
              ))}
            </div>
          </div>
        </Board>
      </Participants>
    </>
  );
}
