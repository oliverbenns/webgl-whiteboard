import context, { Context } from "./context";
import Emitter from "./emitter";

interface UiScaleSliderOptions {
  min: number;
  max: number;
}
class UiScaleSlider {
  public value: number;
  private element: HTMLInputElement;
  private min: number;
  private max: number;

  constructor(context: Context, opts: UiScaleSliderOptions) {
    this.min = opts.min;
    this.max = opts.max;
    this.value = (opts.min + opts.max) / 2;

    this.element = this.createSlider();

    context.body.insertBefore(this.element, context.canvas);
  }

  createSlider = () => {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.style.position = "absolute";
    slider.style.top = "10px";
    slider.style.left = "10px";
    slider.min = this.min.toString();
    slider.max = this.max.toString();
    slider.value = this.value.toString();
    slider.onchange = this.onSliderChange;

    return slider;
  };

  onSliderChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    this.value = parseInt(input.value, 10);
  };
}

export default new UiScaleSlider(context, {
  min: 10,
  max: 50
});
