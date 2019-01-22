import Color from "./color";
import Dot from "./dot";
import Vector from "./vector";

import Mouse, { _MouseEvent } from "./mouse";

export default class Whiteboard {
  public dots: Dot[] = [];

  constructor() {
    Mouse.subscribe("click", this.onMouseClick);
  }

  onMouseClick = (ev: _MouseEvent) => {
    const color = new Color(0, 0, 0);

    const dot = new Dot({ color, position: ev.position });

    this.addDot(dot);
  };

  addDot(dot: Dot) {
    this.dots.push(dot);
    console.log("this.dots", this.dots);
  }
}
