import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadGame } from "../../store/whist/actions/game";
import Spinner from "./Spinner";
const positions = {
  3: ["bottom-0", "left-7 bottom-1/2", "right-7 bottom-1/2"],
  4: ["bottom-0", "left-7 bottom-1/2", "top-0", "right-7 bottom-1/2"],
  5: [
    "bottom-0",
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0",
    "right-7 top-1/2",
  ],
  6: [
    "bottom-0",
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0",
    "right-7 top-1/4",
    "right-7 top-1/3",
  ],
  7: [
    "bottom-0 left-1/2",
    "bottom-0 right-1/2",
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0",
    "right-7 top-1/4",
    "right-7 top-1/3",
  ],
  8: [
    "bottom-0 left-1/2",
    "bottom-0 right-1/2",
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0 left-1/2",
    "top-0 right-1/2",
    "right-7 top-1/4",
    "right-7 top-1/3",
  ],
};

const staticClass = "absolute w-10 h-10 flex flex-row";

export default function Participants({ children }) {
  const dispatch = useDispatch();
  const [participantPositions, setParticipants] = useState([]);
  const game = useSelector((state) => state.game);
  useEffect(() => {
    if (!game.participants.length === 0) {
      dispatch(loadGame());
    }
    if (game.hasStarted) {
      setParticipants(() => {
        const temp = [];
        const predefinedPositions = positions[game.amountOfParticipants];

        predefinedPositions.forEach((position, _index) => {
          temp.push({
            position,
            id: _index + 1,
            name: game.participants[_index],
          });
        });

        return temp;
      });
    }
  }, [game, dispatch]);

  if (participantPositions.length === 0) return <Spinner />;

  return (
    <div className="w-3/4 h-5/6 mx-auto flex items-center justify-center relative my-10">
      {participantPositions.map((participant) => (
        <div
          className={` ${participant.position} ${staticClass}`}
          key={participant.id}
        >
          <img src="/images/user_icon.png" alt="user" />
          {participant.name}
        </div>
      ))}
      <div className="bg-blue-300 w-full h-full">{children}</div>
    </div>
  );
}
