import Color from "./color";
import Vector from "./vector";
import _program from "./program";
import vertexShaderSource from "./vertex.vert";
import fragmentShaderSource from "./fragment.frag";
import shader from "./shader";
import { flatten } from "./utils";
import Camera from "./camera";
import World from "./world";

export default class Renderer {
  gl: WebGL2RenderingContext; // @TODO: make private
  colorBuffer: WebGLBuffer;
  vectorsBuffer: WebGLBuffer;
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  uniforms: {
    resolution: WebGLUniformLocation | null;
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

    this.uniforms = {
      resolution: gl.getUniformLocation(this.program, "u_resolution")
    };

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  setUniforms(camera: Camera) {
    this.gl.uniform2f(
      this.uniforms.resolution,
      this.gl.canvas.width,
      this.gl.canvas.height
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
  render(world: World) {
    this.gl.clearColor(255, 255, 255, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.setUniforms(world.camera);

    world.camera.render(this);

    const verts = world.dotManager.dots
      .map(dot => dot.mesh.vectors)
      .reduce(flatten, []);

    const colors = world.dotManager.dots
      .map(dot => dot.mesh.colors)
      .reduce(flatten, []);

    const t1 = performance.now();

    this.bufferVectors(verts);
    this.bufferColors(colors);

    const t2 = performance.now();
    console.log("timetaken:", t2 - t1 + "ms");
    world.dotManager.render(this);
  }
}
