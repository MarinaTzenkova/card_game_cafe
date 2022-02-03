import { useSprings } from "@react-spring/core";
import { useThree } from "@react-three/fiber";
import { useDrag } from "react-use-gesture";
import { Vector3 } from "three";

export default function useReactGesture(textures) {
  const scale = new Vector3(0.2, 0.2, 0.2);

  const { size, viewport } = useThree();

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

  const aspect = size.width / viewport.width;

  const [props, set] = useSprings(textures.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(({ args: [index], movement: [x, y] }) => {
    set((i) => {
      if (index !== i) return;
      return {
        position: [x / aspect, -y / aspect, 0],
      };
    });
  });

  return { props, bind, scale };
}
