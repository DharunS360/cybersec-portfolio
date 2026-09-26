import { useState, useEffect } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { isSoundEnabled, setSoundEnabled } from "../hooks/useSound";
import { startAmbient, stopAmbient } from "../utils/sounds";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Auto-mute on mobile
    const isMobile = window.innerWidth < 768;
    const stored = isSoundEnabled();

    if (isMobile && localStorage.getItem("portfolio_sound_enabled") === null) {
      setSoundEnabled(false);
      setEnabled(false);
    } else {
      setEnabled(stored);
    }

    setMounted(true);
  }, []);

  // Start ambient on first user interaction (browser policy)
  useEffect(() => {
    if (!mounted || !enabled) return;

    const startOnce = () => {
      if (isSoundEnabled()) startAmbient();
      window.removeEventListener("click", startOnce);
      window.removeEventListener("keydown", startOnce);
    };

    window.addEventListener("click", startOnce, { once: true });
    window.addEventListener("keydown", startOnce, { once: true });

    return () => {
      window.removeEventListener("click", startOnce);
      window.removeEventListener("keydown", startOnce);
    };
  }, [mounted, enabled]);

  const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    setSoundEnabled(newState);

    if (newState) {
      startAmbient();
    } else {
      stopAmbient();
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-[9998] w-10 h-10 rounded-lg glass-strong border border-accent-blue/30 flex items-center justify-center text-accent-blue hover:border-accent-blue hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all"
      aria-label={enabled ? "Mute sound" : "Unmute sound"}
      title={enabled ? "Mute sound" : "Unmute sound"}
    >
      {enabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
    </button>
  );
}