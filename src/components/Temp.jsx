import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setupSocket } from "../socket";
import { createGame } from "../store/actions/game";
import { setPlayer, subscribeToUpdates } from "../store/actions/player";

const buttonStyle = "bg-white text-black";
export default function Temp() {
  const socket = setupSocket();
  const [disabled, setDisabled] = useState({
    login: false,
    start: false,
    join: false,
  });
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);

  function loginPlayer() {
    if (disabled.login) return;

    const tempPlayer = {
      name: "Player name 1",
    };

    dispatch(setPlayer(tempPlayer));
    setDisabled((oldState) => ({ ...oldState, login: true }));
    dispatch(subscribeToUpdates(socket));
  }

  function startGame() {
    if (disabled.start) return;

    const newGame = {
      name: "game name 1",
      mode: "1-8-1",
      amountOfParticipants: 3,
    };

    dispatch(createGame(newGame));
    setDisabled((oldState) => ({ ...oldState, start: true }));
  }
  return (
    <>
      State machine
      <div className={buttonStyle} onClick={() => startGame()}>
        Start game
      </div>
      {/* <div className="flex w-1/2 mx-auto justify-between p-1">
        <div className={buttonStyle} onClick={() => loginPlayer()}>
          Login {player.name}
        </div>
        <div className={buttonStyle}>Join game</div>
        <div className={buttonStyle}>Play card player 1</div>
        <div className={buttonStyle}>Play card player 2</div>
        <div className={buttonStyle}>Play card player 3</div>
      </div>
      <div className="flex flex-col mx-auto w-1/2 mt-10">
        <div className={buttonStyle}>Socket messages</div>
      </div> */}
    </>
  );
}
