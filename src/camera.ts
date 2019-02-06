import Vector from "./vector";
import Keyboard, { Key } from "./keyboard";
import Pointer, { PointerEvent } from "./pointer";

export default class Camera {
  public position = new Vector(0, 0);
  public dragMode = false;

  constructor() {
    Keyboard.subscribe("keyDown", this.onKeyDown);
    Keyboard.subscribe("keyUp", this.onKeyUp);
    Pointer.subscribe("drag", this.onPointerDrag);
  }

  onKeyDown = (ev: KeyboardEvent) => {
    if (ev.which === Key.Space && !this.dragMode) {
      this.dragMode = true;
      document.body.style.cursor = "grab";
    }
  };

  onKeyUp = (ev: KeyboardEvent) => {
    if (ev.which === Key.Space) {
      this.dragMode = false;
      document.body.style.cursor = "default";
    }
  };

  onPointerDrag = (ev: PointerEvent) => {
    if (!this.dragMode) {
      return;
    }

    const offset = ev.target.subtract(ev.origin);
    this.position.x += offset.x;
    this.position.y += offset.y;
  };
}
