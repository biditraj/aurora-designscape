
import React, { useRef, useEffect, useCallback, useMemo } from "react";
import {
  mainFragmentShader,
  mainVertexShader,
  hdrFragmentShader,
  gaussianBlurXFragmentShader,
  gaussianBlurYFragmentShader,
  pingPongFragmentShader,
  pingPongVertexShader,
} from "./base-shaders";

interface SplashCursorProps {
  enabled?: boolean;
  radius?: number;
  blur?: number;
  intensity?: number;
  falloff?: number;
  quality?: number;
  resolution?: number;
  color?: [number, number, number];
}

export function SplashCursor({
  enabled = true,
  radius = 50,
  blur = 35,
  intensity = 0.45,
  falloff = 0.15,
  quality = 0.5,
  resolution = 0.15,
  color = [0.1, 0.1, 0.1],
}: SplashCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cursorPosition = useRef<{
    current: { x: number; y: number };
    target: { x: number; y: number };
  }>({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  });

  const cleanup = useRef<() => void>(() => {});

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorPosition.current) {
      cursorPosition.current.target = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  }, []);

  const initCursor = useCallback(() => {
    if (!canvasRef.current || !enabled) return;

    // Using WebGL2RenderingContext instead of RenderingContext
    const gl = canvasRef.current.getContext("webgl2") as WebGL2RenderingContext;
    if (!gl) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = width / height;
    let pixelRatio = Math.min(window.devicePixelRatio, 2);
    const bRenderable = (Math.min(width, height) * pixelRatio) / 2;
    
    canvasRef.current.width = width * pixelRatio * resolution;
    canvasRef.current.height = height * pixelRatio * resolution;

    // Declare all WebGLTexture, WebGLFramebuffer, and WebGLProgram variables
    let renderProgram: WebGLProgram | null = null;
    let pingPongProgram: WebGLProgram | null = null;
    let blurXProgram: WebGLProgram | null = null;
    let blurYProgram: WebGLProgram | null = null;
    let pingPongFrameBuffer: WebGLFramebuffer | null = null;
    let pingPongTexture: WebGLTexture | null = null;
    let hdrFrameBuffer: WebGLFramebuffer | null = null;
    let hdrTexture: WebGLTexture | null = null;
    let blurFrameBuffer1: WebGLFramebuffer | null = null;
    let blurFrameBuffer2: WebGLFramebuffer | null = null;
    let blurTexture1: WebGLTexture | null = null;
    let blurTexture2: WebGLTexture | null = null;

    // Function to create shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error('Failed to create shader');
        return null;
      }
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    // Function to create program
    const createProgram = (vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
      const program = gl.createProgram();
      if (!program) {
        console.error('Failed to create program');
        return null;
      }
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`Program link error: ${gl.getProgramInfoLog(program)}`);
        gl.deleteProgram(program);
        return null;
      }
      
      // Store program uniforms
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      const uniformMap: Record<string, WebGLUniformLocation> = {};
      
      for (let i = 0; i < uniformCount; i++) {
        const uniformInfo = gl.getActiveUniform(program, i);
        if (uniformInfo) {
          const location = gl.getUniformLocation(program, uniformInfo.name);
          if (location) {
            uniformMap[uniformInfo.name] = location;
          }
        }
      }
      
      return { program, uniformMap };
    };

    // Create all shaders
    const vertexShader = createShader(gl.VERTEX_SHADER, mainVertexShader);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, mainFragmentShader);
    const hdrFragShader = createShader(gl.FRAGMENT_SHADER, hdrFragmentShader);
    const blurXFragShader = createShader(gl.FRAGMENT_SHADER, gaussianBlurXFragmentShader);
    const blurYFragShader = createShader(gl.FRAGMENT_SHADER, gaussianBlurYFragmentShader);
    const pingPongVertShader = createShader(gl.VERTEX_SHADER, pingPongVertexShader);
    const pingPongFragShader = createShader(gl.FRAGMENT_SHADER, pingPongFragmentShader);

    if (!vertexShader || !fragmentShader || !hdrFragShader || !blurXFragShader || 
        !blurYFragShader || !pingPongVertShader || !pingPongFragShader) {
      console.error('Failed to create shaders');
      return;
    }

    // Create programs
    const renderProgramInfo = createProgram(vertexShader, fragmentShader);
    const hdrProgramInfo = createProgram(vertexShader, hdrFragShader);
    const blurXProgramInfo = createProgram(vertexShader, blurXFragShader);
    const blurYProgramInfo = createProgram(vertexShader, blurYFragShader);
    const pingPongProgramInfo = createProgram(pingPongVertShader, pingPongFragShader);

    if (!renderProgramInfo || !hdrProgramInfo || !blurXProgramInfo || 
        !blurYProgramInfo || !pingPongProgramInfo) {
      console.error('Failed to create programs');
      return;
    }

    renderProgram = renderProgramInfo.program;
    blurXProgram = blurXProgramInfo.program;
    blurYProgram = blurYProgramInfo.program;
    pingPongProgram = pingPongProgramInfo.program;

    const renderUniforms = renderProgramInfo.uniformMap;
    const hdrUniforms = hdrProgramInfo.uniformMap;
    const blurXUniforms = blurXProgramInfo.uniformMap;
    const blurYUniforms = blurYProgramInfo.uniformMap;
    const pingPongUniforms = pingPongProgramInfo.uniformMap;

    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 3]),
      gl.STATIC_DRAW
    );

    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    // Function to resize canvas
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      aspectRatio = width / height;
      canvasRef.current!.width = width * pixelRatio * resolution;
      canvasRef.current!.height = height * pixelRatio * resolution;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    // Setup framebuffers and textures
    const setupFramebuffers = () => {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      // Clear
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Draw
      gl.drawElements(gl.TRIANGLES, 4, gl.UNSIGNED_SHORT, 0);
    };

    const createFramebufferTexture = (width: number, height: number) => {
      // Setup texture
      gl.activeTexture(gl.TEXTURE0);

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

      const frameBuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, width, height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return { texture, frameBuffer, width, height };
    };

    // Create ping pong buffer
    const pingPongBufferInfo = createFramebufferTexture(
      gl.drawingBufferWidth,
      gl.drawingBufferHeight
    );
    pingPongTexture = pingPongBufferInfo.texture;
    pingPongFrameBuffer = pingPongBufferInfo.frameBuffer;

    // Create HDR buffer
    const hdrBufferInfo = createFramebufferTexture(
      gl.drawingBufferWidth,
      gl.drawingBufferHeight
    );
    hdrTexture = hdrBufferInfo.texture;
    hdrFrameBuffer = hdrBufferInfo.frameBuffer;

    // Create Blur buffers
    const blurBufferInfo1 = createFramebufferTexture(
      gl.drawingBufferWidth * quality,
      gl.drawingBufferHeight * quality
    );
    const blurBufferInfo2 = createFramebufferTexture(
      gl.drawingBufferWidth * quality,
      gl.drawingBufferHeight * quality
    );
    blurTexture1 = blurBufferInfo1.texture;
    blurFrameBuffer1 = blurBufferInfo1.frameBuffer;
    blurTexture2 = blurBufferInfo2.texture;
    blurFrameBuffer2 = blurBufferInfo2.frameBuffer;

    let animationFrameId: number;
    let previousTime = 0;

    const renderLoop = (currentTime: number) => {
      const deltaTime = currentTime - previousTime;
      previousTime = currentTime;

      // Update cursor position with easing
      cursorPosition.current.current.x += (cursorPosition.current.target.x - cursorPosition.current.current.x) * 0.05;
      cursorPosition.current.current.y += (cursorPosition.current.target.y - cursorPosition.current.current.y) * 0.05;

      // Cast position from viewport coordinate system (0,0 = top left) to clip space (-1 to 1)
      const x = (cursorPosition.current.current.x / width) * 2 - 1;
      const y = -(cursorPosition.current.current.y / height) * 2 + 1;

      // First pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, hdrFrameBuffer);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(renderProgram);

      // Disable blending for first pass
      gl.disable(gl.BLEND);

      // Set uniforms
      gl.uniform2f(renderUniforms['u_resolution'], width, height);
      gl.uniform1i(renderUniforms['u_frame'], Math.floor(currentTime / 16.667));
      gl.uniform2f(renderUniforms['u_mouse'], x * aspectRatio, y);
      gl.uniform1i(renderUniforms['u_renderpass'], 0);
      gl.uniform1f(renderUniforms['u_radius'], radius / 100);
      gl.uniform1f(renderUniforms['u_falloff'], falloff);

      // Draw first pass
      gl.drawElements(gl.TRIANGLES, 4, gl.UNSIGNED_SHORT, 0);

      // Horizontal blur pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, blurFrameBuffer1);
      gl.viewport(0, 0, gl.drawingBufferWidth * quality, gl.drawingBufferHeight * quality);
      gl.useProgram(blurXProgram);
      gl.uniform2f(blurXUniforms['u_resolution'], width, height);
      gl.uniform1i(blurXUniforms['u_texture'], 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, hdrTexture);
      gl.uniform1i(blurXUniforms['u_frame'], Math.floor(currentTime / 16.667));
      gl.uniform1i(blurXUniforms['u_taps'], Math.floor(blur));
      gl.uniform1f(blurXUniforms['u_blur'], blur / 100);
      
      gl.drawElements(gl.TRIANGLES, 4, gl.UNSIGNED_SHORT, 0);

      // Vertical blur pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, blurFrameBuffer2);
      gl.useProgram(blurYProgram);
      gl.uniform2f(blurYUniforms['u_resolution'], width, height);
      gl.uniform1i(blurYUniforms['u_texture'], 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, blurTexture1);
      gl.uniform1i(blurYUniforms['u_frame'], Math.floor(currentTime / 16.667));
      gl.uniform1i(blurYUniforms['u_taps'], Math.floor(blur));
      gl.uniform1f(blurYUniforms['u_blur'], blur / 100);
      
      gl.uniform2f(blurYUniforms['u_mouse'], x * aspectRatio, y);
      gl.drawElements(gl.TRIANGLES, 4, gl.UNSIGNED_SHORT, 0);

      // Ping pong pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, pingPongFrameBuffer);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.useProgram(pingPongProgram);
      gl.uniform1i(pingPongUniforms['u_ping'], 0);
      gl.uniform1i(pingPongUniforms['u_pong'], 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, blurTexture2);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, pingPongTexture);
      gl.drawElements(gl.TRIANGLES, 4, gl.UNSIGNED_SHORT, 0);

      // Composite pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.useProgram(renderProgram);
      
      // Set up blending
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);

      // Adjust aspect ratio for composite pass
      const compositeAspectX = gl.drawingBufferWidth / width;
      const compositeAspectY = gl.drawingBufferHeight / height;

      // Set uniforms for composite pass
      gl.uniform2f(renderUniforms['u_resolution'], width, height);
      gl.uniform1i(renderUniforms['u_texture'], 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pingPongTexture);

      // On second rendering pass, we want to draw cursor that uses
      // previous rendered frame, and also add ability to draw splashes
      if (cursorPosition.current) {
        // Uniform for renderprograms
        gl.uniform1i(renderUniforms['u_renderpass'], 1);
        gl.uniform1f(renderUniforms['u_intensity'], intensity);
        gl.uniform2f(renderUniforms['u_mouse'], x * aspectRatio, y);
        gl.uniform3f(renderUniforms['u_color'], color[0], color[1], color[2]);
        gl.uniform1f(renderUniforms['u_radius'], radius / bRenderable);
      }

      // Final Draw
      gl.uniform1i(renderUniforms['u_frame'], Math.floor(currentTime / 16.667));
      gl.drawElements(gl.TRIANGLES, 4, gl.UNSIGNED_SHORT, 0);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    // Start animation
    animationFrameId = requestAnimationFrame(renderLoop);

    // Cleanup function
    cleanup.current = () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      // Delete resources
      gl.deleteProgram(renderProgram);
      gl.deleteProgram(blurXProgram);
      gl.deleteProgram(blurYProgram);
      gl.deleteProgram(pingPongProgram);
      gl.deleteFramebuffer(pingPongFrameBuffer);
      gl.deleteFramebuffer(hdrFrameBuffer);
      gl.deleteFramebuffer(blurFrameBuffer1);
      gl.deleteFramebuffer(blurFrameBuffer2);
      gl.deleteTexture(pingPongTexture);
      gl.deleteTexture(hdrTexture);
      gl.deleteTexture(blurTexture1);
      gl.deleteTexture(blurTexture2);
    };
    
    // Initial resize
    resize();
  }, [blur, color, enabled, falloff, intensity, quality, radius, resolution]);

  useEffect(() => {
    initCursor();
    
    return () => {
      cleanup.current();
    };
  }, [initCursor]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-transparent"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
