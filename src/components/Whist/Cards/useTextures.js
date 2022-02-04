import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Box3, Vector3 } from "three";
import { useEffect } from "react";

export default function useTextures() {
  const ace_hearts_fbx = useLoader(FBXLoader, "/cards/ace_hearts.fbx");
  const ace_spades_fbx = useLoader(FBXLoader, "/cards/ace_spades.fbx");
  const ace_clubs_fbx = useLoader(FBXLoader, "/cards/ace_clubs.fbx");
  const ace_diamonds_fbx = useLoader(FBXLoader, "/cards/ace_diamonds.fbx");
  const card_back_fbx = useLoader(FBXLoader, "/cards/card_back.fbx");
  const card_stack_fbx = useLoader(FBXLoader, "/cards/card_stack.fbx");

  function setCenter(obj, z) {
    const box = new Box3().setFromObject(obj);
    const center = box.getCenter(new Vector3());

    obj.position.set(-center.x, -center.y, -center.z + z);

    return center;
  }

  useEffect(() => {
    setCenter(ace_hearts_fbx, 3);
    setCenter(ace_spades_fbx, 8);
    setCenter(ace_clubs_fbx, 11);
    setCenter(ace_diamonds_fbx, 14);
    setCenter(card_back_fbx, 14);
    setCenter(card_stack_fbx, 1);
  }, []);

  const cards = [];

  cards.push(ace_hearts_fbx, ace_spades_fbx, ace_clubs_fbx, ace_diamonds_fbx);

  return {
    cards,
    card_stack: card_stack_fbx,
    card_back: card_back_fbx,
    ace_hearts_fbx,
  };
}
