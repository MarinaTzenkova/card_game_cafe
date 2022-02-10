import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadDeck } from "../../store/whist/actions/deck";
import { loadGame } from "../../store/whist/actions/game";
import { loadScores } from "../../store/whist/actions/scores";
import { loadParticipants } from "../../store/whist/actions/participants";
import Spinner from "../common/Spinner";

export default function GameData({ children }) {
  const game = useSelector((state) => state.game);
  const participants = useSelector((state) => state.participants);
  const deck = useSelector((state) => state.deck);
  const scores = useSelector((state) => state.scores);

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
    }

    if (
      game.hasStarted &&
      participants.length !== 0 &&
      deck.length !== 0 &&
      Object.keys(scores).length !== 0
    ) {
      setHasLoaded(true);
    }
  }, [game, participants, deck, scores, dispatch]);

  if (!hasLoaded) return <Spinner />;

  return children;
}
