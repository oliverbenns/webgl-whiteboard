import Color from "./color";
import Dot from "./dot";
import Vector from "./vector";

export default class Whiteboard {
  public dots: Dot[] = [];

  constructor() {
    window.addEventListener("click", this.onMouseClick);
  }

  onMouseClick = (ev: MouseEvent) => {
    const position = new Vector(ev.screenX, ev.screenY);
    const color = new Color(0, 0, 0);

    const dot = new Dot({ color, position });

    this.addDot(dot);
  };

  addDot(dot: Dot) {
    this.dots.push(dot);
    console.log("this.dots", this.dots);
  }
}
