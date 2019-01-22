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
    window.addEventListener("keydown", this.onKeyPress);
  }

  onKeyPress = (ev: KeyboardEvent) => {
    // @NOTE: Allow only certain keys.
    switch (ev.which) {
      case Key.Space:
      case Key.Up:
      case Key.Down:
      case Key.Left:
      case Key.Right:
        this.publish("keypress", ev);
        break;
    }
  };
}

export default new Keyboard();
