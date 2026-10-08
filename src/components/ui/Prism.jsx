import { memo, useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './Prism.css'

function Prism({
  height = 3,
  baseWidth = 3,
  scale = 1.8,
  glow = 2,
  noise = 0,
  timeScale = 0.16,
  suspendWhenOffscreen = true,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const prismHeight = Math.max(0.001, height)
    const baseHalf = Math.max(0.001, baseWidth * 0.5)
    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    const renderer = new Renderer({ dpr, alpha: true, antialias: false })
    const gl = renderer.gl

    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.CULL_FACE)
    gl.disable(gl.BLEND)
    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
    })
    container.appendChild(gl.canvas)

    const vertex = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `

    const fragment = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHeight;
      uniform float uBaseHalf;
      uniform float uGlow;
      uniform float uNoise;
      uniform float uScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x) {
        vec4 e2x = exp(2.0 * x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float prismDistance(vec3 p) {
        vec3 q = vec3(abs(p.x) / uBaseHalf, abs(p.y) / uHeight, abs(p.z) / uBaseHalf);
        float octa = (q.x + q.y + q.z - 1.0) * min(uBaseHalf, uHeight) * 0.577350269;
        return max(octa, -p.y);
      }

      void main() {
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy)
          / ((iResolution.y * 0.1) * uScale);
        float t = iTime * uTimeScale;
        float yaw = t * 0.72;
        mat2 rotateXZ = mat2(cos(yaw), -sin(yaw), sin(yaw), cos(yaw));
        float z = 5.0;
        float d = 0.0;
        vec3 p;
        vec4 light = vec4(0.0);

        for (int i = 0; i < 86; i++) {
          p = vec3(f, z);
          p.xz = rotateXZ * p.xz;
          vec3 q = p;
          q.y += uHeight * 0.25;
          d = 0.1 + 0.2 * abs(prismDistance(q));
          z -= d;
          light += (sin((p.y + z) * 0.45 + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        light = tanh4(light * light * uGlow / 1e5);
        float energy = clamp(max(light.r, max(light.g, light.b)), 0.0, 1.0);
        vec3 glassCore = vec3(0.16, 0.40, 0.74);
        vec3 brandBlue = vec3(0.353, 0.612, 0.988);
        vec3 paleBlue = vec3(0.68, 0.84, 1.0);
        vec3 glassHighlight = vec3(0.88, 0.95, 1.0);
        float body = smoothstep(0.18, 0.62, energy);
        float rim = pow(energy, 2.35);
        float movingLight = 0.5 + 0.5 * sin(t * 1.15 + p.x * 1.35);
        vec3 color = mix(paleBlue, glassCore, body * 0.48);
        color = mix(color, brandBlue, smoothstep(0.48, 0.78, energy) * 0.42);
        color = mix(color, glassHighlight, rim * 0.92);
        color += paleBlue * rim * movingLight * 0.2;
        color = mix(color, paleBlue, 0.12);
        color += (rand(gl_FragCoord.xy + vec2(iTime)) - 0.5) * uNoise;
        float alpha = smoothstep(0.055, 0.48, energy) * (0.68 + rim * 0.22);
        gl_FragColor = vec4(clamp(color, 0.0, 1.0), alpha);
      }
    `

    const resolution = new Float32Array(2)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: resolution },
        iTime: { value: 0 },
        uHeight: { value: prismHeight },
        uBaseHalf: { value: baseHalf },
        uGlow: { value: Math.max(0, glow) },
        uNoise: { value: Math.max(0, noise) },
        uScale: { value: Math.max(0.001, scale) },
        uTimeScale: { value: Math.max(0, timeScale) },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      renderer.setSize(container.clientWidth || 1, container.clientHeight || 1)
      resolution[0] = gl.drawingBufferWidth
      resolution[1] = gl.drawingBufferHeight
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    let frame = 0
    const startedAt = performance.now()
    const render = (now) => {
      program.uniforms.iTime.value = (now - startedAt) * 0.001
      renderer.render({ scene: mesh })
      frame = requestAnimationFrame(render)
    }
    const start = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }
    const stop = () => {
      if (!frame) return
      cancelAnimationFrame(frame)
      frame = 0
    }

    let visibilityObserver
    if (suspendWhenOffscreen) {
      visibilityObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      })
      visibilityObserver.observe(container)
    } else {
      start()
    }

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver?.disconnect()
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas)
    }
  }, [baseWidth, glow, height, noise, scale, suspendWhenOffscreen, timeScale])

  return <div className="prism-container" ref={containerRef} aria-hidden="true" />
}

export default memo(Prism)
