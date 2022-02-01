import { Vector3 } from "three";

export const Card = ({ face, position }) => {
  return (
    <group
      scale={new Vector3(0.2, 0.2, 0.2)}
      position={position.group}
      dispose={null}
    >
      <primitive object={face.scene} position={position.face} />
    </group>
  );
};
