import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Board from "../common/Board";
import Participants from "../common/Participants";
import Scoreboard from "../Scoreboard/Scoreboard";
import useCards from "./useCards";
import { useState } from "react";
import Card from "./Card";

export default function RWhist() {
  const cards = useSelector((state) => state.cards);
  const game = useSelector((state) => state.game);

  const dispatch = useDispatch();

  const { deck } = useCards(dispatch, cards, game);
  const [position, setPosition] = useState({});
  const from = (i) => {
    return {
      x: 0,
      y: 0,
    };
  };

  // const [props, set] = useSprings(deck.length, (i) => ({
  //   from: from(i),
  // }));
  // const aspect = 1;
  // const bind = useGesture(
  //   {
  //     onDrag: ({ args: [index], movement: [x, y] }) => {
  //       set.start((i) => {
  //         if (index !== i) return;
  //         const previousPosition = position[index];

  //         const newX = x / aspect;
  //         const newY = -y / aspect;

  //         return {
  //           position: [
  //             previousPosition[0] + newX,
  //             previousPosition[1] + newY,
  //             0,
  //           ],
  //         };
  //       });
  //     },
  //     onDragEnd: ({ args: [index], movement: [x, y] }) => {
  //       setPosition((oldPosition) => {
  //         const newX = x / aspect;
  //         const newY = -y / aspect;
  //         return {
  //           ...oldPosition,
  //           [index]: [
  //             oldPosition[index][0] + newX,
  //             oldPosition[index][1] + newY,
  //             0,
  //           ],
  //         };
  //       });
  //     },
  //   },
  //   {
  //     drag: { bounds: { left: -200, right: 200, top: -250, bottom: 250 } },
  //   }
  // );

  return (
    <>
      <Scoreboard />
      <Participants>
        <Board>
          <Card />
          <div className="flex items-center justify-center h-full relative">
            {/* {deck.map((card, index) => (
              <animated.div
                {...bind()}
                key={index}
                className={`absolute top-0 right-0`}
                style={{ transform: card.transform }}
              >
                {card.back}
              </animated.div>
            ))} */}
          </div>
        </Board>
      </Participants>
    </>
  );
}
