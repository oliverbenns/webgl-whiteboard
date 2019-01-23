import Color from "./color";
import Dot from "./dot";
import Vector from "./vector";
import Camera from "./camera";

import Mouse, { _MouseEvent } from "./mouse";

// @TODO: We have a camera already, don't create a new one!
const camera = new Camera();

export default class Whiteboard {
  public dots: Dot[] = [];

  constructor() {
    Mouse.subscribe("click", this.onMouseClick);
  }

  onMouseClick = (ev: _MouseEvent) => {
    const color = new Color(0, 0, 0);

    const position = this.screenToWorldPosition(ev);

    const dot = new Dot({ color, position });

    this.addDot(dot);
  };

  addDot(dot: Dot) {
    this.dots.push(dot);
    console.log("this.dots", this.dots);
  }

  screenToWorldPosition(ev: _MouseEvent) {
    const x = ev.position.x - camera.position.x;
    const y = ev.position.y - camera.position.y;

    return new Vector(x, y);
  }
}
