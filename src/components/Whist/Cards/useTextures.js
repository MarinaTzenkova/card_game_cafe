import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

const heartsUrl = "/cards/hearts";
const clubsUrl = "/cards/clubs";
const spadesUrl = "/cards/spades";
const diamondsUrl = "/cards/diamonds";
const otherUrl = "/cards/other";

export default function useTextures() {
  function useCard(url, filename) {
    const material = useLoader(MTLLoader, `${url}/${filename}.mtl`);
    const object = useLoader(OBJLoader, `${url}/${filename}.obj`, (loader) => {
      material.preload();
      loader.setMaterials(material);
    });

    return object;
  }

  const ace_hearts = useCard(heartsUrl, "ace_hearts");
  const ace_spades = useCard(spadesUrl, "ace_spades");
  const ace_clubs = useCard(clubsUrl, "ace_clubs");
  const ace_diamonds = useCard(diamondsUrl, "ace_diamonds");
  const card_back = useCard(otherUrl, "card_back");
  const card_stack = useCard(otherUrl, "card_stack");

  const cards = [];

  cards.push(ace_hearts, ace_spades, ace_clubs, ace_diamonds);

  return { cards, card_stack, card_back };
}
