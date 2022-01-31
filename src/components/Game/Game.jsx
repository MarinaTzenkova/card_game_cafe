import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updatePlayers } from "../../store/whist/actions/game";

export default function Game() {
  // needs to be dynamic based on the game
  const options = [3, 4, 5, 6, 7, 8];
  const [players, setPlayers] = useState(0);
  const [participantNames, setParticipantNames] = useState({});
  const game = useSelector((state) => state.game);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updatePlayers({
        ...game,
        amountOfParticipants: 0,
        participants: [],
        hasStarted: false,
      })
    );
  }, []);

  function handleChange(event) {
    const newVal = parseInt(event.target.value);
    setPlayers(newVal);
    [...Array(newVal)].forEach((player, _index) => {
      setParticipantNames((previousParticipants) => ({
        ...previousParticipants,
        [_index + 1]: "",
      }));
    });
  }

  function handleClick() {
    dispatch(
      updatePlayers({
        ...game,
        amountOfParticipants: players,
        participants: participantNames,
        hasStarted: true,
      })
    ).then(() => {
      navigate("/game/r-whist");
    });
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl pt-10 text-gray-400 font-bold">Start new game</h1>
      <div className="text-xl text-gray-400 mt-2">
        Number of participants:
        <select
          className="ml-2 px-2 rounded-lg"
          value={players}
          onChange={handleChange}
        >
          {options.map((option, _index) => (
            <option key={_index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="mt-2">
        {[...Array(players)].map((field, _index) => (
          <div className="text-xl text-gray-400 mt-2" key={_index}>
            Participant: {_index + 1}{" "}
            <input className="rounded-lg" type="text" />
          </div>
        ))}
      </div> */}
      {players !== 0 ? (
        <div
          className="bg-slate-400 rounded-lg w-64 text-center text-white cursor-pointer mt-5"
          onClick={(e) => handleClick(e)}
        >
          Submit
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
