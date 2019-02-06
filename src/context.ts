export interface Context {
  body: HTMLElement;
  canvas: HTMLCanvasElement;
}

const context: Context = {
  body: document.querySelector("body")!,
  canvas: document.querySelector("canvas")!
};

context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

export default context;
