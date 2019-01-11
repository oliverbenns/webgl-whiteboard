import Color from "color";
import Vector from "vector";

interface BodyOptions {
  colors: Color[];
  vectors: Vector[];
}

export default class Body {
  colors: Color[];
  vectors: Vector[];

  constructor(options: BodyOptions) {
    this.colors = options.colors;
    this.vectors = options.vectors;
  }

  // toArray() {
  //   return this.vectors.map(v => v.toArray);
  // }
}
