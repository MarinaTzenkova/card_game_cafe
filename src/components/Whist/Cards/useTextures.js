import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function useTextures() {
  const ace_hearts = useLoader(GLTFLoader, "/ace/ace_hearts.glb");
  const ace_spades = useLoader(GLTFLoader, "/ace/ace_spades.glb");
  const ace_clubs = useLoader(GLTFLoader, "/ace/ace_clubs.glb");
  const ace_diamonds = useLoader(GLTFLoader, "/ace/ace_diamonds.glb");
  const card_front = useLoader(GLTFLoader, "/ace/card_front.glb");
  //   const card_back = useLoader(GLTFLoader, "/ace/card_back.glb");

  // initial rotation
  ace_hearts.scene.children[0].rotation.x += 0.8;
  ace_spades.scene.children[0].rotation.x += 0.8;
  ace_clubs.scene.children[0].rotation.x += 0.8;
  ace_diamonds.scene.children[0].rotation.x += 0.8;
  card_front.scene.children[0].rotation.x += 0.8;
  //   card_back.scene.children[0].rotation.x += 0.8;

  const cards = [];

  cards.push(ace_hearts, ace_spades, ace_clubs, ace_diamonds);

  return { cards };
}
