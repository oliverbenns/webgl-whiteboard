import Dot from './dot';
import Color from './color';
import Vector from './vector';
import Renderer from './renderer';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const dot = new Dot();

const createDotVerts = (dot: Dot) => [
  new Vector(0, 0),
  new Vector(0, dot.scale),
  new Vector(dot.scale, 0),
]

const verts = createDotVerts(dot)

const colors = [
  new Color(100, 100, 255),
  new Color(100, 255, 100),
  new Color(255, 100, 100),
]

const renderer = new Renderer(canvas);

renderer.bufferVertices(verts);
renderer.bufferColors(colors);

renderer.setVerticesAttributePointer();
renderer.setColorsAttributePointer();

(function tick() {
  renderer.render();
  requestAnimationFrame(tick);
})()
