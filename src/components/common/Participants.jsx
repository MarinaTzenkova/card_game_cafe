import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const currentPlayerPosUpToSixPlayers = "bottom-0";
const currentPlayerPosUpFromSixPlayers = "bottom-0 left-1/2";
const positions = {
  3: ["left-7 bottom-1/2", "right-7 bottom-1/2"],
  4: ["left-7 bottom-1/2", "top-0", "right-7 bottom-1/2"],
  5: ["left-7 bottom-1/3", "left-7 bottom-1/4", "top-0", "right-7 top-1/2"],
  6: [
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0",
    "right-7 top-1/4",
    "right-7 top-1/3",
  ],
  7: [
    "bottom-0 right-1/2",
    "left-7 bottom-1/3",
    "left-7 bottom-1/4",
    "top-0",
    "right-7 top-1/4",
    "right-7 top-1/3",
  ],
  8: [
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
  const players = useSelector((state) => state.players);
  const player = useSelector((state) => state.player);
  const game = useSelector((state) => state.game);
  useEffect(() => {
    setParticipants(() => {
      const temp = [];
      const predefinedPositions = positions[players.length + 1];
      temp.push({
        position:
          game.amountOfParticipants <= 6
            ? currentPlayerPosUpToSixPlayers
            : currentPlayerPosUpFromSixPlayers,
        id: `current-${player.id}`,
        name: player.name,
      });
      predefinedPositions.forEach((position, _index) => {
        temp.push({
          position,
          id: `other-${_index}`,
          name: players[_index].name,
        });
      });
      return temp;
    });
  }, [dispatch, players]);

  return (
    <div className="w-3/4 h-5/6 mx-auto flex items-center justify-center relative my-10 select-none">
      {participantPositions.map((participant) => (
        <div
          className={` ${participant.position} ${staticClass}`}
          key={participant.id}
          id={participant.id}
        >
          <img src="/images/user_icon.png" alt="user" />
          {participant.name}
        </div>
      ))}
      {participantPositions.length !== 0 ? (
        <div className="bg-blue-300 w-full h-full">{children}</div>
      ) : (
        ""
      )}
    </div>
  );
}
