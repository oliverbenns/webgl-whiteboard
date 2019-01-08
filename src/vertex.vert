#version 300 es

in vec2 a_position;
in vec4 a_color;
uniform vec2 u_resolution;

out vec4 v_color;

void main() {
  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = vec2(zeroToTwo.x - 1.0, 1.0 - zeroToTwo.y);

  gl_Position = vec4(clipSpace, 0, 1);

  v_color = a_color;
}
