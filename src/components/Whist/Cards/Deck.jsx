import { a } from "@react-spring/three";

import useTextures from "./useTextures";

import Spinner from "../../common/Spinner";
import useReactGesture from "./useDrag";
import { useEffect, useState } from "react";
import { useGesture } from "react-use-gesture";
import { useThree } from "@react-three/fiber";

export default function Deck() {
  const { gl, camera } = useThree();
  useEffect(() => {
    function handleResize() {
      const canvas = gl.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width || canvas.height !== height) {
        console.log(width, height, canvas, width / height);
        // you must pass false here or three.js sadly fights the browser
        gl.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    }
    window.addEventListener("resize", handleResize);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const { cards, card_back, card_stack } = useTextures();
  const { props, bind, scale: cardScale } = useReactGesture(cards);

  const deckBind = useGesture({
    onClick: ({ event, args: [index] }) => setIsOpen(!isOpen),
  });

  if (props.length === 0) return <Spinner />;

  return (
    <group dispose={null}>
      {isOpen ? (
        props.map(({ scale, position, rotation }, i) => (
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
              position={[0, 0, i]}
            />
          </a.mesh>
        ))
      ) : (
        <a.mesh>
          <primitive object={card_back} scale={cardScale} {...deckBind(0)} />
          <primitive object={card_stack} scale={cardScale} />
        </a.mesh>
      )}
    </group>
  );
}
