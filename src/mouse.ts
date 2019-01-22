import Emitter from "./emitter";
import Vector from "./vector";

// @TODO: Can/should we add world coords?
export interface _MouseEvent {
  position: Vector;
}

class Mouse extends Emitter<_MouseEvent> {
  constructor() {
    super();
    window.addEventListener("click", this.onClick);
  }

  onClick = (ev: MouseEvent) => {
    const mouseEvent = {
      position: new Vector(ev.x, ev.y)
    };

    this.publish("click", mouseEvent);
  };
}

export default new Mouse();
