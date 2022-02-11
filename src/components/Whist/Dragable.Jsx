import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";

export default function Dragable({ children, initial, dragable, setPlaced }) {
  const [position, setPosition] = useState([-initial.x, -initial.y]);
  const [{ xy }, set] = useSpring(() => ({ xy: [-initial.x, -initial.y] }));
  const bind = useGesture(
    {
      onDrag: ({ movement: [x, y] }) => {
        set.start(() => {
          if (dragable) {
            const previouxX = x + position[0];
            const previouxY = y + position[1];

            const final = [previouxX, previouxY];

            return { xy: final };
          }
        });
      },
      onDragEnd: ({ movement: [x, y] }) => {
        if (dragable) {
          const previousX = x + position[0];
          const previousY = y + position[1];
          const final = [previousX, previousY];

          setPosition(final);
          setPlaced();
        }
      },
    },
    {
      drag: { bounds: { left: -200, right: 200, top: -200, bottom: 250 } },
    }
  );

  useEffect(() => {
    // console.log(initial);
    setPosition([-initial.x, -initial.y]);
    set.start({ xy: [-initial.x, -initial.y] });
  }, [initial]);

  return (
    <animated.div
      {...bind()}
      className="absolute"
      style={{
        transform: xy.to((x, y) => `translate3d(${x}px, ${y}px, 0)`),
        touchAction: "none",
      }}
    >
      {children}
    </animated.div>
  );
}
