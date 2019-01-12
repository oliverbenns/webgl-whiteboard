import Color from "color";
import Vector from "vector";

interface MeshOptions {
  colors: Color[];
  vectors: Vector[];
}

export default class Mesh {
  colors: Color[];
  vectors: Vector[];

  constructor(options: MeshOptions) {
    this.colors = options.colors;
    this.vectors = options.vectors;
  }

  // toArray() {
  //   return this.vectors.map(v => v.toArray);
  // }
}
