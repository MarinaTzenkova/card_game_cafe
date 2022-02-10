import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setDeck } from "../../store/whist/actions/deck";
import { updateGame } from "../../store/whist/actions/game";
import { setParticipants } from "../../store/whist/actions/participants";
import { setScores } from "../../store/whist/actions/scores";
import { setPlayer } from "../../store/whist/actions/player";
import prepareGame from "./prepareGame";

export default function useGame() {
  const options = [3, 4, 5, 6, 7, 8];
  const [players, setPlayers] = useState(3);
  const [participantNames, setParticipantNames] = useState({});
  const [errors, setErrors] = useState({});
  const game = useSelector((state) => state.game);
  const navigate = useNavigate();
  const hasErrors = Object.keys(errors).length === 0;

  function setInitialState() {
    setPlayers(3);
    [...Array(3)].forEach((_, _index) => {
      setParticipantNames((previousParticipants) => ({
        ...previousParticipants,
        [_index]: "",
      }));
      setErrors((oldErrors) => ({ ...oldErrors, [_index]: true }));
    });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      updateGame({
        ...game,
        amountOfParticipants: 0,
        participants: [],
        hasStarted: false,
      })
    );
    setInitialState();
  }, []);

  function handleChange(event) {
    const newVal = parseInt(event.target.value);
    setPlayers(newVal);
    [...Array(newVal)].forEach((player, _index) => {
      setParticipantNames((previousParticipants) => ({
        ...previousParticipants,
        [_index]: "",
      }));
      setErrors((oldErrors) => ({ ...oldErrors, [_index]: true }));
    });
  }

  function handleClick() {
    if (!hasErrors) {
      const newGame = prepareGame(game);
      dispatch(updateGame(newGame));
      dispatch(setParticipants(newGame.id, participantNames));
      dispatch(setScores(newGame.id, players, participantNames));
      dispatch(setDeck(newGame.id, participantNames));
      dispatch(setPlayer(participantNames[0], 0)).then(() => {
        navigate("/game/r-whist");
      });
    }
  }

  function handleInput(event, index) {
    const input = event.target.value;
    if (input === "") {
      setErrors((oldErrors) => ({ ...oldErrors, [index]: true }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, [index]: false }));
    }
    setParticipantNames((oldNames) => ({
      ...oldNames,
      [index]: event.target.value,
    }));
  }

  return {
    options,
    players,
    participantNames,
    errors,
    handleChange,
    handleClick,
    handleInput,
    hasErrors,
  };
}
