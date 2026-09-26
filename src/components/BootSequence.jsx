import { useEffect, useRef, useState } from "react";

const BOOT_SCRIPT = [
  { text: "", delay: 200 },
  { text: "GRUB loading...", delay: 400, color: "text-gray-400" },
  { text: "Welcome to GRUB!", delay: 300, color: "text-gray-400" },
  { text: "", delay: 200 },
  { text: "Loading Linux 6.5.0-kali-amd64 ...", delay: 600, color: "text-gray-300" },
  { text: "Loading initial ramdisk ...", delay: 500, color: "text-gray-300" },
  { text: "", delay: 300 },
  { text: "[    0.000000] Linux version 6.5.0-kali-amd64", delay: 250, color: "text-gray-500" },
  { text: "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1 ro quiet", delay: 200, color: "text-gray-500" },
  { text: "[    0.152341] Memory: 16384MB available", delay: 200, color: "text-gray-500" },
  { text: "[    0.481020] CPU: Intel Core i7 @ 3.40GHz", delay: 200, color: "text-gray-500" },
  { text: "[    0.892134] NET: Registered PF_INET protocol family", delay: 200, color: "text-gray-500" },
  { text: "[    1.234561] systemd[1]: Detected architecture x86-64", delay: 200, color: "text-gray-500" },
  { text: "", delay: 300 },
  { text: "[  OK  ] Started Load Kernel Modules", delay: 300, color: "text-accent" },
  { text: "[  OK  ] Started udev Kernel Device Manager", delay: 250, color: "text-accent" },
  { text: "[  OK  ] Started Network Manager", delay: 250, color: "text-accent" },
  { text: "[  OK  ] Started Avahi mDNS/DNS-SD Stack", delay: 250, color: "text-accent" },
  { text: "[  OK  ] Started OpenSSH Daemon", delay: 250, color: "text-accent" },
  { text: "[  OK  ] Started Load Kernel Module efi_pstore", delay: 250, color: "text-accent" },
  { text: "[  OK  ] Reached target Network", delay: 300, color: "text-accent" },
  { text: "[  OK  ] Reached target Multi-User System", delay: 300, color: "text-accent" },
  { text: "[  OK  ] Started Permit User Sessions", delay: 250, color: "text-accent" },
  { text: "", delay: 300 },
  { text: "Kali GNU/Linux Rolling 2025.1", delay: 400, color: "text-accent-blue" },
  { text: "tty1", delay: 200, color: "text-gray-500" },
  { text: "", delay: 300 },
  { text: "dharun login: _", delay: 400, color: "text-white", final: true },
];

export default function BootSequence({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [hiding, setHiding] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip if already shown this session
    const session = sessionStorage.getItem("boot_shown");
    if (session === "true") {
      if (typeof onComplete === "function") onComplete();
      return;
    }

    if (lineIndex >= BOOT_SCRIPT.length) {
      sessionStorage.setItem("boot_shown", "true");
      setTimeout(function () {
        setHiding(true);
      }, 800);
      setTimeout(function () {
        if (typeof onComplete === "function") onComplete();
      }, 1300);
      return;
    }

    const timer = setTimeout(function () {
      setLineIndex(lineIndex + 1);
    }, BOOT_SCRIPT[lineIndex].delay);

    return function cleanup() {
      clearTimeout(timer);
    };
  }, [lineIndex, onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lineIndex]);

  const handleSkip = function () {
    sessionStorage.setItem("boot_shown", "true");
    setHiding(true);
    setTimeout(function () {
      if (typeof onComplete === "function") onComplete();
    }, 500);
  };

  return (
    <div
      className={
        "fixed inset-0 z-[10000] bg-black transition-opacity duration-500 " +
        (hiding ? "opacity-0 pointer-events-none" : "opacity-100")
      }
    >
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0, 255, 157, 0.1) 0px, rgba(0, 255, 157, 0.1) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 text-xs font-mono text-gray-500 hover:text-accent transition px-3 py-1.5 border border-gray-700 hover:border-accent rounded"
      >
        [SKIP]
      </button>

      {/* Boot log */}
      <div
        ref={containerRef}
        className="relative z-20 w-full h-full overflow-y-auto px-8 py-8 font-mono text-sm"
        style={{ scrollbarWidth: "none" }}
      >
        {BOOT_SCRIPT.slice(0, lineIndex).map(function (line, i) {
          return (
            <div
              key={i}
              className={
                (line.color || "text-gray-300") +
                " leading-relaxed whitespace-pre-wrap"
              }
            >
              {line.text}
              {line.final && i === lineIndex - 1 && (
                <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}