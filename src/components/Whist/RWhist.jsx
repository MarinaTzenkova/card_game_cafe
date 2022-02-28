import { useParams } from "react-router";

import Board from "../common/Layout/Board";
import Participants from "../common/Layout/Participants";

import GameData from "./GameData";
import { placeCard } from "../../socket";
import getCookie from "../../utils/getCookie";
import Deck from "./Deck";
import PlayerCards from "./PlayerCards";
import OwnHand from "./OwnHands";
import PlacedCards from "./PlacedCards";

export default function RWhist() {
  const params = useParams();
  const gameId = params["id"];
  const playerId = getCookie("playerId");

  function setPlaced(card) {
    placeCard(gameId, playerId, card.card);
  }

  return (
    <GameData>
      {/* //   <Scoreboard />
       */}
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
    </GameData>
  );
}
