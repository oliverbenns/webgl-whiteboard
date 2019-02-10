import Color from "./color";
import Dot from "./dot";
import CircleMesh from "./circle-mesh";
import Vector from "./vector";
import Camera from "./camera";
import Renderer from "./renderer";

import Pointer, { PointerEvent } from "./pointer";

// @TODO: We have a camera already, don't create a new one!
const camera = new Camera();

export default class DotManager {
  public dots: Dot[] = [];

  constructor() {
    Pointer.subscribe("down", this.onPointerEvent);
    Pointer.subscribe("drag", this.onPointerEvent);
  }

  onPointerEvent = (ev: PointerEvent) => {
    if (camera.dragMode) {
      return;
    }
    const position = this.screenToWorldPosition(ev.target);

    const dot = new Dot(position);

    this.dots.push(dot);
  };

  screenToWorldPosition(position: Vector) {
    const x = position.x - camera.position.x;
    const y = position.y - camera.position.y;

    return new Vector(x, y);
  }

  render(renderer: Renderer) {
    this.dots.forEach((ent, index) => {
      ent.render(renderer, index);
    });
  }
}
