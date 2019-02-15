import Color from "./color";
import Vector from "./vector";
import { flatten } from "./utils";

interface DotMeshOptions {
  color: Color;
  polyCount: number;
}

export default class DotMesh {
  colors: number[];
  vectors: number[];
  static cache: Record<number, Vector[]> = {};
  static createVectors = (polyCount: number): Vector[] => {
    const cache = DotMesh.cache[polyCount];

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

    DotMesh.cache[polyCount] = vectors;

    return vectors;
  };

  constructor(options: DotMeshOptions) {
    const vectors = DotMesh.createVectors(options.polyCount);
    console.log("vectors", vectors);
    this.vectors = vectors.map((v: Vector) => v.toArray()).reduce(flatten, []);

    const colors = new Array(vectors.length).fill(options.color);
    console.log("colors", colors);

    this.colors = colors.map((c: Color) => c.toArray()).reduce(flatten, []);
  }
}
