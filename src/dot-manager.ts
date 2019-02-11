import Color from "./color";
import Dot from "./dot";
import CircleMesh from "./circle-mesh";
import Vector from "./vector";
import Camera from "./camera";
import Renderer from "./renderer";

import Pointer, { PointerEvent } from "./pointer";

class DotManager {
  public dots: Dot[] = [];

  constructor() {
    Pointer.subscribe("down", this.onPointerEvent);
    Pointer.subscribe("drag", this.onPointerEvent);
  }

  onPointerEvent = (ev: PointerEvent) => {
    if (Camera.dragMode) {
      return;
    }
    const position = this.screenToWorldPosition(ev.target);

    const dot = new Dot(position);

    this.dots.push(dot);
  };

  screenToWorldPosition(position: Vector) {
    const x = position.x - Camera.position.x;
    const y = position.y - Camera.position.y;

    return new Vector(x, y);
  }

  render(renderer: Renderer) {
    this.dots.forEach((ent, index) => {
      ent.render(renderer, index);
    });
  }
}

export default new DotManager()
