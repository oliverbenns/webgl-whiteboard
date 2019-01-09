import Dot from "./dot";
import Color from "./color";
import Vector from "./vector";
import Renderer from "./renderer";
import Whiteboard from "./whiteboard";
import { flatten } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const whiteboard = new Whiteboard();

whiteboard.subscribeToMouse();

const renderer = new Renderer(canvas);

renderer.setVerticesAttributePointer();
renderer.setColorsAttributePointer();

const render = () => {
  const verts = whiteboard.dots
    .map(dot => {
      return [
        new Vector(0, 0),
        new Vector(0, dot.scale),
        new Vector(dot.scale, 0)
      ];
    })
    .reduce(flatten, []);

  const colors = whiteboard.dots
    .map(() => {
      return [
        new Color(100, 100, 255),
        new Color(100, 255, 100),
        new Color(255, 100, 100)
      ];
    })
    .reduce(flatten, []);

  console.log("verts", verts);
  console.log("colors", colors);

  renderer.bufferVertices(verts);
  renderer.bufferColors(colors);

  renderer.render();
};

window.addEventListener("click", render);
