import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { makeGame } from "../../socket";

export default function Game() {
  const options = [3, 4, 5, 6, 7, 8];
  const [players, setPlayers] = useState(3);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    const newVal = parseInt(event.target.value);
    setPlayers(newVal);
  }

  function handleInput(event) {
    const input = event.target.value;
    if (input === "") {
      setError(true);
    } else {
      setError(false);
    }
    setName(input);
  }

  function createGame() {
    if (!error) {
      const newGame = {
        name,
        mode: "1-8-1",
        amountOfParticipants: players,
      };
      makeGame(dispatch, newGame);
      navigate("/rooms");
    }
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
        <div className="text-xl text-gray-400 mt-2">
          Enter game name:
          <input
            value={name}
            className="rounded-lg ml-2"
            type="text"
            onChange={handleInput}
          />
          {error ? (
            <div className="text-red-500">Field cannot be empty!</div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className={`bg-slate-400 rounded-lg w-64 text-center text-white  mt-5 ${
          error ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => createGame()}
      >
        Submit
      </div>
    </div>
  );
}
