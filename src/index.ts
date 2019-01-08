import Dot from "./dot";
import Color from "./color";
import Vector from "./vector";
import Renderer from "./renderer";
import Whiteboard from "./whiteboard";
import { flatten } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dot = new Dot();

// const createDotVerts = (dot: Dot) => [
//   new Vector(0, 0),
//   new Vector(0, dot.scale),
//   new Vector(dot.scale, 0)
// ];

// const verts = createDotVerts(dot);

// const colors = [
//   new Color(100, 100, 255),
//   new Color(100, 255, 100),
//   new Color(255, 100, 100)
// ];

const whiteboard = new Whiteboard();

whiteboard.addDot(new Dot());

// whiteboard.addDot(dot);

// const data = whiteboard.dots.map(dot => ({
//   colors: [
//     new Color(100, 100, 255),
//     new Color(100, 255, 100),
//     new Color(255, 100, 100)
//   ],
//   verts: [
//     new Vector(0, 0),
//     new Vector(0, dot.scale),
//     new Vector(dot.scale, 0)
//   ]
// }))

const verts = whiteboard.dots
  .map(dot => {
    return [
      new Vector(0, 0),
      new Vector(0, dot.scale),
      new Vector(dot.scale, 0)
    ];
  })
  .reduce(flatten, []);
console.log("verts", verts);

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

whiteboard.subscribeToMouse();

const renderer = new Renderer(canvas);

renderer.bufferVertices(verts);
renderer.bufferColors(colors);

renderer.setVerticesAttributePointer();
renderer.setColorsAttributePointer();

(function tick() {
  renderer.render();
  requestAnimationFrame(tick);
})();
