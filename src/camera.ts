import Dot from "./dot";
import Vector from "./vector";

const enum Key {
  Up = 38,
  Down = 40,
  Left = 37,
  Right = 39
}
export default class Camera {
  public position = new Vector(5, 5);

  constructor() {
    window.addEventListener("click", this.onMouseClick);
    window.addEventListener("keydown", this.onKeyPress);
  }

  onKeyPress = (ev: KeyboardEvent) => {
    switch (ev.which) {
      case Key.Up:
        this.position.y -= 5;
        break;
      case Key.Down:
        this.position.y += 5;
        break;
      case Key.Left:
        this.position.x -= 5;
        break;
      case Key.Right:
        this.position.x += 5;
        break;
    }
  };

  onMouseClick = () => {
    this.position.x += 5;
    this.position.y += 5;
  };
}
