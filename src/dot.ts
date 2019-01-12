import Color from "./color";
import Body from "./body";
import Vector from "./vector";
import Mesh from "./mesh";

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

    const colors = [options.color, options.color, options.color];

    const vectors = [
      new Vector(0, 0),
      new Vector(0, this.scale * 2),
      new Vector(this.scale, 0)
    ];

    this.mesh = new Mesh({ colors, vectors });
  }
}
