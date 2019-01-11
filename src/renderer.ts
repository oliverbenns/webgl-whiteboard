import Color from "./color";
import Vector from "./vector";
import _program from "./program";
import vertexShaderSource from "./vertex.vert";
import fragmentShaderSource from "./fragment.frag";
import shader from "./shader";
import { flatten } from "./utils";
import App from "./app";

interface RendererOptions {
  app: App;
  canvas: HTMLCanvasElement;
}

export default class Renderer {
  app: App;
  gl: WebGL2RenderingContext; // @TODO: make private
  colorBuffer: WebGLBuffer;
  vectorsBuffer: WebGLBuffer;
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  uniforms: {
    transform: WebGLUniformLocation;
    resolution: WebGLUniformLocation;
    cameraPosition: WebGLUniformLocation;
  };

  constructor(options: RendererOptions) {
    const gl = options.canvas.getContext("webgl2") as WebGL2RenderingContext;

    if (!gl) {
      throw new Error("WebGL is not supported.");
    }

    this.app = options.app;

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
    this.colorBuffer = gl.createBuffer();
    this.vectorsBuffer = gl.createBuffer();
    this.program = program;
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.uniforms = {
      transform: gl.getUniformLocation(this.program, "u_transform"),
      resolution: gl.getUniformLocation(this.program, "u_resolution"),
      cameraPosition: gl.getUniformLocation(this.program, "u_camera_position")
    };

    this.setUniforms();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  setUniforms() {
    this.gl.uniform2f(
      this.uniforms.resolution,
      this.gl.canvas.width,
      this.gl.canvas.height
    );

    this.gl.uniform2f(
      this.uniforms.cameraPosition,
      this.app.camera.position.x,
      this.app.camera.position.y
    );
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

  bufferColors(colors: Color[]) {
    const colorData = colors.map(c => c.toArray()).reduce(flatten, []); // @TODO flatten deep?
    const data = new Uint8Array(colorData);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
  }

  bufferVectors(vectors: Vector[]) {
    const vectorData = vectors.map(v => v.toArray()).reduce(flatten, []);
    const data = new Float32Array(vectorData);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vectorsBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
  }

  // @TODO: add vao and transform uniform as class member.
  render = () => {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.setUniforms();

    const verts = this.app.whiteboard.dots
      .map(dot => dot.body.vectors)
      .reduce(flatten, []);

    // const a = this.app.whiteboard.dots.map(dot => dot.body.colors);
    console.log("this.app.whiteboard.dots", this.app.whiteboard.dots);

    const colors = this.app.whiteboard.dots
      .map(dot => dot.body.colors)
      .reduce(flatten, []);

    this.bufferVectors(verts);
    this.bufferColors(colors);

    const primitiveType = this.gl.TRIANGLES;
    // @NOTE: If we ever have scene entities of different vertex lengths,
    // we will need to keep track of the offset. Either in a var or using a
    // .reduce instead of .forEach?
    // const offset = index * entity.geometry.vertices.length;
    // const count = entity.geometry.vertices.length;
    const offset = 0;
    const count = 3;
    this.gl.drawArrays(primitiveType, offset, count);
  };
}
