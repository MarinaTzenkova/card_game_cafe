import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGame } from "../../store/actions/game";
import { getPlayer, getPlayers } from "../../store/actions/player";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import getCookie from "../../utils/getCookie";

export default function GameData({ children }) {
  const params = useParams();

  const [hasLoaded, setHasLoaded] = useState(false);

  const players = useSelector((state) => state.players);
  const game = useSelector((state) => state.game);
  const id = params["id"];
  const playerId = getCookie("playerId");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGame(id));

    // get player from cookie/localstorage
    if (playerId !== undefined && playerId !== null) {
      dispatch(getPlayers(playerId, id));
      dispatch(getPlayer(playerId, id));
    }

    if (game.currentRound !== -1 && players.length !== 0) {
      setHasLoaded(true);
    }
  }, [playerId, id, game.currentRound, players.length, dispatch]);

  if (!hasLoaded)
    return (
      <div className="w-1/2 text-center text-white flex items-center justify-center">
        Game is starting...
      </div>
    );

  return children;
}
