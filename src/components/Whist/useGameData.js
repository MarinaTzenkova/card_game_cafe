import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from "../../store/actions/game";
import { getPlayer, getPlayers } from "../../store/actions/player";

export default function useGameData(playerId, gameId) {
  const [hasLoaded, setHasLoaded] = useState(false);

  const players = useSelector((state) => state.players);
  const game = useSelector((state) => state.game);
  const player = useSelector((state) => state.player);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!(playerId && gameId) && playerId !== 0 && gameId !== 0) {
      setHasLoaded(false);
    } else {
      if (game.currentRound !== -1) {
        dispatch(getGame(gameId));
      }
      if (players.length !== 0) {
        dispatch(getPlayers(playerId, gameId));
      }
      if (player.id !== -1) {
        dispatch(getPlayer(playerId, gameId));
      }

      setHasLoaded(true);
    }
  }, [players, game, player, playerId, gameId, dispatch]);

  return { hasLoaded };
}
