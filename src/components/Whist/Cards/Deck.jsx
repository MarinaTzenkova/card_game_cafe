import { useSprings } from "@react-spring/core";
import { a } from "@react-spring/three";
import { useThree } from "@react-three/fiber";

import { useDrag } from "react-use-gesture";
import { Vector3 } from "three";
import useTextures from "./useTextures";

const to = (i) => ({
  x: 0,
  y: 0,
  scale: [1, 1, 1],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  config: { friction: 10 },
});
const from = (i) => ({
  x: 0,
  y: 0,
  scale: [1, 1, 1],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  config: { friction: 50 },
});

const cardScale = new Vector3(0.2, 0.2, 0.2);

export default function Deck() {
  const { cards } = useTextures();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [x, y],
      previous: [previousX, previousY],
    }) => {
      set((i) => {
        console.log(x, y, previousX, previousY);
        if (index !== i) return;
        return {
          position: [x / aspect, -y / aspect, 0],
        };
      });
    }
  );

  if (props.length === 0) throw new Error("still loading");

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
            object={cards[i].scene}
            scale={cardScale}
            position={new Vector3(-(i * 6), 10, 1 + i)}
          />
        </a.mesh>
      ))}
    </group>
  );
}
