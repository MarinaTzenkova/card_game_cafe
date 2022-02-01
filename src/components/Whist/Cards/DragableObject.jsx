import { useGesture } from "react-use-gesture";
import { useSpring, a } from "@react-spring/three";
import { useThree } from "@react-three/fiber";

export default function DragableObject({ children }) {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) =>
      set({
        position: [x / aspect, -y / aspect, 0],
        // rotation: [y / aspect, x / aspect, 0],
      }),
    onHover: ({ hovering }) =>
      set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] }),
  });
  return (
    <a.mesh {...spring} {...bind()} castShadow>
      {children}
    </a.mesh>
  );
}
