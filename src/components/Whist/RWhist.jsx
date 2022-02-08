import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Board from "../common/Board";
import Participants from "../common/Participants";
import Scoreboard from "../Scoreboard/Scoreboard";
import useDeck from "./useDeck";

export default function RWhist() {
  const cards = useSelector((state) => state.cards);
  const game = useSelector((state) => state.game);

  const dispatch = useDispatch();

  const { deal } = useDeck(dispatch, cards, game);

  function handleClick() {}

  return (
    <>
      <Scoreboard />
      <Participants>
        <Board>
          <div className="flex flex-row">
            <div
              className="bg-white text-black px-3 py-1 rounded cursor-pointer"
              onClick={() => deal()}
            >
              Deal
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <div id="container"></div>
          </div>
        </Board>
      </Participants>
    </>
  );
}
