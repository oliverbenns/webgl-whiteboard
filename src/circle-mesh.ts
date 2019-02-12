import Color from "./color";
import Mesh from "./mesh";
import Vector from "./vector";

interface CircleMeshOptions {
  color: Color;
  polyCount: number;
}

export default class CircleMesh extends Mesh {
  static cache: Record<number, Vector[]> = {};
  static createVectors = (polyCount: number): Vector[] => {
    const cache = CircleMesh.cache[polyCount];

    if (cache) {
      return cache;
    }

    const originAngle = (Math.PI * 2) / polyCount;
    const vectors: Vector[] = [];

    const createFace = () => {
      const a = new Vector(0, 0);
      const b = new Vector(0, 1);
      const c = b.clone();
      c.rotate(originAngle);

      return [a, b, c];
    };

    for (let i = 0; i < polyCount; i++) {
      const faceAngle = originAngle * i;

      const face = createFace();
      face[1].rotate(faceAngle);
      face[2].rotate(faceAngle);

      vectors.push(...face);
    }

    CircleMesh.cache[polyCount] = vectors;

    return vectors;
  };

  constructor(options: CircleMeshOptions) {
    const vectors = CircleMesh.createVectors(options.polyCount);
    const colors = new Array(vectors.length).fill(options.color);

    super({ colors, vectors });
  }
}
