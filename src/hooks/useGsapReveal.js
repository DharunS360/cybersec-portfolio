import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      y = 50,
      opacity = 0,
      duration = 1,
      delay = 0,
      start = "top 85%",
    } = options;

    const el = ref.current;

    gsap.fromTo(
      el,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
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
  }, [options]);

  return ref;
}

export function useGsapParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [speed]);

  return ref;
}

export default useGsapReveal;