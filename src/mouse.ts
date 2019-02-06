import context, { Context } from "./context";
import Emitter from "./emitter";
import Vector from "./vector";

interface MouseEventType {}

// @TODO: Can/should we add world coords?
export interface _MouseEvent {
  target: Vector;
  origin: Vector;
}

class Mouse extends Emitter<_MouseEvent> {
  dragOrigin: Vector | null = null;

  constructor(context: Context) {
    super();
    context.canvas.addEventListener("mousedown", this.onDown);
    context.canvas.addEventListener("mousemove", this.onMove);
    context.canvas.addEventListener("mouseup", this.onUp);
  }

  onDown = (ev: MouseEvent) => {
    const position = new Vector(ev.x, ev.y);
    const mouseEvent = {
      target: position,
      // @TODO: Don't want origin here.
      origin: position
    };

    this.publish("down", mouseEvent);

    this.dragOrigin = new Vector(ev.x, ev.y);
  };

  onUp = (ev: MouseEvent) => {
    this.dragOrigin = null;
  };

  // @TODO: Debounce
  // @TODO: Stop creating vector each time.
  onMove = (ev: MouseEvent) => {
    if (!this.dragOrigin) {
      return;
    }

    const mouseEvent = {
      target: new Vector(ev.x, ev.y),
      origin: this.dragOrigin
    };

    this.publish("drag", mouseEvent);

    this.dragOrigin = new Vector(ev.x, ev.y);
  };
}

export default new Mouse(context);
