/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050810",
          secondary: "#0a1424",
          card: "#0f1d33",
          elevated: "#151d2b",
        },
        // SOC / SIEM palette
        soc: {
          DEFAULT: "#00bfff",
          primary: "#00bfff",
          secondary: "#00d4ff",
          accent: "#00ff9d",
          cyan: "#00d4ff",
          deep: "#0066cc",
        },
        // Alert severities (standard SIEM)
        alert: {
          critical: "#ff3b3b",
          high: "#ff9500",
          medium: "#ffb700",
          low: "#00bfff",
          info: "#6b7280",
        },
        // Legacy accent — kept for compatibility
        accent: {
          DEFAULT: "#00bfff",
          blue: "#00bfff",
          cyan: "#00d4ff",
          purple: "#a855f7",
          red: "#ff3b3b",
          orange: "#ff9500",
          yellow: "#fbbf24",
          amber: "#ffb700",
        },
        // Threat severities
        threat: {
          low: "#00bfff",
          medium: "#ffb700",
          high: "#ff9500",
          critical: "#ff3b3b",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-blue": "glowBlue 2s ease-in-out infinite alternate",
        "glow-soft": "glowSoft 3s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "scan-line": "scan 4s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "border-flow": "borderFlow 3s linear infinite",
        flicker: "flicker 4s linear infinite",
        "radar-sweep": "radarSweep 4s linear infinite",
        "data-stream": "dataStream 8s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #00bfff, 0 0 10px #00bfff" },
          "100%": { boxShadow: "0 0 20px #00bfff, 0 0 40px #00bfff" },
        },
        glowBlue: {
          "0%": { boxShadow: "0 0 5px #00bfff, 0 0 10px #00bfff" },
          "100%": { boxShadow: "0 0 20px #00bfff, 0 0 40px #00bfff" },
        },
        glowSoft: {
          "0%": { boxShadow: "0 0 8px rgba(0, 191, 255, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 191, 255, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        borderFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.85" },
          "43%": { opacity: "1" },
          "45%": { opacity: "0.9" },
          "46%": { opacity: "1" },
        },
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        dataStream: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};