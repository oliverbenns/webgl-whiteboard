import Vector from "./vector";
import Keyboard, { Key } from "./keyboard";
import Pointer, { PointerEvent } from "./pointer";
import Renderer from './renderer';

export default class Camera {
  public position = new Vector(0, 0);
  public dragMode = false;
  private uniform: WebGLUniformLocation | null;

  constructor() {
    Keyboard.subscribe("keyDown", this.onKeyDown);
    Keyboard.subscribe("keyUp", this.onKeyUp);
    Pointer.subscribe("drag", this.onPointerDrag);
    this.uniform = null
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

  render(renderer: Renderer) {
    if (this.uniform === null) {
      this.uniform = renderer.gl.getUniformLocation(renderer.program, "u_camera_position")
    }

    renderer.gl.uniform2f(
      this.uniform,
      this.position.x,
      this.position.y
    );
  }
}
