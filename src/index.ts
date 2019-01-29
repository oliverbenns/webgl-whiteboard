import Dot from "./dot";
import Color from "./color";
import Renderer from "./renderer";
import World from "./world";
import Mouse from "./mouse";
import Keyboard from "./keyboard";
import { flatten } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const world = new World();

const renderer = new Renderer(canvas);

renderer.setVectorsAttributePointer();
renderer.setColorsAttributePointer();

const render = () => renderer.render(world)

Keyboard.subscribe("keypress", render);
Mouse.subscribe("click", render);
Mouse.subscribe("drag", render);
