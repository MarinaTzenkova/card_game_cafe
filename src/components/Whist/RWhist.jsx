import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Board from "../common/Board";
import Participants from "../common/Participants";
import Deck from "./Cards/Deck";

export default function RWhist() {
  const cards = useSelector((state) => state.cards);
  const game = useSelector((state) => state.game);

  const dispatch = useDispatch();

  // useDeck(dispatch, cards, game);
  return (
    // TODO: re-add participants
    // <Participants>
    <Board>
      <div className="flex items-center justify-center h-full">
        <Canvas
          style={{ width: "800px", height: "300px" }}
          camera={{
            fov: 10,
            near: 0.1,
            scale: window.innerWidth / window.innerHeight,
            far: 200,
            position: [0, 0, 100],
          }}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <Deck />
          </Suspense>
        </Canvas>
      </div>
    </Board>
    // </Participants>
  );
}
