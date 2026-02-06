import React, { useRef, useEffect } from "react";
import "./HeroParticles.css";


export default function HeroParticles({
  particleCount = 125,
  colors = ["#4D96FF", "#A9D6FF", "#EAF6FF", "#FFFFFF"],
  interactive = true,
  className = "",
  trails = true,

  driftMin = 1.3, // increase to make particles move faster left->right
  driftJitter = 0.009,
  speedMultiplier = 2.5, // global speed multiplier (applied each frame)
  particleAlpha = 0.7, // overall opacity for main dots (lower => more transparent)
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const bokehRef = useRef([]);
  const ripplesRef = useRef([]);
  const pointerRef = useRef({ x: null, y: null, isDown: false });
  const hueRef = useRef(210);

  const rand = (min, max) => Math.random() * (max - min) + min;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let DPR = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * DPR));
      const h = Math.max(1, Math.round(rect.height * DPR));
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const area = rect.width * rect.height;
      const density = Math.min(2.2, Math.max(0.45, Math.sqrt(area) / 70));
      const targetCount = Math.round(particleCount * density);

      const particles = particlesRef.current;
      while (particles.length < targetCount) particles.push(makeParticle(rect.width, rect.height));
      while (particles.length > targetCount) particles.pop();

      const targetBokeh = Math.round(Math.max(0, Math.min(20, (rect.width * rect.height) / 150000)));
      const bokeh = bokehRef.current;
      while (bokeh.length < targetBokeh) bokeh.push(makeParticle(rect.width, rect.height, "bokeh"));
      while (bokeh.length > targetBokeh) bokeh.pop();
    }

    function makeParticle(w, h, type = "main") {
      if (type === "bokeh") {
        const size = rand(1, 2);
        return {
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(0.02, 0.14),
          vy: rand(-0.02, 0.02),
          size,
          baseSize: size,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: rand(0.06, 0.18),
          slowDrift: rand(0.0004, 0.002),
        };
      }
      // main particle: positive vx biased to the right
      const size = rand(1.75,2.0);
      const vx = rand(driftMin * 0.6, driftMin * 1.2);
      const vy = rand(-0.06, 0.06);
      // give each main particle a small random opacity around the base particleAlpha
      const opacity = clamp(particleAlpha + rand(-0.08, 0.08), 0.03, 0.9);
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx,
        vy,
        size,
        baseSize: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: rand(-0.002, 0.002),
        opacity, // use this when drawing
      };
    }

    function handlePointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX == null || clientY == null) return;
      pointerRef.current.x = clientX - rect.left;
      pointerRef.current.y = clientY - rect.top;
    }
    function handlePointerLeave() {
      pointerRef.current.x = null;
      pointerRef.current.y = null;
    }
    function handlePointerDown() {
      pointerRef.current.isDown = true;
    }
    function handlePointerUp() {
      pointerRef.current.isDown = false;
    }

    if (interactive) {
      canvas.addEventListener("mousemove", handlePointerMove);
      canvas.addEventListener("touchmove", handlePointerMove, { passive: true });
      canvas.addEventListener("mouseleave", handlePointerLeave);
      canvas.addEventListener("touchend", handlePointerLeave);
      canvas.addEventListener("mousedown", handlePointerDown);
      canvas.addEventListener("touchstart", handlePointerDown, { passive: true });
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("resize", resize);
    } else {
      window.addEventListener("resize", resize);
    }

    resize();

    let last = performance.now();
    function step(now) {
      const dtMs = now - last;
      const dt = Math.min(48, dtMs) / 16.6667;
      last = now;
      update(dt, now);
      draw(now);
      animationRef.current = requestAnimationFrame(step);
    }

    function update(dt, now) {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const particles = particlesRef.current;
      const bokeh = bokehRef.current;
      const mouse = pointerRef.current;

      hueRef.current = (hueRef.current + 0.005 * dt) % 360;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // small jitter but keep positive baseline velocity (bias to right)
        p.vx += rand(-driftJitter, driftJitter) * dt;
        if (p.vx < driftMin * 0.5) p.vx = driftMin * 0.5 + Math.abs(rand(-driftJitter, driftJitter));

        p.vy += Math.sin((now + i * 37) / 1400) * 0.0012 * dt;

        // apply global speed multiplier here
        p.x += p.vx * dt * speedMultiplier;
        p.y += p.vy * dt;

        p.size = p.baseSize + Math.sin((now + i * 57) / 1800 + p.drift) * 0.28;

        if (interactive && mouse.x != null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const influence = (80 - dist) / 80;
            p.vx += (dx / (dist + 0.001)) * (0.25 * influence) * dt;
            p.vy += (dy / (dist + 0.001)) * (0.25 * influence) * dt;
          }
        }

        if (p.x < -40) p.x = w + 40;
        else if (p.x > w + 40) p.x = -40;

        if (p.y < -40) p.y = h + 40;
        else if (p.y > h + 40) p.y = -40;

        p.vx *= 0.997;
        p.vy *= 0.997;
      }

      for (let i = 0; i < bokeh.length; i++) {
        const b = bokeh[i];
        b.x += Math.cos(i * 12 + now * 0.0004) * b.slowDrift * 16 * dt;
        b.y += Math.sin(i * 7 + now * 0.0006) * b.slowDrift * 16 * dt;
        b.size = b.baseSize + Math.sin((now + i * 400) / 2400) * (b.baseSize * 0.08);
        if (b.x < -100) b.x = w + 100;
        if (b.y < -100) b.y = h + 100;
        if (b.x > w + 100) b.x = -100;
        if (b.y > h + 100) b.y = -100;
      }
    }

    function draw(now) {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const particles = particlesRef.current;
      const bokeh = bokehRef.current;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      if (trails) {
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = 0; i < bokeh.length; i++) {
        const b = bokeh[i];
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size * 1.8);
        g.addColorStop(0, hexToRgba(b.color, b.opacity));
        g.addColorStop(0.4, hexToRgba(b.color, b.opacity * 0.22));
        g.addColorStop(1, hexToRgba(b.color, 0));
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      // draw main dots (use per-particle opacity)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const tint = hueShift(p.color, (i % 7) * 0.6 + (hueRef.current - 210) * 0.15);
        ctx.fillStyle = hexToRgba(tint, p.opacity ?? particleAlpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function hexToRgba(hex, a = 1) {
      if (!hex) return `rgba(255,255,255,${a})`;
      if (hex.startsWith("rgba")) {
        return hex.replace(/rgba\(([^)]+)\)/, (m, g) => {
          const parts = g.split(",").map((s) => s.trim());
          parts[3] = `${a}`;
          return `rgba(${parts.join(",")})`;
        });
      }
      if (hex.startsWith("rgb")) {
        return hex.replace("rgb", "rgba").replace(")", `, ${a})`);
      }
      const h = hex.replace("#", "");
      const bigint = parseInt(h, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    // color helpers (parseColor, hueShift, etc.) remain unchanged...
    function parseColor(col) {
      if (col.startsWith("rgb")) {
        const vals = col.match(/[\d.]+/g).map(Number);
        return { r: vals[0], g: vals[1], b: vals[2] };
      }
      const h = col.replace("#", "");
      const bigint = parseInt(h, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    }

    function rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return { h, s, l };
    }

    function hslToRgb(h, s, l) {
      let r, g, b;
      if (s === 0) { r = g = b = l; }
      else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1; if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    function hueShift(hex, deg) {
      const { r, g, b } = parseColor(hex);
      let { h, s, l } = rgbToHsl(r, g, b);
      h = (h * 360 + deg) % 360;
      if (h < 0) h += 360;
      const rgb = hslToRgb(h / 360, s, l);
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    }

    animationRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (interactive) {
        canvas.removeEventListener("mousemove", handlePointerMove);
        canvas.removeEventListener("touchmove", handlePointerMove);
        canvas.removeEventListener("mouseleave", handlePointerLeave);
        canvas.removeEventListener("touchend", handlePointerLeave);
        canvas.removeEventListener("mousedown", handlePointerDown);
        canvas.removeEventListener("touchstart", handlePointerDown);
        window.removeEventListener("mouseup", handlePointerUp);
      }
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, JSON.stringify(colors), interactive, trails, driftMin, driftJitter, speedMultiplier, particleAlpha]);

  return (
    <div
      className={`hero-particles-container ${className} ${interactive ? "interactive" : ""}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="hero-particles-canvas" />
    </div>
  );
}