import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRooms } from "../../store/actions/rooms";

export default function Rooms() {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rooms.length === 0) {
      console.log("test");
      dispatch(getRooms());
    }
  }, [rooms]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl pt-10 text-gray-400 font-bold">
        Available game rooms
      </h1>
      {rooms.length !== 0 ? (
        <div className="grid grid-cols-3 gap-3 mt-10">
          {rooms.map((game, index) => (
            <div className="bg-gray-300 w-max px-3" key={index}>
              {game.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
