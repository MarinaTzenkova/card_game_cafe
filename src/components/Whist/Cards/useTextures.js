import { useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Box3, Group, Scene, Vector3 } from "three";
import { useEffect, useState } from "react";

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

  // useEffect(() => {
  //   if (!centered) {
  //     scene.traverse((child) => {
  //       if (child.type === "Group" && child.parent.type === "Scene") {
  //         var box = new Box3().setFromObject(child);
  //         var tempCenter = new Vector3();
  //         box.getCenter(tempCenter);
  //         console.log(center, tempCenter);
  //         setCenter(tempCenter);
  //         // ace_hearts.position.sub(center);
  //       }
  //     });
  //     // var box = new Box3().setFromObject(scene);
  //     // var center = new Vector3();
  //     // box.getCenter(center);
  //     // console.log(center);
  //     // const geometry = scene.geometry;
  //     // geometry.computeBoundingBox();
  //     // geometry.boundingBox.getCenter(center);
  //     // ace_hearts.position.sub(center);
  //     // console.log(center, geometry, geometry.boundingBox);
  //     setCentered(true);
  //     console.log(ace_hearts.position);
  //   }
  // }, []);

  const cards = [];

  cards.push(ace_hearts, ace_spades, ace_clubs, ace_diamonds);

  return { cards, card_stack, card_back };
}
