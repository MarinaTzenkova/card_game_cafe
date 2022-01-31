import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Board from "../common/Board";
import Participants from "../common/Participants";
import useDeck from "./useDeck";

export default function RWhist() {
  const cards = useSelector((state) => state.cards);
  const game = useSelector((state) => state.game);

  const dispatch = useDispatch();

  useDeck(dispatch, cards, game);
  return (
    <Participants>
      <Board>
        <div className="flex items-center justify-center h-full">
          <div id="container"></div>
        </div>
      </Board>
    </Participants>
  );
}
