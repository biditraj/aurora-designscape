
'use client';
import { useEffect, useRef } from 'react';

function SplashCursor({
  // You can customize these props if you want
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function pointerPrototype() {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [0, 0, 0];
    }

    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    let pointers = [new pointerPrototype()];

    // Get WebGL context
    const getWebGLContext = (canvas: HTMLCanvasElement) => {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      
      // Try WebGL2 first
      let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
      const isWebGL2 = !!gl;
      
      // Fall back to WebGL1 if needed
      if (!isWebGL2) {
        gl = (canvas.getContext('webgl', params) || 
              canvas.getContext('experimental-webgl', params)) as WebGLRenderingContext | null;
      }
      
      if (!gl) {
        console.error('WebGL not supported');
        return { gl: null, ext: null };
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      let halfFloat: any;
      let supportLinearFiltering: any;
      
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = (gl as WebGLRenderingContext).getExtension('OES_texture_half_float');
        supportLinearFiltering = (gl as WebGLRenderingContext).getExtension('OES_texture_half_float_linear');
      }

      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : halfFloat?.HALF_FLOAT_OES;

      let formatRGBA;
      let formatRG;
      let formatR;

      if (isWebGL2) {
        const gl2 = gl as WebGL2RenderingContext;
        formatRGBA = getSupportedFormat(gl, gl2.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl2.RG16F, gl2.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl2.R16F, gl2.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    };

    function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if (gl instanceof WebGL2RenderingContext) {
          switch (internalFormat) {
            case gl.R16F:
              return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
            case gl.RG16F:
              return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
            default:
              return null;
          }
        } else {
          return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    // Helper function for string hashing
    function hashCode(s: string) {
      if (s.length === 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    // Material class for shader programs
    class Material {
      vertexShader: string | WebGLShader;
      fragmentShaderSource: string;
      programs: Map<number, WebGLProgram>;
      activeProgram: WebGLProgram | null;
      uniforms: Map<string, WebGLUniformLocation>;

      constructor(vertexShader: string | WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = new Map();
        this.activeProgram = null;
        this.uniforms = new Map();
      }

      setKeywords(keywords: string[]) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) {
          hash += hashCode(keywords[i]);
        }

        let program = this.programs.get(hash);
        if (program == null) {
          let fragmentShader = compileShader(
            gl.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs.set(hash, program);
        }

        if (program === this.activeProgram) return;

        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() {
        gl.useProgram(this.activeProgram);
      }
    }

    // Program creation and compilation
    function createProgram(vertexShader: string | WebGLShader, fragmentShader: string | WebGLShader) {
      let program = gl.createProgram();
      if (!program) throw new Error("Unable to create program");

      let vertexShaderId = typeof vertexShader === 'string' 
        ? compileShader(gl.VERTEX_SHADER, vertexShader)
        : vertexShader;
        
      let fragmentShaderId = typeof fragmentShader === 'string'
        ? compileShader(gl.FRAGMENT_SHADER, fragmentShader)
        : fragmentShader;

      gl.attachShader(program, vertexShaderId);
      gl.attachShader(program, fragmentShaderId);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        throw new Error("Program link failed");
      }

      return program;
    }

    function getUniforms(program: WebGLProgram) {
      let uniforms = new Map();
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformInfo = gl.getActiveUniform(program, i);
        if (!uniformInfo) continue;
        let uniformName = uniformInfo.name;
        let uniformLocation = gl.getUniformLocation(program, uniformName);
        uniforms.set(uniformName, uniformLocation);
      }
      return uniforms;
    }

    function compileShader(type: number, source: string, keywords?: string[]) {
      if (keywords) {
        let keywordsString = '';
        keywords.forEach(keyword => {
          keywordsString += '#define ' + keyword + '\n';
        });
        source = keywordsString + source;
      }

      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create shader");

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        throw new Error("Shader compilation failed");
      }

      return shader;
    }

    // Shader sources
    const baseVertexShader = `
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

    const blurVertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          float offset = 1.33333333;
          vL = vUv - texelSize * offset;
          vR = vUv + texelSize * offset;
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const blurShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform sampler2D uTexture;
      void main () {
          vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
          sum += texture2D(uTexture, vL) * 0.35294117;
          sum += texture2D(uTexture, vR) * 0.35294117;
          gl_FragColor = sum;
      }
    `;

    const copyShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `;

    const clearShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `;

    const colorShader = `
      precision mediump float;
      uniform vec4 color;
      void main () {
          gl_FragColor = color;
      }
    `;

    const checkerboardShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float aspectRatio;
      #define SCALE 25.0
      void main () {
          vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
          float v = mod(uv.x + uv.y, 2.0);
          v = v * 0.1 + 0.8;
          gl_FragColor = vec4(vec3(v), 1.0);
      }
    `;

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uBloom;
      uniform sampler2D uSunrays;
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
      #ifdef BLOOM
          vec3 bloom = texture2D(uBloom, vUv).rgb;
          float noise = texture2D(uDithering, vUv * ditherScale).r;
          noise = noise * 2.0 - 1.0;
          bloom += noise / 255.0;
          bloom = linearToGamma(bloom);
          c += bloom;
      #endif
      #ifdef SUNRAYS
          float sunrays = texture2D(uSunrays, vUv).r;
          c *= sunrays;
      #endif
          gl_FragColor = vec4(c, 1.0);
      }
    `;

    const bloomPrefilterShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec3 curve;
      uniform float threshold;
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          float br = max(c.r, max(c.g, c.b));
          float rq = clamp(br - curve.x, 0.0, curve.y);
          rq = curve.z * rq * rq;
          c *= max(rq, br - threshold) / max(br, 0.0001);
          gl_FragColor = vec4(c, 0.0);
      }
    `;

    const bloomBlurShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      void main () {
          vec4 sum = vec4(0.0);
          sum += texture2D(uTexture, vL);
          sum += texture2D(uTexture, vR);
          sum += texture2D(uTexture, vT);
          sum += texture2D(uTexture, vB);
          sum *= 0.25;
          gl_FragColor = sum;
      }
    `;

    const bloomFinalShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform float intensity;
      void main () {
          vec4 sum = vec4(0.0);
          sum += texture2D(uTexture, vL);
          sum += texture2D(uTexture, vR);
          sum += texture2D(uTexture, vT);
          sum += texture2D(uTexture, vB);
          sum *= 0.25;
          gl_FragColor = sum * intensity;
      }
    `;

    const sunraysMaskShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          vec4 c = texture2D(uTexture, vUv);
          float br = max(c.r, max(c.g, c.b));
          c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
          gl_FragColor = c;
      }
    `;

    const sunraysShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float weight;
      #define ITERATIONS 16
      void main () {
          float Density = 0.3;
          float Decay = 0.95;
          float Exposure = 0.7;
          vec2 coord = vUv;
          vec2 dir = vUv - 0.5;
          dir *= 1.0 / float(ITERATIONS) * Density;
          float illuminationDecay = 1.0;
          float color = texture2D(uTexture, vUv).a;
          for (int i = 0; i < ITERATIONS; i++) {
              coord -= dir;
              float col = texture2D(uTexture, coord).a;
              color += col * illuminationDecay * weight;
              illuminationDecay *= Decay;
          }
          gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
      }
    `;

    const splatShader = `
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

    const advectionShader = `
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
      }`;

    const divergenceShader = `
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

    const curlShader = `
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

    const vorticityShader = `
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

    const pressureShader = `
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

    const gradientSubtractShader = `
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

    // FBO creation and management
    class FBO {
      texture: WebGLTexture;
      fbo: WebGLFramebuffer;
      width: number;
      height: number;
      texelSizeX: number;
      texelSizeY: number;
      attach: number;
      format: any;
      param: any;

      constructor(width: number, height: number, texelSizeX: number, texelSizeY: number, format: any, param: any) {
        this.width = width;
        this.height = height;
        this.texelSizeX = texelSizeX;
        this.texelSizeY = texelSizeY;
        this.attach = (gl as WebGL2RenderingContext).COLOR_ATTACHMENT0;
        this.format = format;
        this.param = param;

        this.texture = gl.createTexture() as WebGLTexture;
        this.fbo = gl.createFramebuffer() as WebGLFramebuffer;

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, format.internalFormat, width, height, 0, format.format, gl.FLOAT, null);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, this.attach, gl.TEXTURE_2D, this.texture, 0);
      }
    }

    function createFBO(width: number, height: number, texelSizeX: number, texelSizeY: number, format: any, param: any) {
      return new FBO(width, height, texelSizeX, texelSizeY, format, param);
    }

    function resizeFBO(target: FBO, width: number, height: number, texelSizeX: number, texelSizeY: number, format: any, param: any) {
      target.width = width;
      target.height = height;
      target.texelSizeX = texelSizeX;
      target.texelSizeY = texelSizeY;

      gl.bindTexture(gl.TEXTURE_2D, target.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, format.internalFormat, width, height, 0, format.format, gl.FLOAT, null);
    }

    const { gl: webgl, ext } = getWebGLContext(canvas);
    if (!webgl || !ext) return;
    
    const gl = webgl;

    // Create materials with shaders
    const blurProgram = new Material(blurVertexShader, blurShader);
    const copyProgram = new Material(baseVertexShader, copyShader);
    const clearProgram = new Material(baseVertexShader, clearShader);
    const colorProgram = new Material(baseVertexShader, colorShader);
    const checkerboardProgram = new Material(baseVertexShader, checkerboardShader);
    const displayProgram = new Material(baseVertexShader, displayShaderSource);
    const displayMaterial = displayProgram;
    const splatProgram = new Material(baseVertexShader, splatShader);
    const advectionProgram = new Material(baseVertexShader, advectionShader);
    const divergenceProgram = new Material(baseVertexShader, divergenceShader);
    const curlProgram = new Material(baseVertexShader, curlShader);
    const vorticityProgram = new Material(baseVertexShader, vorticityShader);
    const pressureProgram = new Material(baseVertexShader, pressureShader);
    const gradientSubtractProgram = new Material(baseVertexShader, gradientSubtractShader);

    // Set up display material with shading
    displayMaterial.setKeywords(['SHADING']);

    // Create vertex buffer for rendering
    const blitFn = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (destination: WebGLFramebuffer | null) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    // Create FBOs for simulation
    let simWidth = config.SIM_RESOLUTION;
    let simHeight = config.SIM_RESOLUTION;
    let dyeWidth = config.DYE_RESOLUTION;
    let dyeHeight = config.DYE_RESOLUTION;

    let density = createDoubleFBO(
      dyeWidth,
      dyeHeight,
      ext.formatRGBA.internalFormat,
      ext.formatRGBA.format,
      ext.halfFloatTexType,
      gl.NEAREST
    );

    let velocity = createDoubleFBO(
      simWidth,
      simHeight,
      ext.formatRG.internalFormat,
      ext.formatRG.format,
      ext.halfFloatTexType,
      gl.NEAREST
    );

    let divergence = createFBO(
      simWidth,
      simHeight,
      ext.formatR.internalFormat,
      ext.formatR.format,
      ext.halfFloatTexType,
      gl.NEAREST
    );

    let curl = createFBO(
      simWidth,
      simHeight,
      ext.formatR.internalFormat,
      ext.formatR.format,
      ext.halfFloatTexType,
      gl.NEAREST
    );

    let pressure = createDoubleFBO(
      simWidth,
      simHeight,
      ext.formatR.internalFormat,
      ext.formatR.format,
      ext.halfFloatTexType,
      gl.NEAREST
    );

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      let fbo1 = createFBO(w, h, 1.0 / w, 1.0 / h, { internalFormat, format }, param);
      let fbo2 = createFBO(w, h, 1.0 / w, 1.0 / h, { internalFormat, format }, param);

      return {
        width: w,
        height: h,
        texelSizeX: 1.0 / w,
        texelSizeY: 1.0 / h,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    // Function to wrap values between min and max
    function wrap(value: number, min: number, max: number) {
      const range = max - min;
      return min + ((value - min) % range + range) % range;
    }

    // Resize canvas and FBOs
    function resizeCanvas() {
      if (
        canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight
      ) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        initFramebuffers();
      }
    }

    function initFramebuffers() {
      let simRes = getResolution(config.SIM_RESOLUTION);
      let dyeRes = getResolution(config.DYE_RESOLUTION);

      simWidth = simRes.width;
      simHeight = simRes.height;
      dyeWidth = dyeRes.width;
      dyeHeight = dyeRes.height;

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;

      if (density == null) {
        density = createDoubleFBO(
          dyeWidth,
          dyeHeight,
          rgba.internalFormat,
          rgba.format,
          texType,
          gl.NEAREST
        );
      } else {
        density.read = createFBO(
          dyeWidth,
          dyeHeight,
          1.0 / dyeWidth,
          1.0 / dyeHeight,
          rgba,
          gl.NEAREST
        );
        density.write = createFBO(
          dyeWidth,
          dyeHeight,
          1.0 / dyeWidth,
          1.0 / dyeHeight,
          rgba,
          gl.NEAREST
        );
      }

      if (velocity == null) {
        velocity = createDoubleFBO(
          simWidth,
          simHeight,
          rg.internalFormat,
          rg.format,
          texType,
          gl.NEAREST
        );
      } else {
        velocity.read = createFBO(
          simWidth,
          simHeight,
          1.0 / simWidth,
          1.0 / simHeight,
          rg,
          gl.NEAREST
        );
        velocity.write = createFBO(
          simWidth,
          simHeight,
          1.0 / simWidth,
          1.0 / simHeight,
          rg,
          gl.NEAREST
        );
      }

      divergence = createFBO(
        simWidth,
        simHeight,
        1.0 / simWidth,
        1.0 / simHeight,
        r,
        gl.NEAREST
      );
      curl = createFBO(
        simWidth,
        simHeight,
        1.0 / simWidth,
        1.0 / simHeight,
        r,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        simWidth,
        simHeight,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
    }

    function getResolution(resolution: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      let min = Math.round(resolution);
      let max = Math.round(resolution * aspectRatio);

      if (canvas.width > canvas.height) {
        return { width: max, height: min };
      } else {
        return { width: min, height: max };
      }
    }

    // Simulation and rendering functions
    function update() {
      resizeCanvas();
      input();
      if (!config.PAUSED) {
        step(0.016);
      }
      render();
      requestAnimationFrame(update);
    }

    function input() {
      if (pointers[0].moved) {
        pointers[0].moved = false;
        splatPointer(pointers[0]);
      }
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, simWidth, simHeight);

      curlProgram.bind();
      gl.uniform2f(
        curlProgram.uniforms.get('texelSize'),
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(curlProgram.uniforms.get('uVelocity'), velocity.read.attach);
      blitFn(curl.fbo);

      vorticityProgram.bind();
      gl.uniform2f(
        vorticityProgram.uniforms.get('texelSize'),
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        vorticityProgram.uniforms.get('uVelocity'),
        velocity.read.attach
      );
      gl.uniform1i(vorticityProgram.uniforms.get('uCurl'), curl.attach);
      gl.uniform1f(vorticityProgram.uniforms.get('curl'), config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.get('dt'), dt);
      blitFn(velocity.write.fbo);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        divergenceProgram.uniforms.get('texelSize'),
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        divergenceProgram.uniforms.get('uVelocity'),
        velocity.read.attach
      );
      blitFn(divergence.fbo);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.get('uTexture'), pressure.read.attach);
      gl.uniform1f(clearProgram.uniforms.get('value'), config.PRESSURE);
      blitFn(pressure.write.fbo);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(
        pressureProgram.uniforms.get('texelSize'),
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        pressureProgram.uniforms.get('uDivergence'),
        divergence.attach
      );
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(
          pressureProgram.uniforms.get('uPressure'),
          pressure.read.attach
        );
        blitFn(pressure.write.fbo);
        pressure.swap();
      }

      gradientSubtractProgram.bind();
      gl.uniform2f(
        gradientSubtractProgram.uniforms.get('texelSize'),
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        gradientSubtractProgram.uniforms.get('uPressure'),
        pressure.read.attach
      );
      gl.uniform1i(
        gradientSubtractProgram.uniforms.get('uVelocity'),
        velocity.read.attach
      );
      blitFn(velocity.write.fbo);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(
        advectionProgram.uniforms.get('texelSize'),
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(
          advectionProgram.uniforms.get('dyeTexelSize'),
          velocity.texelSizeX,
          velocity.texelSizeY
        );
      }
      gl.uniform1i(
        advectionProgram.uniforms.get('uVelocity'),
        velocity.read.attach
      );
      gl.uniform1i(
        advectionProgram.uniforms.get('uSource'),
        velocity.read.attach
      );
      gl.uniform1f(advectionProgram.uniforms.get('dt'), dt);
      gl.uniform1f(
        advectionProgram.uniforms.get('dissipation'),
        config.VELOCITY_DISSIPATION
      );
      blitFn(velocity.write.fbo);
      velocity.swap();

      gl.viewport(0, 0, dyeWidth, dyeHeight);

      if (!ext.supportLinearFiltering) {
        gl.uniform2f(
          advectionProgram.uniforms.get('dyeTexelSize'),
          density.texelSizeX,
          density.texelSizeY
        );
      }
      gl.uniform1i(
        advectionProgram.uniforms.get('uVelocity'),
        velocity.read.attach
      );
      gl.uniform1i(
        advectionProgram.uniforms.get('uSource'),
        density.read.attach
      );
      gl.uniform1f(
        advectionProgram.uniforms.get('dissipation'),
        config.DENSITY_DISSIPATION
      );
      blitFn(density.write.fbo);
      density.swap();
    }

    function render() {
      gl.viewport(0, 0, canvas.width, canvas.height);

      if (config.TRANSPARENT) {
        gl.clearColor(0, 0, 0, 0);
      } else {
        gl.clearColor(
          config.BACK_COLOR.r / 255,
          config.BACK_COLOR.g / 255,
          config.BACK_COLOR.b / 255,
          1
        );
      }
      gl.clear(gl.COLOR_BUFFER_BIT);

      displayProgram.bind();
      gl.uniform1i(displayProgram.uniforms.get('uTexture'), density.read.attach);
      blitFn(null);
    }

    function splatPointer(pointer: any) {
      let dx = pointer.deltaX * config.SPLAT_FORCE;
      let dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      gl.viewport(0, 0, simWidth, simHeight);
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.get('uTarget'), velocity.read.attach);
      gl.uniform1f(
        splatProgram.uniforms.get('aspectRatio'),
        canvas.width / canvas.height
      );
      gl.uniform2f(splatProgram.uniforms.get('point'), x, y);
      gl.uniform3f(splatProgram.uniforms.get('color'), dx, dy, 0.0);
      gl.uniform1f(
        splatProgram.uniforms.get('radius'),
        correctRadius(config.SPLAT_RADIUS / 100.0)
      );
      blitFn(velocity.write.fbo);
      velocity.swap();

      gl.viewport(0, 0, dyeWidth, dyeHeight);
      gl.uniform1i(splatProgram.uniforms.get('uTarget'), density.read.attach);
      gl.uniform3f(
        splatProgram.uniforms.get('color'),
        color[0] * 0.3,
        color[1] * 0.3,
        color[2] * 0.3
      );
      blitFn(density.write.fbo);
      density.swap();
    }

    function correctRadius(radius: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) {
        radius *= aspectRatio;
      }
      return radius;
    }

    // Event handling functions
    function updatePointerDownData(pointer: any, id: number, posX: number, posY: number) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer: any, posX: number, posY: number, color?: number[]) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color || pointer.color;
    }

    function updatePointerUpData(pointer: any) {
      pointer.down = false;
    }

    function correctDeltaX(delta: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) {
        delta *= aspectRatio;
      }
      return delta;
    }

    function correctDeltaY(delta: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) {
        delta /= aspectRatio;
      }
      return delta;
    }

    function generateColor() {
      let c = HSVtoRGB(Math.random(), 1.0, 1.0);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return [c.r, c.g, c.b];
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      let r: number, g: number, b: number;
      let i = Math.floor(h * 6);
      let f = h * 6 - i;
      let p = v * (1 - s);
      let q = v * (1 - f * s);
      let t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v, g = t, b = p;
          break;
        case 1:
          r = q, g = v, b = p;
          break;
        case 2:
          r = p, g = v, b = t;
          break;
        case 3:
          r = p, g = q, b = v;
          break;
        case 4:
          r = t, g = p, b = v;
          break;
        case 5:
          r = v, g = p, b = q;
          break;
        default:
          r = 0, g = 0, b = 0;
      }

      return {
        r,
        g,
        b,
      };
    }

    function scaleByPixelRatio(input: number) {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function clickSplat(pointer: any) {
      const color = generateColor();
      pointer.color = color;
      
      const posX = pointer.texcoordX * canvas.width;
      const posY = (1 - pointer.texcoordY) * canvas.height;
      
      let dx = 10;
      let dy = -10;
      
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    // Initialize and start animation
    initFramebuffers();
    update();

    // Event listeners
    window.addEventListener('mousedown', (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    });

    document.body.addEventListener('mousemove', function handleFirstMouseMove(e) {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      let color = generateColor();
      updatePointerMoveData(pointer, posX, posY, color);
      document.body.removeEventListener('mousemove', handleFirstMouseMove);
    });

    window.addEventListener('mousemove', (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerMoveData(pointer, posX, posY, pointer.color);
    });

    document.body.addEventListener('touchstart', function handleFirstTouchStart(e) {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
      document.body.removeEventListener('touchstart', handleFirstTouchStart);
    });

    window.addEventListener('touchstart', (e) => {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    });

    window.addEventListener('touchmove', (e) => {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      }
    }, false);

    window.addEventListener('touchend', (e) => {
      const touches = e.changedTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        updatePointerUpData(pointer);
      }
    });

  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
}

export default SplashCursor;
