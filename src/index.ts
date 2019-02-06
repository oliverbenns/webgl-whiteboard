import Color from "./color";
import Renderer from "./renderer";
import World from "./world";
import Mouse from "./mouse";
import Keyboard from "./keyboard";
import context from "./context";

const world = new World();

const renderer = new Renderer(context.canvas);

renderer.setVectorsAttributePointer();
renderer.setColorsAttributePointer();

const render = () => renderer.render(world);

Keyboard.subscribe("keypress", render);
Mouse.subscribe("down", render);
Mouse.subscribe("drag", render);
