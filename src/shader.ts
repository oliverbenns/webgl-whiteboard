const create = (gl: WebGLRenderingContext, type: GLenum, source: string) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!success) {
    const log = gl.getShaderInfoLog(shader);
    console.error(log);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export default {
  create,
};
