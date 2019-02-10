import Color from "color";
import Vector from "vector";

interface MeshOptions {
  colors: Color[];
  vectors: Vector[];
}

export default class Mesh {
  colors: Color[];
  buffered: boolean;
  vectors: Vector[];

  constructor(options: MeshOptions) {
    this.colors = options.colors;
    this.vectors = options.vectors;
    this.buffered = false;
  }

  // toArray() {
  //   return this.vectors.map(v => v.toArray);
  // }
}
