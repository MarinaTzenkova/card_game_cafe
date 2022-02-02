import { Vector3 } from "three";
import { Card } from "./Cards/Card";
import DragableObject from "./Cards/DragableObject";
import useTextures from "./Cards/useTextures";

export default function Cards() {
  /**
   * 1. Visualize cards
   * 2. Shuffle + animation (optional)
   * 3. Drag cards
   */

  const { ace_hearts, ace_clubs, ace_diamonds, ace_spades } = useTextures();

  return (
    <>
      <DragableObject z={1}>
        <Card
          face={ace_hearts}
          position={{
            group: new Vector3(0, 10, 1),
            face: new Vector3(0, 0, 0),
          }}
        />
      </DragableObject>
      <DragableObject z={2}>
        <Card
          face={ace_clubs}
          position={{
            group: new Vector3(-12, 10, 2),
            face: new Vector3(0, 0, 0),
          }}
        />
      </DragableObject>
      <DragableObject z={3}>
        <Card
          face={ace_diamonds}
          position={{
            group: new Vector3(0, 10, 3),
            face: new Vector3(0, 0, 0),
          }}
        />
      </DragableObject>
      <DragableObject z={4}>
        <Card
          face={ace_spades}
          position={{
            group: new Vector3(0, 10, 4),
            face: new Vector3(0, 0, 0),
          }}
        />
      </DragableObject>
    </>
  );
}
