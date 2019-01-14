import Dot from "./dot";
import Color from "./color";
import Renderer from "./renderer";
import App from "./app";
import { flatten } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const app = new App();

const renderer = new Renderer({
  app,
  canvas
});

renderer.setVectorsAttributePointer();
renderer.setColorsAttributePointer();

window.addEventListener("keydown", renderer.render);
window.addEventListener("click", renderer.render);
