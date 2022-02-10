import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Board from "../common/Board";
import Participants from "../common/Participants";
import Scoreboard from "../Scoreboard/Scoreboard";
import useCards from "./useCards";
import Dragable from "./Dragable.jsx";
import { useEffect } from "react";
import { loadGame } from "../../store/whist/actions/game";
import { setDeck } from "../../store/whist/actions/deck";

export default function RWhist() {
  const deck = useSelector((state) => state.deck);
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  // const { cards, deal } = useCards(dispatch, deck, game);

  useEffect(() => {
    if (!game.hasStarted) {
      dispatch(loadGame()).finally(() => {
        console.log(game);
        console.log("test");
        dispatch(setDeck(game.id, game.amountOfParticipants));
      });
    }
  }, [game]);

  return (
    <>
      <Scoreboard />
      <Participants>
        <Board>
          {/* <div
            onClick={() => deal()}
            className="bg-white w-min rounded-md px-2 py-1"
          >
            Deal
          </div>
          <div className="flex items-center justify-center h-full relative">
            <div className="absolute top-0 right-0">
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
            </div>
          </div> */}
        </Board>
      </Participants>
    </>
  );
}
