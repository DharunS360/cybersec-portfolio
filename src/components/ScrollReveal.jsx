import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  y = 50,
  x = 0,
  opacity = 0,
  duration = 1,
  delay = 0,
  start = "top 85%",
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.fromTo(
      el,
      { y, x, opacity, visibility: "hidden" },
      {
        y: 0,
        x: 0,
        opacity: 1,
        visibility: "visible",
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [y, x, opacity, duration, delay, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}