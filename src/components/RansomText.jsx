export default function RansomText({ text, className = "" }) {
  const FONTS = [
    "font-mono",
    "font-sans",
    "font-display",
    "font-mono",
    "font-sans",
  ];

  const COLORS = [
    "text-white",
    "text-accent-blue",
    "text-accent-cyan",
    "text-accent-purple",
    "text-accent-amber",
    "text-gray-300",
  ];

  const BGS = [
    "",
    "bg-black/60",
    "bg-accent-blue/20",
    "bg-accent-purple/20",
    "",
    "",
  ];

  const chars = text.split("");

  return (
    <span className={"inline-flex flex-wrap gap-0.5 " + className}>
      {chars.map((char, i) => {
        if (char === " ") {
          return <span key={i} className="inline-block w-2" />;
        }

        const font = FONTS[Math.floor(Math.random() * FONTS.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const bg = BGS[Math.floor(Math.random() * BGS.length)];
        const rotation = (Math.random() - 0.5) * 8;
        const scale = 0.95 + Math.random() * 0.15;

        return (
          <span
            key={i}
            className={`${font} ${color} ${bg} inline-block px-1 py-0.5 leading-none`}
            style={{
              transform: "rotate(" + rotation + "deg) scale(" + scale + ")",
              border: Math.random() > 0.85 ? "1px solid currentColor" : "none",
              fontWeight: Math.random() > 0.7 ? 700 : 400,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}