import Color from "./color";
import Vector from "./vector";
import _program from "./program";
import vertexShaderSource from "./vertex.vert";
import fragmentShaderSource from "./fragment.frag";
import shader from "./shader";
import { flatten } from "./utils";

console.log("vertexShaderSource", vertexShaderSource);
console.log("fragmentShaderSource", fragmentShaderSource);

export default class Renderer {
  gl: WebGL2RenderingContext; // @TODO: make private
  colorsBuffer: WebGLBuffer;
  verticesBuffer: WebGLBuffer;
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  uniforms: {
    transform: WebGLUniformLocation;
    resolution: WebGLUniformLocation;
  };

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

    const program = _program.create(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    this.gl = gl;
    this.colorsBuffer = gl.createBuffer();
    this.verticesBuffer = gl.createBuffer();
    this.program = program;
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.uniforms = {
      transform: gl.getUniformLocation(this.program, "u_transform"),
      resolution: gl.getUniformLocation(this.program, "u_resolution")
    };

    gl.uniform2f(this.uniforms.resolution, gl.canvas.width, gl.canvas.height);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  setVerticesAttributePointer() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer);
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
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorsBuffer);
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

  bufferColors(colors: Color[]) {
    const _colors = colors.map(c => c.toArray()).reduce(flatten, []); // @TODO flatten deep?

    const data = new Uint8Array(_colors);
    console.log("color data", data);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorsBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
  }

  bufferVertices(vectors: Vector[]) {
    const vertices = vectors.map(v => v.toArray()).reduce(flatten, []);

    const data = new Float32Array(vertices);
    console.log("vertices data", data);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
  }

  // @TODO: add vao and transform uniform as class member.
  render() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    const primitiveType = this.gl.TRIANGLES;
    // @NOTE: If we ever have scene entities of different vertex lengths,
    // we will need to keep track of the offset. Either in a var or using a
    // .reduce instead of .forEach?
    // const offset = index * entity.geometry.vertices.length;
    // const count = entity.geometry.vertices.length;
    const offset = 0;
    const count = 3;
    this.gl.drawArrays(primitiveType, offset, count);

    // scene.entities.forEach((e, i) => this.renderEntity(e, i))
  }
}
