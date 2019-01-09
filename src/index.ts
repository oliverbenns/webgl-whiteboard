import Dot from "./dot";
import Color from "./color";
import Vector from "./vector";
import Renderer from "./renderer";
import App from "./app";
import { flatten } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const app = new App();

const renderer = new Renderer(canvas);

renderer.setVectorsAttributePointer();
renderer.setColorsAttributePointer();

const render = () => {
  const verts = app.whiteboard.dots
    .map(dot => dot.createVectors())
    .reduce(flatten, []);

  const colors = app.whiteboard.dots
    .map(dot => dot.createColors())
    .reduce(flatten, []);

  console.log("verts", verts);
  console.log("colors", colors);

  renderer.bufferVectors(verts);
  renderer.bufferColors(colors);

  renderer.render();
};

window.addEventListener("click", render);
