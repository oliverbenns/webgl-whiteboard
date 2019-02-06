import Color from "./color";
import Renderer from "./renderer";
import World from "./world";
import Pointer from "./pointer";
import context from "./context";

const world = new World();

const renderer = new Renderer(context.canvas);

renderer.setVectorsAttributePointer();
renderer.setColorsAttributePointer();

const render = () => renderer.render(world);

Pointer.subscribe("down", render);
Pointer.subscribe("drag", render);
