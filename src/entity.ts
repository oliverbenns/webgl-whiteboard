import Mesh from "./mesh";
import Vector from "./vector";

interface EntityOptions {
  mesh: Mesh;
  position: Vector;
  scale: Vector;
}

abstract class Entity {
  public mesh: Mesh;
  public position: Vector;
  public scale: Vector;

  constructor(options: EntityOptions) {
    this.mesh = options.mesh;
    this.position = options.position;
    this.scale = options.scale;
  }
}

export default Entity;
