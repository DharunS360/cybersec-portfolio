import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio_crt_enabled";

export default function CRTWrapper({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Default: OFF (modern mode)
    setEnabled(stored === "true");
    setMounted(true);
  }, []);

  const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    localStorage.setItem(STORAGE_KEY, newState ? "true" : "false");
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggle}
        className="fixed top-16 right-4 z-[9999] w-10 h-10 rounded-lg glass-strong border border-accent-blue/30 flex items-center justify-center text-accent-blue hover:border-accent-blue hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all text-[10px] font-mono font-bold"
        aria-label={enabled ? "Disable CRT mode" : "Enable CRT mode"}
        title={enabled ? "Switch to Modern Mode" : "Switch to CRT Mode"}
      >
        CRT
      </button>

      {/* Content wrapper */}
      <div className={enabled ? "crt-wrapper" : ""}>
        {children}

        {enabled && (
          <>
            {/* CRT scanlines overlay */}
            <div className="crt-scanlines" />

            {/* CRT flicker overlay */}
            <div className="crt-flicker" />

            {/* CRT vignette */}
            <div className="crt-vignette" />

            {/* CRT screen curvature */}
            <div className="crt-curvature" />

            {/* CRT chromatic aberration */}
            <div className="crt-chromatic" />
          </>
        )}
      </div>
    </>
  );
}