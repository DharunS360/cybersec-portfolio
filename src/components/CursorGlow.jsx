import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.innerWidth < 1024;
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (narrow || touch || reduced) {
        setIsDisabled(true);
        document.documentElement.style.cursor = "auto";
        document.body.style.cursor = "auto";
      } else {
        setIsDisabled(false);
      }
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isDisabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      raf = requestAnimationFrame(animate);
    };

    const over = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]')
      ) {
        setHovering(true);
      }
    };
    const out = () => setHovering(false);

    const onLeave = () => {
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
    };
    const onEnter = () => {
      if (dot) dot.style.opacity = "1";
      if (ring) ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [isDisabled]);

  if (isDisabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-blue pointer-events-none z-[9999]"
        style={{
          boxShadow: "0 0 10px #00bfff, 0 0 20px #00bfff",
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9998] ${
          hovering
            ? "border-accent-cyan scale-150 bg-accent-cyan/10"
            : "border-accent-blue/40"
        }`}
        style={{ transition: "opacity 0.2s, transform 0.2s, border-color 0.2s" }}
      />
    </>
  );
}