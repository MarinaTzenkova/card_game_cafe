import useCards from "../cards/useCards";

import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";
import { useRef } from "react";
import { CameraControls } from "three-stdlib";
import { OrbitControls, TransformControls } from "@react-three/drei";

export default function Cards() {
  /**
   * 1. Visualize cards
   * 2. Shuffle + animation (optional)
   * 3. Drag cards
   */
  const { camera, size } = useThree();
  const controls = useRef();
  // useCards();
  const ace_hearts = useLoader(GLTFLoader, "/ace/ace_hearts.glb");
  const card_front = useLoader(GLTFLoader, "/ace/card_front.glb");
  const card_back = useLoader(GLTFLoader, "/ace/card_back.glb");
  ace_hearts.scene.children[0].rotation.x += 0.8;
  card_front.scene.children[0].rotation.x += 0.8;
  card_back.scene.children[0].rotation.x += 0.8;
  return (
    <TransformControls mode="translate">
      <mesh>
        {/* <OrbitControls camera={camera} /> */}
        <primitive
          object={ace_hearts.scene}
          scale={new Vector3(55, 55, 1)}
          position={new Vector3(-3350, 0, 0)}
        />
        <primitive object={card_front.scene} scale={new Vector3(55, 55, 1)} />
        <primitive
          object={card_back.scene}
          scale={new Vector3(55, 55, 1)}
          position={new Vector3(-1650, 0, -1)}
        />
      </mesh>
    </TransformControls>
  );
}
