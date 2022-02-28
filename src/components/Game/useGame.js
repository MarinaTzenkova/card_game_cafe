import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { makeGame } from "../../socket";

export default function useGame() {
  const options = [3, 4, 5, 6, 7, 8];
  const [players, setPlayers] = useState(3);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const game = useSelector((state) => state.game);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function setInitialState() {
    setPlayers(3);
  }

  function startGame() {
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

  useEffect(() => {
    setInitialState();
  }, []);

  return {
    game,
    name,
    setName,
    options,
    players,
    setPlayers,
    error,
    setError,
    startGame,
  };
}
