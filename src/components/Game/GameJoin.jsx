import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { joinGame } from "../../socket";

export const GameJoin = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function handleUserNameInput(event) {
    if (event.target.value !== "") setUserName(event.target.value);
  }
  function handleJoin() {
    if (id !== -1 && userName !== "") {
      joinGame(dispatch, id, userName);
      navigate(`/game/${id}`);
    }
  }

  return (
    <div className="w-1/2 mx-auto my-20">
      <div className="text-white">
        Username:{" "}
        <input
          type="text"
          className="text-black"
          value={userName}
          onChange={handleUserNameInput}
        />
      </div>
      <div className="bg-white text-xl w-min px-2" onClick={() => handleJoin()}>
        Join
      </div>
    </div>
  );
};
