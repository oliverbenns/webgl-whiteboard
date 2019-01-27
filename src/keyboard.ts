import Emitter from "./emitter";

export const enum Key {
  Space = 32,
  Up = 38,
  Down = 40,
  Left = 37,
  Right = 39
}

class Keyboard extends Emitter<KeyboardEvent> {
  constructor() {
    super();
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (ev: KeyboardEvent) => {
    if (Key.Space) {
      this.publish("keyDown", ev);
    }
  };

  onKeyUp = (ev: KeyboardEvent) => {
    this.publish("keyUp", ev);
  };
}

export default new Keyboard();
