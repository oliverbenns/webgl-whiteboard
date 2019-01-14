import Color from "./color";
import Mesh from "./mesh";
import Vector from "./vector";

interface CircleMeshOptions {
  color: Color;
  polyCount: number;
  radius: number;
}

export default class CircleMesh extends Mesh {
  constructor(options: CircleMeshOptions) {
    const originAngle = (Math.PI * 2) / options.polyCount;

    const vectors: Vector[] = [];

    const createFace = () => {
      const a = new Vector(0, 0);
      const b = new Vector(0, options.radius);
      const c = b.clone();
      c.rotate(originAngle);

      return [a, b, c];
    };

    for (let i = 0; i < options.polyCount; i++) {
      const faceAngle = originAngle * i;

      const face = createFace();
      face[1].rotate(faceAngle);
      face[2].rotate(faceAngle);

      vectors.push(...face);
    }

    const colors = new Array(vectors.length).fill(options.color);

    super({ colors, vectors });
  }
}
