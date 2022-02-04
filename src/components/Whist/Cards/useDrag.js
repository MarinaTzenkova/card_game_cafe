import { useSprings } from "@react-spring/core";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useGesture } from "react-use-gesture";
import { Vector3 } from "three";

export default function useReactGesture(textures) {
  const scale = new Vector3(0.05, 0.05, 0.05);

  const [position, setPosition] = useState({});

  const { size, viewport } = useThree();

  const from = (i) => {
    return {
      x: 0,
      y: 0,
      scale: new Vector3(0.05, 0.05, 0.05),
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      config: { friction: 50 },
    };
  };

  const aspect = size.width / viewport.width;

  const [props, set] = useSprings(textures.length, (i) => ({
    from: from(i),
  }));

  const bind = useGesture(
    {
      onDrag: ({ args: [index], movement: [x, y] }) => {
        set.start((i) => {
          if (index !== i) return;
          const previousPosition = position[index];

          const newX = x / aspect;
          const newY = -y / aspect;

          return {
            position: [
              previousPosition[0] + newX,
              previousPosition[1] + newY,
              0,
            ],
          };
        });
      },
      onDragEnd: ({ args: [index], movement: [x, y] }) => {
        setPosition((oldPosition) => {
          const newX = x / aspect;
          const newY = -y / aspect;
          return {
            ...oldPosition,
            [index]: [
              oldPosition[index][0] + newX,
              oldPosition[index][1] + newY,
              0,
            ],
          };
        });
      },
    },
    {
      drag: { bounds: { left: -50, right: 200, top: -100, bottom: 100 } },
    }
  );

  useEffect(() => {
    if (Object.keys(position).length === 0) {
      props.forEach((spring, _index) => {
        setPosition((oldPos) => ({ ...oldPos, [_index]: [0, 0, 0] }));
      });
    }
  }, [props, position]);

  return { props, bind, scale, position, setPosition };
}
