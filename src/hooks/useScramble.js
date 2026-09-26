import { useState, useEffect, useRef } from "react";

const CHARS =
  "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useScramble(text, options = {}) {
  const { trigger = "mount", duration = 1200 } = options;
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text);
  const frameRef = useRef(null);

  const scramble = () => {
    const start = performance.now();
    const originalLength = text.length;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * originalLength);

      let result = "";
      for (let i = 0; i < originalLength; i++) {
        if (i < revealed) {
          result += text[i];
        } else if (text[i] === " ") {
          result += " ";
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (trigger === "mount") scramble();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text]);

  return { display, scramble };
}

export default useScramble;