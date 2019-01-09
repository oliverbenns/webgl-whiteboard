import Dot from "./dot";
import Vector from "./vector";

export default class Camera {
  public position = new Vector(5, 5);

  constructor() {
    window.addEventListener("click", this.onMouseClick);
  }

  onMouseClick = ev => {
    this.position.x += 5;
    this.position.y += 5;
  };
}
