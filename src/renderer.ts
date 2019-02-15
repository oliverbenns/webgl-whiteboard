import Color from "./color";
import Vector from "./vector";
import Camera from "./camera";
import _program from "./program";
import vertexShaderSource from "./vertex.vert";
import fragmentShaderSource from "./fragment.frag";
import Context from "./context";
import shader from "./shader";
import { flatten } from "./utils";
import DotManager from "./dot-manager";

export default class Renderer {
  gl: WebGL2RenderingContext; // @TODO: make private
  colorBuffer: WebGLBuffer;
  vectorsBuffer: WebGLBuffer;
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  vectorBufferData: number[] = [];
  colorBufferData: number[] = [];

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

    if (!gl) {
      throw new Error("WebGL is not supported.");
    }

    const vertexShader = shader.create(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource
    );

    const fragmentShader = shader.create(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) {
      throw new Error("Error creating shaders");
    }

    const program = _program.create(gl, vertexShader, fragmentShader);

    if (!program) {
      throw new Error("Error creating WebGL program.");
    }

    gl.useProgram(program);

    this.gl = gl;

    const colorBuffer = gl.createBuffer();
    const vectorsBuffer = gl.createBuffer();

    if (!colorBuffer || !vectorsBuffer) {
      throw new Error("Error creating WebGL buffers");
    }

    this.colorBuffer = colorBuffer;
    this.vectorsBuffer = vectorsBuffer;
    this.program = program;

    const vao = gl.createVertexArray();

    if (!vao) {
      throw new Error("Error creating vertex array");
    }
    this.vao = vao;
    gl.bindVertexArray(this.vao);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  setVectorsAttributePointer() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vectorsBuffer);
    const positionAttribute = this.gl.getAttribLocation(
      this.program,
      "a_position"
    );
    this.gl.enableVertexAttribArray(positionAttribute);

    // @TODO: It seems if we normalise these values, the data
    // remains unchanged - why? Due to float?
    this.gl.vertexAttribPointer(
      positionAttribute,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }

  setColorsAttributePointer() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    const colorAttribute = this.gl.getAttribLocation(this.program, "a_color");

    this.gl.enableVertexAttribArray(colorAttribute);
    this.gl.vertexAttribPointer(
      colorAttribute,
      4,
      this.gl.UNSIGNED_BYTE,
      true,
      0,
      0
    );
  }

  bufferColors(colors: number[]) {
    const colorCountToAdd = colors.length - this.colorBufferData.length;
    let offset = colors.length - colorCountToAdd;

    while (offset < colors.length) {
      const num = colors[offset];
      this.colorBufferData.push(num);

      offset++;
    }

    const data = new Uint8Array(this.colorBufferData);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
  }

  bufferVectors(vectors: number[]) {
    const vectorCountToAdd = vectors.length - this.vectorBufferData.length;
    let offset = vectors.length - vectorCountToAdd;

    while (offset < vectors.length) {
      const num = vectors[offset];
      this.vectorBufferData.push(num);

      offset++;
    }

    const bufferData = new Float32Array(this.vectorBufferData);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vectorsBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, bufferData, this.gl.STATIC_DRAW);
  }

  // @TODO: add vao and transform uniform as class member.
  render = () => {
    this.gl.clearColor(255, 255, 255, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    Context.render(this);

    Camera.render(this);
    const t1 = performance.now();

    const verts: number[] = [];
    const colors: number[] = [];

    DotManager.dots.forEach(dot => {
      dot.mesh.colors.forEach(c => colors.push(c));
      dot.mesh.vectors.forEach(v => verts.push(v));
    });

    console.log("colors", colors);
    console.log("verts", verts);
    const t2 = performance.now();

    console.log("timetaken:::", t2 - t1 + "ms");

    this.bufferVectors(verts);
    this.bufferColors(colors);

    DotManager.render(this);
  };
}
