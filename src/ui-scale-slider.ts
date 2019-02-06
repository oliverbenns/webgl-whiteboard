import context, { Context } from "./context";
import Emitter from "./emitter";

class UiScaleSlider extends Emitter<number> {
  private element: HTMLInputElement;

  constructor(context: Context) {
    super();

    this.element = this.createSlider();

    context.body.insertBefore(this.element, context.canvas);
  }

  createSlider = () => {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.style.position = "absolute";
    slider.style.top = "10px";
    slider.style.left = "10px";
    slider.min = "0";
    slider.max = "50";
    slider.onchange = this.onSliderChange;

    return slider;
  };

  onSliderChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    const value = parseInt(input.value, 10);

    this.publish("change", value);
  };
}

export default new UiScaleSlider(context);
