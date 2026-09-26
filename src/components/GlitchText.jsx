import { useEffect, useRef, useState } from "react";

export default function GlitchText({
  text,
  className = "",
  intensity = "low",
}) {
  const ref = useRef(null);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Blue team: rare, subtle glitch (every 6-10 seconds, not every 2)
    const trigger = () => {
      if (Math.random() > 0.6) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 180);
      }
    };

    const interval = setInterval(trigger, 7000);

    return () => clearInterval(interval);
  }, []);

  const intensityMap = {
    low: "",
    medium: "glitch-medium",
    high: "glitch-high",
  };

  return (
    <span
      ref={ref}
      className={
        "glitch-wrapper " +
        (intensityMap[intensity] || "") +
        " " +
        (isGlitching ? "glitching" : "") +
        " " +
        className
      }
      data-text={text}
    >
      <span className="glitch-main">{text}</span>
      <span className="glitch-layer glitch-layer-1" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-layer glitch-layer-2" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}