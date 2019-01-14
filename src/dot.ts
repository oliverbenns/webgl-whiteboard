import Color from "./color";
import Vector from "./vector";
import Mesh from "./mesh";
import CircleMesh from "./circle-mesh";

interface DotOptions {
  color: Color;
  position: Vector;
}

export default class Dot {
  public scale: number = 100;
  public position: Vector;
  public mesh: Mesh;

  constructor(options: DotOptions) {
    this.position = options.position;

    this.mesh = new CircleMesh({
      color: options.color,
      polyCount: 64,
      radius: this.scale
    });
  }
}
