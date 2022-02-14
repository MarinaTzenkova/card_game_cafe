import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateGame } from "../../store/whist/actions/game";
import prepareGame from "./prepareGame";
import { setParticipants } from "../../store/whist/actions/participants";
import { setScores } from "../../store/whist/actions/scores";
import { setPlayer } from "../../store/whist/actions/player";
import { setDeck } from "../../store/whist/actions/deck";
import { useNavigate } from "react-router";

export default function useGame() {
  const options = [3, 4, 5, 6, 7, 8];
  const [players, setPlayers] = useState(3);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function setInitialState() {
    setPlayers(3);
  }

  function startGame() {
    if (!error) {
      const newGame = prepareGame(game, name, players);
      dispatch(updateGame(newGame));
      navigate("/game/rooms");
      // dispatch(setScores(newGame.id, players, participantNames));
      // dispatch(setDeck(newGame.id, participantNames));

      // dispatch(setParticipants(newGame.id, participantNames));
      // dispatch(setPlayer(participantNames[0], 0)).then(() => {
      // });
    }
  }

  useEffect(() => {
    dispatch(
      updateGame({
        ...game,
        hasStarted: false,
      })
    );
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
