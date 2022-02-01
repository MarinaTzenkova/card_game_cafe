import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";

export const Card = ({ setIsDragging, floorPlane }) => {
  const [position, setPosition] = useState([0, 1, 0]);
  const { size, viewport } = useThree();

  const aspect = size.width / viewport.width;

  const dragObjectref = useRef();

  const [spring, api] = useSpring(() => ({
    position,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));
  let planeIntersectPoint = new Vector3();

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      setIsDragging(active);

      api.start({
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position,
        scale: active ? 1.2 : 1,
        rotation: [y / aspect, x / aspect, 0],
      });
      return timeStamp;
    },
    { delay: true }
  );

  const ace_hearts = useLoader(GLTFLoader, "/ace/ace_hearts.glb");
  const card_front = useLoader(GLTFLoader, "/ace/card_front.glb");
  const card_back = useLoader(GLTFLoader, "/ace/card_back.glb");
  ace_hearts.scene.children[0].rotation.x += 0.8;
  card_front.scene.children[0].rotation.x += 0.8;
  card_back.scene.children[0].rotation.x += 0.8;

  return (
    <animated.mesh {...spring} {...bind()} castShadow>
      <group
        ref={dragObjectref}
        scale={new Vector3(0.2, 0.2, 0.2)}
        position={new Vector3(15, 0, 0)}
        dispose={null}
      >
        <primitive
          object={ace_hearts.scene}
          position={new Vector3(-61, 0, 0)}
        />
        <primitive object={card_front.scene} position={new Vector3(0, 0, 0)} />
        {/* <primitive
          object={card_back.scene}
          position={new Vector3(-30, 0, -1)}
        /> */}
      </group>
    </animated.mesh>
  );
};
