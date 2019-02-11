import Color from "./color";
import Renderer from "./renderer";
import Pointer from "./pointer";
import context from "./context";

const renderer = new Renderer(context.canvas);

renderer.setVectorsAttributePointer();
renderer.setColorsAttributePointer();

Pointer.subscribe("down", renderer.render);
Pointer.subscribe("drag", renderer.render);
