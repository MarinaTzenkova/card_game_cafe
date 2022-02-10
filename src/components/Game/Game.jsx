import useGame from "./useGame";

export default function Game() {
  const {
    options,
    players,
    errors,
    handleChange,
    handleClick,
    handleInput,
    hasErrors,
  } = useGame();

  const necessaryPlayerFields = [...Array(players)];

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
        {necessaryPlayerFields.map((field, _index) => (
          <div className="text-xl text-gray-400 mt-2" key={_index}>
            Participant: {_index + 1}{" "}
            <input
              value={field}
              className="rounded-lg"
              type="text"
              onChange={(event) => handleInput(event, _index)}
            />
            {!hasErrors ? (
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
            hasErrors ? "cursor-not-allowed" : "cursor-pointer"
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
