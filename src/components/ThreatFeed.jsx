const THREATS = [
  { type: "SQLi", severity: "HIGH", target: "192.168.1.42", action: "BLOCKED" },
  { type: "XSS", severity: "MED", target: "app.target.com", action: "SANITIZED" },
  { type: "Port Scan", severity: "LOW", target: "10.0.0.15", action: "LOGGED" },
  { type: "Brute Force", severity: "HIGH", target: "ssh://server01", action: "BLOCKED" },
  { type: "Malware", severity: "CRIT", target: "user@workstation", action: "QUARANTINED" },
  { type: "Phishing", severity: "MED", target: "mail.gateway", action: "FILTERED" },
  { type: "DDoS", severity: "HIGH", target: "edge-router", action: "MITIGATED" },
  { type: "CVE-2025-1337", severity: "CRIT", target: "prod-web-01", action: "PATCHED" },
];

const SEVERITY_COLORS = {
  LOW: "#00ff9d",
  MED: "#ff9500",
  HIGH: "#ff3b3b",
  CRIT: "#a855f7",
};

export default function ThreatFeed() {
  const items = [...THREATS, ...THREATS, ...THREATS];

  return (
    <section className="py-8 border-y border-accent/20 bg-bg-secondary/40 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center gap-3 relative z-10">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs font-mono text-accent tracking-widest">
          LIVE THREAT FEED
        </span>
        <span className="text-xs font-mono text-gray-600">// simulated</span>
      </div>

      <div
        className="relative z-10 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="flex whitespace-nowrap threat-marquee">
          {items.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-6 font-mono text-sm shrink-0"
            >
              <span
                className="px-2 py-0.5 rounded text-[10px] font-bold"
                style={{
                  color: SEVERITY_COLORS[t.severity],
                  background: `${SEVERITY_COLORS[t.severity]}20`,
                  border: `1px solid ${SEVERITY_COLORS[t.severity]}60`,
                }}
              >
                {t.severity}
              </span>
              <span className="text-white">{t.type}</span>
              <span className="text-gray-500">→</span>
              <span className="text-accent-blue">{t.target}</span>
              <span className="text-gray-500">→</span>
              <span className="text-accent">[{t.action}]</span>
              <span className="text-gray-700 mx-4">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}