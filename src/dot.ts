import CircleMesh from "./circle-mesh";
import Renderer from "./renderer";
import Vector from "./vector";
import UiColorPicker from "./ui-color-picker";
import UiScaleSlider from "./ui-scale-slider";

class Dot {
  mesh: CircleMesh;
  position: Vector;
  scale: Vector;
  positionUniform: WebGLUniformLocation | null;
  scaleUniform: WebGLUniformLocation | null;

  constructor(position: Vector) {
    this.scale = new Vector(UiScaleSlider.value, UiScaleSlider.value);
    this.mesh = new CircleMesh({
      color: UiColorPicker.value,
      polyCount: 64
    });
    this.position = position;
    this.positionUniform = null;
    this.scaleUniform = null;
  }

  render(renderer: Renderer, index: number) {
    if (this.positionUniform === null) {
      this.positionUniform = renderer.gl.getUniformLocation(
        renderer.program,
        "u_position"
      );
    }

    if (this.scaleUniform === null) {
      this.scaleUniform = renderer.gl.getUniformLocation(
        renderer.program,
        "u_scale"
      );
    }
    renderer.gl.uniform2f(
      this.positionUniform,
      this.position.x,
      this.position.y
    );

    renderer.gl.uniform2f(this.scaleUniform, this.scale.x, this.scale.y);

    const primitiveType = renderer.gl.TRIANGLES;
    // @NOTE: If we ever have scene entities of different vertex lengths,
    // we will need to keep track of the offset. Either in a var or using a
    // .reduce instead of .forEach?
    const offset = index * this.mesh.vectors.length;
    const count = this.mesh.vectors.length;
    renderer.gl.drawArrays(primitiveType, offset, count);

    this.mesh.buffered = true;
  }
}

export default Dot;
