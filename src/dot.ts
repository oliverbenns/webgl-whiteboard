import Color from "./color";
import Vector from "./vector";

type DotOptions = Partial<{
  color: Color;
  scale: number;
  position: Vector;
}>;

export default class Dot {
  public color = new Color();
  public scale: number = 100;
  public position: Vector;
  private readonly polyCount = 10;

  constructor(options: DotOptions = {}) {
    if (options.position) {
      this.position = options.position;
    }
  }

  createTriangle() {}

  // @TODO: Let's do this on the gpu! Duh!
  createVectors() {
    const vectors: Vector[] = [];
    const width = 360 / this.polyCount;

    const createTriangleVectors = () => {
      return [
        new Vector(0, 0),
        new Vector(0, this.scale * 2),
        new Vector(this.scale, 0)
      ];
    };

    return createTriangleVectors();

    // for (let i = 0; i < this.polyCount; i++) {
    //   const start = new Vector(); // 0, 0
    //   new Vector();
    // }
  }

  createColors() {
    return [
      new Color(100, 100, 255),
      new Color(100, 255, 100),
      new Color(255, 100, 100)
    ];
  }
}
