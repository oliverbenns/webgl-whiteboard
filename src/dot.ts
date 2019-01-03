import Color from './color';
import Vector from './vector';

// @TODO: use 'pick' type here.
type DotOptions = Partial<{
  color: Color;
  scale: number;
}>

export default class Dot {
  public color: Color;
  public scale: number;
  public position: Vector;

  constructor(options: DotOptions = {}) {
    this.color = new Color();
    this.scale = 5;
    this.position = new Vector();
  }
}
