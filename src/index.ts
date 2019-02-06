import Color from "./color";
import Renderer from "./renderer";
import World from "./world";
import Pointer from "./pointer";
import Keyboard from "./keyboard";
import context from "./context";

const world = new World();

const renderer = new Renderer(context.canvas);

renderer.setVectorsAttributePointer();
renderer.setColorsAttributePointer();

const render = () => renderer.render(world);

Keyboard.subscribe("keypress", render);
Pointer.subscribe("down", render);
Pointer.subscribe("drag", render);
