import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let columns = [];
    const fontSize = 16;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colCount = Math.floor(canvas.width / fontSize);
      columns = new Array(colCount).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "アカサタナハマヤラワ0123456789ABCDEFｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵ";
    const drops = () => Math.random() > 0.975;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 8, 16, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        const opacity = 0.4 + Math.random() * 0.6;
        ctx.fillStyle = `rgba(0, 255, 157, ${opacity})`;
        ctx.fillText(char, x, y);

        ctx.fillStyle = `rgba(0, 212, 255, ${opacity * 0.3})`;
        ctx.fillText(
          chars[Math.floor(Math.random() * chars.length)],
          x,
          y - fontSize
        );

        if (y > canvas.height && drops()) {
          columns[i] = 0;
        }
        columns[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.35 }}
    />
  );
}