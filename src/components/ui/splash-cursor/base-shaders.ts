
// Basic vertex shader that creates a fullscreen quad
export const baseVertexShaderSource = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;

  void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Copy shader - simply copies a texture
export const copyShaderSource = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;

  void main () {
      gl_FragColor = texture2D(uTexture, vUv);
  }
`;

// Clear shader - clears a texture with a specific value
export const clearShaderSource = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;

  void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

// Display shader - visualizes the fluid simulation
export const displayShaderSource = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  uniform sampler2D uDithering;
  uniform vec2 ditherScale;
  uniform vec2 texelSize;

  vec3 linearToGamma (vec3 color) {
      color = max(color, vec3(0));
      return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
  }

  void main () {
      vec3 c = texture2D(uTexture, vUv).rgb;
      #ifdef SHADING
          vec3 lc = texture2D(uTexture, vL).rgb;
          vec3 rc = texture2D(uTexture, vR).rgb;
          vec3 tc = texture2D(uTexture, vT).rgb;
          vec3 bc = texture2D(uTexture, vB).rgb;

          float dx = length(rc) - length(lc);
          float dy = length(tc) - length(bc);

          vec3 n = normalize(vec3(dx, dy, length(texelSize)));
          vec3 l = vec3(0.0, 0.0, 1.0);

          float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
          c *= diffuse;
      #endif

      float a = max(c.r, max(c.g, c.b));
      gl_FragColor = vec4(c, a);
  }
`;

// Splat shader - creates fluid "splats" at cursor positions
export const splatShaderSource = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;

  void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
  }
`;

// Advection shader - moves fluid in the direction of the velocity field
export const advectionShaderSource = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;
  uniform float dt;
  uniform float dissipation;

  vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
      vec2 st = uv / tsize - 0.5;
      vec2 iuv = floor(st);
      vec2 fuv = fract(st);

      vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
      vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
      vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
      vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

      return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }

  void main () {
      #ifdef MANUAL_FILTERING
          vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
          vec4 result = bilerp(uSource, coord, dyeTexelSize);
      #else
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          vec4 result = texture2D(uSource, coord);
      #endif
      float decay = 1.0 + dissipation * dt;
      gl_FragColor = result / decay;
  }
`;

// Divergence shader - calculates divergence of velocity field
export const divergenceShaderSource = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;

      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }

      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

// Curl shader - calculates curl (vorticity) of velocity field
export const curlShaderSource = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

// Vorticity shader - applies vorticity confinement to add detailed swirls
export const vorticityShaderSource = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;

  void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;

      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;

      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity += force * dt;
      velocity = min(max(velocity, -1000.0), 1000.0);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// Pressure shader - solves pressure equation
export const pressureShaderSource = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;

  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

// Gradient subtraction shader - subtracts pressure gradient from velocity
export const gradientSubtractShaderSource = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// Adding the missing shaders that are imported in splash-cursor.tsx
export const mainVertexShader = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

export const mainFragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform int u_frame;
  uniform vec2 u_mouse;
  uniform int u_renderpass;
  uniform sampler2D u_texture;
  uniform float u_radius;
  uniform float u_intensity;
  uniform vec3 u_color;
  uniform float u_falloff;
  
  void main() {
    if (u_renderpass == 0) {
      // First pass - initial drawing
      float dist = distance(vec2(u_mouse.x, u_mouse.y), vUv);
      float alpha = smoothstep(u_radius, u_radius * (1.0 - u_falloff), dist);
      gl_FragColor = vec4(u_color, alpha * u_intensity);
    } else {
      // Second pass - composite with previous frame
      vec4 texColor = texture2D(u_texture, vUv);
      gl_FragColor = texColor;
    }
  }
`;

export const hdrFragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_texture;
  
  void main() {
    vec4 color = texture2D(u_texture, vUv);
    // Simple HDR effect
    color = color / (1.0 + color);
    gl_FragColor = color;
  }
`;

export const gaussianBlurXFragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_blur;
  uniform int u_taps;
  
  void main() {
    vec4 color = vec4(0.0);
    float total = 0.0;
    
    float offset = u_blur / u_resolution.x;
    
    for (int i = -15; i <= 15; i++) {
      if (i > u_taps || i < -u_taps) continue;
      float weight = exp(-float(i) * float(i) / (2.0 * u_blur * u_blur));
      color += texture2D(u_texture, vUv + vec2(float(i) * offset, 0.0)) * weight;
      total += weight;
    }
    
    gl_FragColor = color / total;
  }
`;

export const gaussianBlurYFragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_blur;
  uniform int u_taps;
  
  void main() {
    vec4 color = vec4(0.0);
    float total = 0.0;
    
    float offset = u_blur / u_resolution.y;
    
    for (int i = -15; i <= 15; i++) {
      if (i > u_taps || i < -u_taps) continue;
      float weight = exp(-float(i) * float(i) / (2.0 * u_blur * u_blur));
      color += texture2D(u_texture, vUv + vec2(0.0, float(i) * offset)) * weight;
      total += weight;
    }
    
    gl_FragColor = color / total;
  }
`;

export const pingPongVertexShader = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

export const pingPongFragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_ping;
  uniform sampler2D u_pong;
  
  void main() {
    vec4 pingColor = texture2D(u_ping, vUv);
    vec4 pongColor = texture2D(u_pong, vUv);
    
    // Blend current frame with previous frame for persistence effect
    gl_FragColor = mix(pongColor, pingColor, 0.05);
  }
`;
