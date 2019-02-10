import Renderer from "renderer";

export class Context {
  body = document.querySelector("body")!;
  canvas = document.querySelector("canvas")!;
  uniform: WebGLUniformLocation | null = null;

  constructor() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  render(renderer: Renderer) {
    if (this.uniform === null) {
      this.uniform = renderer.gl.getUniformLocation(
        renderer.program,
        "u_resolution"
      );
    }

    renderer.gl.uniform2f(
      this.uniform,
      renderer.gl.canvas.width,
      renderer.gl.canvas.height
    );
  }
}

export default new Context();
