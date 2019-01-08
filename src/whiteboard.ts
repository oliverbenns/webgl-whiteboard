import Dot from "./dot";
import Vector from "./vector";

export default class Whiteboard {
  public dots: Dot[] = [];

  subscribeToMouse() {
    window.addEventListener("click", this.onMouseClick);
  }

  onMouseClick = ev => {
    console.log(ev.screenX, ev.screenY);

    const dot = new Dot({
      position: new Vector(ev.screenX, ev.screenY)
    });

    this.addDot(dot);
  };

  addDot(dot: Dot) {
    this.dots.push(dot);
    console.log("this.dots", this.dots);
  }
}
