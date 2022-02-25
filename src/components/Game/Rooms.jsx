import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getRooms } from "../../store/actions/rooms";

export default function Rooms() {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  function handleClick(game) {
    if (game.joined !== game.required) {
      navigate(`/game/${game.id}/join`);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl pt-10 text-gray-400 font-bold">
        Available game rooms
      </h1>
      {rooms.length !== 0 ? (
        <div className="grid grid-cols-3 gap-3 mt-10">
          {rooms.map((game, index) => (
            <div
              className="bg-gray-300 w-max px-3 flex flex-col items-center p-3"
              key={index}
              onClick={() => handleClick(game)}
            >
              <img
                src="/images/playing_cards.jpg"
                className="w-64"
                alt="cards"
              />
              <div className="text-xl font-semibold">{game.name}</div>
              <div className="text-lg">
                Amount of participants: {game.joined} of {game.required}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
