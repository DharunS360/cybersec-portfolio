import { useEffect, useRef, useState } from "react";
import { fetchThreatFeed, targetLocation } from "../data/attackData";

export default function AttackSurfaceMap() {
  const canvasRef = useRef(null);
  const [threats, setThreats] = useState([]);
  const threatsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const result = await fetchThreatFeed();
        if (!mounted) return;
        const top = (result.locations || []).slice(0, 40);
        setThreats(top);
        threatsRef.current = top;
      } catch (err) {
        console.warn("[AttackSurfaceMap] load failed:", err);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const pulsesRef = [];
    const arcsRef = []; // ALWAYS initialized as array
    let radarAngle = 0;
    let lastFrame = 0;
    const FRAME_INTERVAL = isMobile ? 100 : 50;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", handleResize);

    const latLngToXY = (lat, lng) => {
      const minLng = -20;
      const maxLng = 140;
      const minLat = -10;
      const maxLat = 60;
      const x = ((lng - minLng) / (maxLng - minLng)) * width;
      const y = ((maxLat - lat) / (maxLat - minLat)) * height;
      return { x, y };
    };

    const target = latLngToXY(targetLocation.lat, targetLocation.lng);

    const initPulses = () => {
      pulsesRef.length = 0;
      const list = threatsRef.current || [];
      if (!list.length) return;
      const count = isMobile ? 8 : 15;
      for (let i = 0; i < count; i++) {
        const t = list[i % list.length];
        if (!t || typeof t.lat !== "number") continue;
        const { x, y } = latLngToXY(t.lat, t.lng);
        pulsesRef.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: 2 + Math.random() * 3,
          maxRadius: 20 + Math.random() * 30,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.7,
          color: t.color || "#00bfff",
        });
      }
    };
    initPulses();

    const createArc = () => {
      const list = threatsRef.current || [];
      if (!list.length) return;
      const t = list[Math.floor(Math.random() * list.length)];
      if (!t || typeof t.lat !== "number") return;
      const from = latLngToXY(t.lat, t.lng);
      arcsRef.push({
        from,
        to: { x: target.x, y: target.y },
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        color: t.color || "#00bfff",
        controlOffset:
          (Math.random() > 0.5 ? 1 : -1) * (Math.min(height, width) * 0.15),
      });
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(0, 191, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawRadar = () => {
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.max(width, height) * 0.7;

      const sweepGrad = ctx.createLinearGradient(
        cx,
        cy,
        cx + Math.cos(radarAngle) * radius,
        cy + Math.sin(radarAngle) * radius
      );
      sweepGrad.addColorStop(0, "rgba(0, 191, 255, 0)");
      sweepGrad.addColorStop(1, "rgba(0, 191, 255, 0.12)");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, radarAngle - 0.4, radarAngle);
      ctx.lineTo(cx, cy);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(radarAngle) * radius,
        cy + Math.sin(radarAngle) * radius
      );
      ctx.strokeStyle = "rgba(0, 191, 255, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawTarget = () => {
      const t = (Date.now() % 3000) / 3000;
      for (let i = 0; i < 3; i++) {
        const phase = (t + i / 3) % 1;
        const r = phase * 60;
        const opacity = 1 - phase;
        ctx.beginPath();
        ctx.arc(target.x, target.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 255, 157, " + opacity * 0.5 + ")";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(target.x, target.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#00ff9d";
      ctx.shadowColor = "#00ff9d";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = "#00ff9d";
      ctx.textAlign = "center";
      ctx.fillText("MY LOCATION", target.x, target.y + 20);
    };

    const drawPulses = (time) => {
      for (const p of pulsesRef) {
        const t = (time * 0.001 * p.speed + p.phase) % 1;
        const r = p.radius + t * p.maxRadius;
        const opacity = 1 - t;

        ctx.beginPath();
        ctx.arc(p.baseX, p.baseY, r, 0, Math.PI * 2);
        ctx.strokeStyle =
          p.color +
          Math.floor(opacity * 120)
            .toString(16)
            .padStart(2, "0");
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.baseX, p.baseY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawArcs = () => {
      // Safety check
      if (!arcsRef || !Array.isArray(arcsRef)) return;

      for (let i = arcsRef.length - 1; i >= 0; i--) {
        const a = arcsRef[i];
        if (!a) continue;

        a.progress += a.speed;

        if (a.progress >= 1) {
          arcsRef.splice(i, 1);
          continue;
        }

        const midX = (a.from.x + a.to.x) / 2;
        const midY = (a.from.y + a.to.y) / 2 + a.controlOffset;

        const steps = 30;
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          if (t > a.progress) break;

          const x =
            (1 - t) * (1 - t) * a.from.x +
            2 * (1 - t) * t * midX +
            t * t * a.to.x;
          const y =
            (1 - t) * (1 - t) * a.from.y +
            2 * (1 - t) * t * midY +
            t * t * a.to.y;

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        const fade = 1 - a.progress;
        ctx.strokeStyle =
          a.color +
          Math.floor(fade * 180)
            .toString(16)
            .padStart(2, "0");
        ctx.lineWidth = 1.2;
        ctx.shadowColor = a.color;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;

        const t2 = a.progress;
        const headX =
          (1 - t2) * (1 - t2) * a.from.x +
          2 * (1 - t2) * t2 * midX +
          t2 * t2 * a.to.x;
        const headY =
          (1 - t2) * (1 - t2) * a.from.y +
          2 * (1 - t2) * t2 * midY +
          t2 * t2 * a.to.y;

        ctx.beginPath();
        ctx.arc(headX, headY, 2, 0, Math.PI * 2);
        ctx.fillStyle = a.color;
        ctx.shadowColor = a.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const draw = (time) => {
      rafRef.current = requestAnimationFrame(draw);

      if (time - lastFrame < FRAME_INTERVAL) return;
      lastFrame = time;

      ctx.fillStyle = "rgba(5, 8, 16, 0.35)";
      ctx.fillRect(0, 0, width, height);

      drawGrid();
      drawRadar();
      drawArcs();
      drawPulses(time);
      drawTarget();

      radarAngle += 0.008;
      if (radarAngle > Math.PI * 2) radarAngle -= Math.PI * 2;

      if (Math.random() > 0.94) createArc();
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [threats]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}