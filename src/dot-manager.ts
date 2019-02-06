import Color from "./color";
import Entity from "./entity";
import CircleMesh from "./circle-mesh";
import Vector from "./vector";
import Camera from "./camera";

import Mouse, { _MouseEvent } from "./mouse";
import UiColorPicker from "./ui-color-picker";
import UiScaleSlider from "./ui-scale-slider";

// @TODO: We have a camera already, don't create a new one!
const camera = new Camera();

export default class DotManager {
  public dots: Entity[] = [];

  private selectedColor = new Color(0, 0, 0);
  private selectedScale = new Vector(32, 32);

  constructor() {
    Mouse.subscribe("down", this.onMouseEvent);
    Mouse.subscribe("drag", this.onMouseEvent);
    UiColorPicker.subscribe("change", this.onColorChange);
    UiScaleSlider.subscribe("change", this.onScaleChange);
  }

  onMouseEvent = (ev: _MouseEvent) => {
    if (camera.dragMode) {
      return;
    }
    const position = this.screenToWorldPosition(ev.target);

    const dot = this.createDot(position);

    this.dots.push(dot);
  };

  createDot = (position: Vector): Entity => {
    const scale = this.selectedScale;
    const mesh = new CircleMesh({
      color: this.selectedColor,
      polyCount: 64
    });

    return { scale, position, mesh };
  };

  onColorChange = (color: Color) => {
    this.selectedColor = color;
  };

  onScaleChange = (scale: number) => {
    this.selectedScale = new Vector(scale, scale);
  };

  screenToWorldPosition(position: Vector) {
    const x = position.x - camera.position.x;
    const y = position.y - camera.position.y;

    return new Vector(x, y);
  }
}
