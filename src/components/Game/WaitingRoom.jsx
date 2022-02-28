import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getGame } from "../../store/actions/game";
import { getPlayer, getPlayers } from "../../store/actions/player";
import getCookie from "../../utils/getCookie";

export default function WaitingRoom() {
  const params = useParams();
  const game = useSelector((state) => state.game);
  const player = useSelector((state) => state.player);
  const players = useSelector((state) => state.players);
  const gameId = params["id"];
  const dispatch = useDispatch();

  function startGame() {
    console.log("starting game");
  }

  useEffect(() => {
    if (players.length === 0) {
      const playerId = parseInt(getCookie("playerId"));
      dispatch(getPlayers(playerId, gameId));
      dispatch(getPlayer(playerId, gameId));
      dispatch(getGame(gameId));
    }
  }, [players.length, gameId, dispatch]);

  return (
    <div className="flex flex-col w-1/3 mx-auto text-white">
      <div>Participants for game: {game.name}</div>
      <div className="font-bold border-b-2">{player.name} - you</div>
      {players.map((plyr, index) => (
        <div className="border-b-2" key={index}>
          {plyr.name}
        </div>
      ))}
      <div
        className="bg-white p-2 text-black cursor-pointer w-max mt-2"
        onClick={() => startGame()}
      >
        Start game
      </div>
    </div>
  );
}
