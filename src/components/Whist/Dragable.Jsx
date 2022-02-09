import { useState } from "react";
import { animated, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";

export default function Dragable({ children }) {
  const [position, setPosition] = useState([0, 0]);
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  const bind = useGesture({
    onDrag: ({ movement: [x, y] }) => {
      set.start(() => {
        const previouxX = x + position[0];
        const previouxY = y + position[1];

        const final = [previouxX, previouxY];

        return { xy: final };
      });
    },
    onDragEnd: ({ movement: [x, y] }) => {
      const previousX = x + position[0];
      const previousY = y + position[1];
      const final = [previousX, previousY];

      setPosition(final);
    },
  });

  return (
    <animated.div
      {...bind()}
      style={{
        transform: xy.to((x, y) => `translate3d(${x}px, ${y}px, 0)`),
        touchAction: "none",
      }}
    >
      {animated(children)}
    </animated.div>
  );
}
