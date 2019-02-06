import Color from "./color";

const colors = [
  new Color(0, 0, 0),
  new Color(255, 0, 0),
  new Color(0, 255, 0),
  new Color(0, 0, 255)
];

class Ui {
  private scaleInput: HTMLInputElement;
  private buttons: HTMLButtonElement[];

  constructor(canvas: HTMLCanvasElement) {
    const body = document.querySelector("body")!;
    this.scaleInput = document.createElement("input");
    this.scaleInput.type = "range";
    this.scaleInput.style.position = "absolute";
    this.scaleInput.style.top = "10px";
    this.scaleInput.style.left = "10px";
    body.insertBefore(this.scaleInput, canvas);

    this.buttons = colors.map(this.createButton);

    this.buttons.forEach(button => body.insertBefore(button, canvas));
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

    console.log("button.value", button.value);
  };
}

export default Ui;
