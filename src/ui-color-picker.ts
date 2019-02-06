import context, { Context } from "./context";
import Color from "./color";
import Emitter from "./emitter";

class UiColorPicker extends Emitter<Color> {
  private buttons: HTMLButtonElement[];

  constructor(context: Context, colors: Color[]) {
    super();

    this.buttons = colors.map(this.createButton);

    this.buttons.forEach(button =>
      context.body.insertBefore(button, context.canvas)
    );
  }

  createButton = (color: Color, index: number) => {
    const button = document.createElement("button");
    button.value = color.toArray().toString();
    button.style.position = "absolute";
    button.style.width = "20px";
    button.style.height = "20px";
    button.style.padding = "0";
    button.style.top = "10px";
    button.style.background = `rgba(${color.toArray().toString()})`;
    button.style.border = "0px";
    button.style.left = `${200 + index * 30}px`;
    button.onclick = this.onButtonClick;

    return button;
  };

  onButtonClick = (ev: MouseEvent) => {
    const button = ev.target as HTMLButtonElement;
    const args = button.value.split(",").map(v => parseInt(v, 10));
    const color = new Color(...args);

    this.publish("change", color);
  };
}

export default new UiColorPicker(context, [
  new Color(0, 0, 0),
  new Color(255, 0, 0),
  new Color(0, 255, 0),
  new Color(0, 0, 255)
]);
