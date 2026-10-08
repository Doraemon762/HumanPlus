import { memo, useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './SideRays.css'

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return match
    ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255]
    : [1, 1, 1]
}

function SideRays({
  speed = 0.45,
  rayColor1 = '#ffffff',
  rayColor2 = '#5A9CFC',
  intensity = 1.15,
  spread = 1.4,
  tilt = -8,
  saturation = 1,
  blend = 0.64,
  falloff = 1.55,
  opacity = 0.5,
  className = '',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 1.35),
      alpha: true,
      antialias: false,
    })
    const gl = renderer.gl
    Object.assign(gl.canvas.style, { width: '100%', height: '100%', display: 'block' })
    container.appendChild(gl.canvas)

    const vertex = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `
    const fragment = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform float iSpeed;
      uniform vec3 iRayColor1;
      uniform vec3 iRayColor2;
      uniform float iIntensity;
      uniform float iSpread;
      uniform float iTilt;
      uniform float iSaturation;
      uniform float iBlend;
      uniform float iFalloff;
      uniform float iOpacity;

      float rayStrength(vec2 source, vec2 direction, vec2 coord, float a, float b, float speed) {
        vec2 delta = coord - source;
        float angle = dot(normalize(delta), direction);
        float flicker = (0.45 + 0.15 * sin(angle * a + iTime * speed))
          + (0.3 + 0.2 * cos(-angle * b + iTime * speed));
        return clamp(flicker, 0.0, 1.0)
          * clamp((iResolution.x - length(delta)) / iResolution.x, 0.5, 1.0);
      }

      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
        vec2 source = vec2(iResolution.x * 1.08, -0.48 * iResolution.y);
        float radians = iTilt * 3.14159265 / 180.0;
        float cs = cos(radians);
        float sn = sin(radians);
        vec2 rel = coord - source;
        vec2 tilted = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + source;
        float halfSpread = iSpread * 0.275;
        vec2 dir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
        vec2 dir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));
        vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(source, dir1, tilted, 36.2214, 21.11349, iSpeed);
        vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(source, dir2, tilted, 22.3991, 18.0234, iSpeed * 0.28);
        vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;
        float distanceToLight = length(fragCoord - vec2(source.x, iResolution.y - source.y)) / iResolution.y;
        color.rgb *= iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = mix(vec3(gray), color.rgb, iSaturation);
        color.a = max(color.r, max(color.g, color.b)) * iOpacity;
        gl_FragColor = color;
      }
    `

    const resolution = new Float32Array(2)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: resolution },
        iSpeed: { value: speed },
        iRayColor1: { value: hexToRgb(rayColor1) },
        iRayColor2: { value: hexToRgb(rayColor2) },
        iIntensity: { value: intensity },
        iSpread: { value: spread },
        iTilt: { value: tilt },
        iSaturation: { value: saturation },
        iBlend: { value: blend },
        iFalloff: { value: falloff },
        iOpacity: { value: opacity },
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
    const start = () => { if (!frame) frame = requestAnimationFrame(render) }
    const stop = () => {
      if (!frame) return
      cancelAnimationFrame(frame)
      frame = 0
    }
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start()
      else stop()
    }, { threshold: 0.08 })
    visibilityObserver.observe(container)

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas)
    }
  }, [blend, falloff, intensity, opacity, rayColor1, rayColor2, saturation, speed, spread, tilt])

  return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} aria-hidden="true" />
}

export default memo(SideRays)
