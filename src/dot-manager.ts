import Color from "./color";
import Dot from "./dot";
import Vector from "./vector";
import Camera from "./camera";

import Mouse, { _MouseEvent } from "./mouse";

// @TODO: We have a camera already, don't create a new one!
const camera = new Camera();

export default class DotManager {
  public dots: Dot[] = [];

  constructor() {
    Mouse.subscribe("down", this.onMouseDown);
    Mouse.subscribe("drag", this.onMouseDrag);
  }

  onMouseDown = (ev: _MouseEvent) => {
    if (camera.dragMode) {
      return;
    }

    const color = new Color(0, 0, 0);
    const position = this.screenToWorldPosition(ev.target);
    const dot = new Dot({ color, position });

    this.addDot(dot);
  };

  onMouseDrag = (ev: _MouseEvent) => {
    if (camera.dragMode) {
      return;
    }

    const color = new Color(0, 0, 0);
    const position = this.screenToWorldPosition(ev.target);
    const dot = new Dot({ color, position });

    this.addDot(dot);
  };

  addDot(dot: Dot) {
    this.dots.push(dot);
  }

  screenToWorldPosition(position: Vector) {
    const x = position.x - camera.position.x;
    const y = position.y - camera.position.y;

    return new Vector(x, y);
  }
}
