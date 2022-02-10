import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl pt-10 text-gray-400 font-bold">
        Digital board game cafe
      </h1>
      <h2 className="text-gray-400 text-xl font-semibold mt-10 border bg-white rounded-md px-2">
        <Link to="/game">Start new game</Link>
      </h2>
    </div>
  );
};
