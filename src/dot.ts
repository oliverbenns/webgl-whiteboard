import CircleMesh from "./circle-mesh";
import Color from "./color";
import Entity from "./entity";
import Mesh from "./mesh";
import Vector from "./vector";

interface DotOptions {
  color: Color;
  position: Vector;
}

class Dot extends Entity {
  constructor(options: DotOptions) {
    const position = options.position;
    console.log("options.position", options.position);

    const mesh = new CircleMesh({
      color: options.color,
      polyCount: 64
    });

    const scale = new Vector(32, 32);

    super({ mesh, position, scale });
  }
}

export default Dot;
