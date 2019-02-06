import Mesh from "./mesh";
import Vector from "./vector";

interface Entity {
  mesh: Mesh;
  position: Vector;
  scale: Vector;
}

export default Entity;
