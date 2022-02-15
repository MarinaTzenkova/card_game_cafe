import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadDeck } from "../../store/actions/deck";
import { loadGame } from "../../store/actions/game";
import { loadScores } from "../../store/actions/scores";
import { loadParticipants } from "../../store/actions/participants";
import { loadPlayer } from "../../store/actions/player";
import Spinner from "../common/Spinner";

export default function GameData({ children }) {
  const game = useSelector((state) => state.game);
  const participants = useSelector((state) => state.participants);
  const deck = useSelector((state) => state.deck);
  const scores = useSelector((state) => state.scores);
  const player = useSelector((state) => state.player);

  const [hasLoaded, setHasLoaded] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!game.hasStarted) {
      dispatch(loadGame());
    } else {
      if (participants.length === 0) {
        dispatch(loadParticipants(game.id));
      }
      if (deck.length === 0) {
        dispatch(loadDeck(game.id));
      }
      if (Object.keys(scores).length === 0) {
        dispatch(loadScores(game.id));
      }
      if (player.id === -1) {
        dispatch(loadPlayer());
      }
    }

    if (
      game.hasStarted &&
      participants.length !== 0 &&
      deck.length !== 0 &&
      Object.keys(scores).length !== 0 &&
      player.id !== -1
    ) {
      setHasLoaded(true);
    }
  }, [game, participants, deck, scores, dispatch, player]);

  if (!hasLoaded) return <Spinner />;

  return children;
}
