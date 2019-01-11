import Color from "./color";
import Dot from "./dot";
import Vector from "./vector";

export default class Whiteboard {
  public dots: Dot[] = [];

  constructor() {
    window.addEventListener("click", this.onMouseClick);
  }

  onMouseClick = ev => {
    // console.log(ev.screenX, ev.screenY);
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    console.log("r", r);

    const color = new Color(r, g, b);
    const position = new Vector(ev.screenX, ev.screenY);

    const dot = new Dot({ color, position });

    this.addDot(dot);
  };

  addDot(dot: Dot) {
    this.dots.push(dot);
    console.log("this.dots", this.dots);
  }
}
