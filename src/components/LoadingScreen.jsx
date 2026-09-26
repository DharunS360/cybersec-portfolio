import { useEffect, useState } from "react";

const LINES = [
  "> Initializing secure shell...",
  "> Loading encryption modules...",
  "> Establishing VPN tunnel...",
  "> Bypassing firewall...",
  "> Decrypting profile data...",
  "> Loading payload...",
  "> Access granted OK",
];

export default function LoadingScreen({ onComplete }) {
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = idx + 1;
      if (idx <= LINES.length) {
        setLineCount(idx);
        setProgress(Math.round((idx / LINES.length) * 100));
      } else {
        clearInterval(interval);
        setTimeout(function () {
          setHiding(true);
        }, 400);
        setTimeout(function () {
          if (typeof onComplete === "function") onComplete();
        }, 900);
      }
    }, 280);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={
        "fixed inset-0 z-[10000] bg-bg-primary flex items-center justify-center transition-opacity duration-500 " +
        (hiding ? "opacity-0 pointer-events-none" : "opacity-100")
      }
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.15),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="text-center mb-8">
          <div className="text-6xl font-mono text-accent glow-text mb-2 animate-pulse">
            {">_"}
          </div>
          <div className="text-xs text-gray-500 font-mono tracking-widest">
            SYSTEM BOOT SEQUENCE
          </div>
        </div>

        <div className="glass rounded-lg p-5 font-mono text-sm min-h-[180px] scan-container">
          {LINES.slice(0, lineCount).map(function (line, i) {
            const isLast = i === lineCount - 1;
            const isDone = line.indexOf("OK") !== -1;
            return (
              <div
                key={i}
                className={
                  (isDone ? "text-accent" : "text-gray-300") + " mb-1.5"
                }
              >
                {line}
                {isLast && !isDone && (
                  <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs font-mono text-gray-500 mb-2">
            <span>LOADING</span>
            <span className="text-accent">{progress}%</span>
          </div>
          <div className="h-1 bg-bg-card rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: progress + "%",
                background: "linear-gradient(90deg, #00ff9d, #00d4ff)",
                boxShadow: "0 0 10px #00ff9d",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}