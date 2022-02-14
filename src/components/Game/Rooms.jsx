import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Rooms() {
  const game = useSelector((state) => state.game);
  // In the future, this should be list of games
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl pt-10 text-gray-400 font-bold">
        Available game rooms
      </h1>
      <h2 className="text-gray-400 text-xl font-semibold mt-10 border bg-white rounded-md px-2">
        {game.name}
        {/* <Link to="/game/r-whist">Join room</Link> */}
      </h2>
    </div>
  );
}
