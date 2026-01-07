/**
 * LinesCardShader - WebGL terrain contour lines animation
 */

type ShaderConfig = {
  background: string;
  lineColor: string;
  accentColor: string;
  lineOpacity: number;
  lineDensity: number;
  speed: number;
  mouseStrength: number;
  dprCap: number;
};

const defaultConfig: ShaderConfig = {
  background: '#f5f7fa',
  lineColor: '#9aa6b2',
  accentColor: '#7f38dc',
  lineOpacity: 0.55,
  lineDensity: 10,
  speed: 0.15,
  mouseStrength: 0.5,
  dprCap: 1.5,
};

const hexToRgb01 = (hex: string): [number, number, number] => {
  const cleaned = String(hex).trim().replace('#', '');
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;

  const num = Number.parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return [r / 255, g / 255, b / 255];
};

const vertSrc = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_pos * 0.5) + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const fragSrc = `
  precision highp float;

  varying vec2 v_uv;
  uniform vec2 u_res;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec3 u_bg;
  uniform vec3 u_line;
  uniform vec3 u_accent;
  uniform float u_opacity;
  uniform float u_density;
  uniform float u_speed;
  uniform float u_mouseStrength;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash12(i + vec2(0.0, 0.0));
    float b = hash12(i + vec2(1.0, 0.0));
    float c = hash12(i + vec2(0.0, 1.0));
    float d = hash12(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise2(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  vec2 warp(vec2 p, float t) {
    float w1 = fbm(p * 1.2 + vec2(0.0, 1.7) + t);
    float w2 = fbm(p * 1.2 + vec2(2.3, 0.4) - t * 0.9);
    return vec2(w1, w2);
  }

  void main() {
    vec2 frag = v_uv * u_res;
    vec2 p = (frag - 0.5 * u_res) / u_res.y;

    vec2 m = (u_mouse - 0.5) * 2.0;
    p += m * 0.18 * u_mouseStrength;

    float t = u_time * u_speed;

    vec2 q = p * 2.2;
    vec2 w = warp(q + m * 0.35 * u_mouseStrength, t * 0.25);
    q += (w - 0.5) * 0.85;

    float h = fbm(q + vec2(t * 0.15, -t * 0.12));

    float dens = max(4.0, u_density);
    float bands = h * dens;

    float c = abs(fract(bands) - 0.5);

    float px = 1.0 / max(u_res.x, u_res.y);
    float thickness = mix(0.08, 0.015, 1.0 - u_opacity) + px * 10.5;

    float lineMask = smoothstep(thickness, 0.0, c);

    float c2 = abs(fract(h * (dens * 0.5) + 0.17) - 0.5);
    float micro = smoothstep(thickness * 0.9, 0.0, c2) * 0.35;

    float shade = smoothstep(0.15, 0.9, h);
    vec3 base = u_bg;

    float r = length(p);
    base *= 1.0 - 0.06 * smoothstep(0.35, 1.0, r);

    vec3 lc = mix(u_line, u_accent, 0.18 * smoothstep(0.2, 0.95, h));
    float alpha = clamp((lineMask + micro) * u_opacity, 0.0, 1.0);

    float contrast = mix(0.85, 1.05, shade);
    vec3 col = mix(base, lc * contrast, alpha);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const msg = gl.getShaderInfoLog(shader) || 'Shader compile failed';
    gl.deleteShader(shader);
    throw new Error(msg);
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const msg = gl.getProgramInfoLog(program) || 'Program link failed';
    gl.deleteProgram(program);
    throw new Error(msg);
  }

  return program;
}

export function initShader(canvas: HTMLCanvasElement, config: Partial<ShaderConfig> = {}): void {
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (prefersReduced) {
    canvas.style.display = 'none';
    return;
  }

  const cfg = { ...defaultConfig, ...config };

  const bg = hexToRgb01(cfg.background);
  const line = hexToRgb01(cfg.lineColor);
  const accent = hexToRgb01(cfg.accentColor);

  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: true,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  }) || canvas.getContext('experimental-webgl', {
    antialias: false,
    alpha: true,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  }) as WebGLRenderingContext | null;

  if (!gl) {
    canvas.style.display = 'none';
    return;
  }

  let program: WebGLProgram;
  try {
    program = createProgram(gl);
  } catch (err) {
    console.error('[LinesCardShader] shader init failed', err);
    canvas.style.display = 'none';
    return;
  }

  gl.useProgram(program);

  const posLoc = gl.getAttribLocation(program, 'a_pos');
  const uRes = gl.getUniformLocation(program, 'u_res');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uMouse = gl.getUniformLocation(program, 'u_mouse');
  const uBg = gl.getUniformLocation(program, 'u_bg');
  const uLine = gl.getUniformLocation(program, 'u_line');
  const uAccent = gl.getUniformLocation(program, 'u_accent');
  const uOpacity = gl.getUniformLocation(program, 'u_opacity');
  const uDensity = gl.getUniformLocation(program, 'u_density');
  const uSpeed = gl.getUniformLocation(program, 'u_speed');
  const uMouseStrength = gl.getUniformLocation(program, 'u_mouseStrength');

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const dprLimit = Math.max(1, Math.min(cfg.dprCap, 2));
  let dpr = Math.min(window.devicePixelRatio || 1, dprLimit);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    const w = Math.floor(rect.width * dpr);
    const h = Math.floor(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl!.viewport(0, 0, w, h);
    }
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);

  let running = true;
  const io = new IntersectionObserver(
    (entries) => {
      running = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0.01 }
  );
  io.observe(canvas);

  let mouseX = 0.5;
  let mouseY = 0.5;
  let smX = 0.5;
  let smY = 0.5;

  function onPointerMove(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    mouseX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    mouseY = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
  }

  canvas.addEventListener('pointermove', onPointerMove, { passive: true });
  canvas.addEventListener('pointerleave', () => {
    mouseX = 0.5;
    mouseY = 0.5;
  }, { passive: true });

  // Static uniforms
  gl.uniform3f(uBg, bg[0], bg[1], bg[2]);
  gl.uniform3f(uLine, line[0], line[1], line[2]);
  gl.uniform3f(uAccent, accent[0], accent[1], accent[2]);
  gl.uniform1f(uOpacity, Math.max(0, Math.min(1, cfg.lineOpacity)));
  gl.uniform1f(uDensity, Math.max(2, cfg.lineDensity));
  gl.uniform1f(uSpeed, Math.max(0.05, cfg.speed));
  gl.uniform1f(uMouseStrength, Math.max(0, Math.min(1, cfg.mouseStrength)));

  const start = performance.now();
  let last = start;
  let quality = 1.0;

  function frame(now: number) {
    requestAnimationFrame(frame);
    if (!running) return;

    const dt = now - last;
    last = now;

    if (dt > 22) quality = Math.max(0.75, quality - 0.03);
    else if (dt < 17) quality = Math.min(1.0, quality + 0.01);

    const targetDpr = Math.min((window.devicePixelRatio || 1) * quality, dprLimit);
    if (Math.abs(targetDpr - dpr) > 0.02) dpr = targetDpr;

    resize();

    smX += (mouseX - smX) * 0.08;
    smY += (mouseY - smY) * 0.08;

    const t = (now - start) / 1000;

    gl!.uniform2f(uRes, canvas.width, canvas.height);
    gl!.uniform1f(uTime, t);
    gl!.uniform2f(uMouse, smX, smY);

    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  resize();
  requestAnimationFrame(frame);
}

export function initAllShaders(): void {
  const canvases = document.querySelectorAll<HTMLCanvasElement>('[data-lines-card-shader]');

  canvases.forEach((canvas) => {
    const config: Partial<ShaderConfig> = {};

    if (canvas.dataset.background) config.background = canvas.dataset.background;
    if (canvas.dataset.lineColor) config.lineColor = canvas.dataset.lineColor;
    if (canvas.dataset.accentColor) config.accentColor = canvas.dataset.accentColor;
    if (canvas.dataset.lineOpacity) config.lineOpacity = parseFloat(canvas.dataset.lineOpacity);
    if (canvas.dataset.lineDensity) config.lineDensity = parseFloat(canvas.dataset.lineDensity);
    if (canvas.dataset.speed) config.speed = parseFloat(canvas.dataset.speed);
    if (canvas.dataset.mouseStrength) config.mouseStrength = parseFloat(canvas.dataset.mouseStrength);
    if (canvas.dataset.dprCap) config.dprCap = parseFloat(canvas.dataset.dprCap);

    initShader(canvas, config);
  });
}

// Run on DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllShaders);
  } else {
    initAllShaders();
  }
}
