import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createGame } from "../../store/actions/game";

export default function useGame() {
  const options = [3, 4, 5, 6, 7, 8];
  const [players, setPlayers] = useState(3);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const game = useSelector((state) => state.game);
  const navigate = useNavigate();

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
      createGame(newGame).then(() => navigate("/rooms"));
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
