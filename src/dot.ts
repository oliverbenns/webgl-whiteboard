import Color from "./color";
import Vector from "./vector";

type DotOptions = Partial<{
  color: Color;
  scale: number;
  position: Vector;
}>;

export default class Dot {
  public color: Color = new Color();
  public scale: number = 100;
  public position: Vector;

  constructor(options: DotOptions = {}) {
    if (options.position) {
      this.position = options.position;
    }
  }
}
