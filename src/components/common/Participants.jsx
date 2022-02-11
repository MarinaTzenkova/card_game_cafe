import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
  const participants = useSelector((state) => state.participants);
  useEffect(() => {
    setParticipants(() => {
      const temp = [];
      const predefinedPositions = positions[participants.length];
      predefinedPositions.forEach((position, _index) => {
        temp.push({
          position,
          id: participants[_index].id,
          name: participants[_index].name,
        });
      });
      return temp;
    });
  }, [game, dispatch, participants]);

  return (
    <div className="w-3/4 h-5/6 mx-auto flex items-center justify-center relative my-10">
      {participantPositions.map((participant) => (
        <div
          className={` ${participant.position} ${staticClass}`}
          key={participant.id}
          id={`participant-${participant.id}`}
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
