import { a } from "@react-spring/three";

import useTextures from "./useTextures";

import Spinner from "../../common/Spinner";
import useReactGesture from "./useDrag";

export default function Deck() {
  const { cards } = useTextures();
  const { props, bind, scale: cardScale } = useReactGesture(cards);

  if (props.length === 0) return <Spinner />;
  return (
    <group dispose={null}>
      {props.map(({ scale, position, rotation }, i) => (
        <a.mesh
          key={i}
          scale={scale}
          position={position}
          rotation={rotation}
          {...bind(i)}
        >
          <primitive
            object={cards[i]}
            scale={cardScale}
            position={(0, i * -50, i)}
          />
        </a.mesh>
      ))}
    </group>
  );
}
