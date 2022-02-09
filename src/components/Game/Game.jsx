import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updatePlayers } from "../../store/whist/actions/game";
import prepareGame from "./prepareGame";

export default function Game() {
  const options = [3, 4, 5, 6, 7, 8];
  const [players, setPlayers] = useState(3);
  const [participantNames, setParticipantNames] = useState({});
  const [errors, setErrors] = useState({});
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
    setInitialState();
  }, []);

  function handleChange(event) {
    const newVal = parseInt(event.target.value);
    setPlayers(newVal);
    [...Array(newVal)].forEach((player, _index) => {
      setParticipantNames((previousParticipants) => ({
        ...previousParticipants,
        [_index]: "",
      }));
      setErrors((oldErrors) => ({ ...oldErrors, [_index]: true }));
    });
  }

  function setInitialState() {
    setPlayers(3);
    [...Array(3)].forEach((player, _index) => {
      setParticipantNames((previousParticipants) => ({
        ...previousParticipants,
        [_index]: "",
      }));
      setErrors((oldErrors) => ({ ...oldErrors, [_index]: true }));
    });
  }

  function handleClick() {
    if (!Object.keys(errors).some((key) => errors[key])) {
      const newGame = prepareGame(game, players, participantNames);
      dispatch(updatePlayers(newGame)).then(() => {
        navigate("/game/r-whist");
      });
    }
  }

  function handleInput(event, index) {
    const input = event.target.value;
    if (input === "") {
      setErrors((oldErrors) => ({ ...oldErrors, [index]: true }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, [index]: false }));
    }
    setParticipantNames((oldNames) => ({
      ...oldNames,
      [index]: event.target.value,
    }));
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
      <div className="mt-2">
        {[...Array(players)].map((field, _index) => (
          <div className="text-xl text-gray-400 mt-2" key={_index}>
            Participant: {_index + 1}{" "}
            <input
              value={field}
              className="rounded-lg"
              type="text"
              onChange={(event) => handleInput(event, _index)}
            />
            {Object.keys(errors).length !== 0 ? (
              errors[_index] ? (
                <div className="text-red-500">Field cannot be empty!</div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      {players !== 0 ? (
        <div
          className={`bg-slate-400 rounded-lg w-64 text-center text-white  mt-5 ${
            Object.keys(errors).some((key) => errors[key])
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
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
