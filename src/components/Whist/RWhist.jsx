import { useParams } from "react-router";

import Board from "../common/Layout/Board";
import Participants from "../common/Layout/Participants";
import Spinner from "../common/Spinner/Spinner";

import { placeCard } from "../../socket";
import getCookie from "../../utils/getCookie";

import Deck from "./Regions/Deck";
import PlayerCards from "./Regions/PlayerCards";
import OwnHand from "./Regions/OwnHands";
import PlacedCards from "./Regions/PlacedCards";
import useGameData from "./useGameData";

export default function RWhist() {
  const params = useParams();
  const gameId = params["id"];
  const playerId = getCookie("playerId");

  // Load all game data, otherwise show spinner
  const { hasLoaded } = useGameData(playerId, gameId);

  function setPlaced(card) {
    placeCard(gameId, playerId, card.card);
  }

  if (!hasLoaded) return <Spinner />;

  return (
    <Participants>
      <Board>
        <div className="flex items-center justify-center h-full relative">
          <div className="absolute top-0 right-0">
            <Deck />
            <PlayerCards />
            <OwnHand setPlaced={setPlaced} />
          </div>
          <PlacedCards />
        </div>
      </Board>
    </Participants>
  );
}
