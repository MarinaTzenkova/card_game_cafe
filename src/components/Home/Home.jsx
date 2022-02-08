import { Link } from "react-router-dom";

export const Home = () => (
  <div className="flex flex-col items-center">
    <h1 className="text-4xl pt-10 text-gray-400 font-bold">
      Digital board game cafe
    </h1>
    <h2 className="text-gray-400 text-xl font-semibold mt-10 border bg-white rounded-md px-2">
      <Link to="/game">Start new game</Link>
    </h2>
    {/* <h2 className="text-gray-400 text-xl font-semibold mt-10">
      Available games
    </h2>
    <div className="grid grid-cols-3 gap-2 w-full px-48 pt-5">
      <div className="bg-gray-100 rounded-lg h-32 font-semibold text-lg flex items-center justify-center cursor-pointer">
        <Link to="/game/r-whist">Romanian Whist</Link>
      </div>
      <div className="bg-gray-100 rounded-lg h-32 font-semibold text-lg flex items-center justify-center cursor-pointer">
        Coming soon.
      </div>
    </div> */}
  </div>
);
