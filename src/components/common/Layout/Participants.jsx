import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  currentPlayerPosUpFromSixPlayers,
  currentPlayerPosUpToSixPlayers,
  positions,
} from "./constants/columns";

const staticClass = "absolute w-10 h-10 flex flex-row";

export default function Participants({ children }) {
  const [participantPositions, setParticipants] = useState([]);
  const players = useSelector((state) => state.players);
  const player = useSelector((state) => state.player);
  const game = useSelector((state) => state.game);
  useEffect(() => {
    const predefinedPositions = positions[players.length + 1];
    if (predefinedPositions) {
      setParticipants(() => {
        const participants = [];

        // Add the current player
        participants.push({
          position:
            game.amountOfParticipants <= 6
              ? currentPlayerPosUpToSixPlayers
              : currentPlayerPosUpFromSixPlayers,
          id: `current-${player.id}`,
          name: player.name,
        });

        // Add the positions for the other players
        predefinedPositions.forEach((position, _index) => {
          participants.push({
            position,
            id: `other-${_index}`,
            name: players[_index].name,
          });
        });

        return participants;
      });
    }
  }, [players, player.id, game.amountOfParticipants, player.name]);

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
      <div className="bg-blue-300 w-full h-full">{children}</div>
    </div>
  );
}
