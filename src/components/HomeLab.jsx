import { motion } from "framer-motion";
import {
  labStatus,
  labStack,
  labScenarios,
  labMetrics,
} from "../data/homeLab";
import {
  FiServer,
  FiMonitor,
  FiTerminal,
  FiShield,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";

const ICON_MAP = {
  SIEM: FiServer,
  "SIEM / EDR": FiServer,
  "Endpoint Logging": FiMonitor,
  "Victim Endpoint": FiMonitor,
  "Victim Server": FiServer,
  "Attacker VM": FiTerminal,
  "Attack Framework": FiZap,
  IDS: FiShield,
};

function StatusBadge({ status }) {
  const map = {
    planned: { label: "PLANNED", color: "#6b7280" },
    learning: { label: "LEARNING", color: "#ff9500" },
    "in-progress": { label: "IN PROGRESS", color: "#00bfff" },
    complete: { label: "COMPLETE", color: "#00ff9d" },
  };
  const s = map[status] || map.planned;
  return (
    <span
      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
      style={{
        color: s.color,
        background: s.color + "20",
        border: "1px solid " + s.color + "60",
      }}
    >
      {s.label}
    </span>
  );
}

export default function HomeLab({ embedded = false }) {
  const content = (
    <>
      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5 mb-8 border border-accent-blue/20 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue">
            <FiServer size={22} />
          </div>
          <div>
            <div className="text-white font-bold text-lg">
              Status: {labStatus.status}
            </div>
            <div className="text-xs font-mono text-gray-500">
              Started: {labStatus.started} · ETA: {labStatus.eta}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          <span className="text-xs font-mono text-accent-blue">
            ACTIVELY BUILDING
          </span>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Lab Uptime", value: labMetrics.uptime },
          { label: "Alerts Processed", value: labMetrics.alertsProcessed },
          { label: "Detections Built", value: labMetrics.detectionsBuilt },
          { label: "Incidents Simulated", value: labMetrics.incidentsSimulated },
        ].map((m) => (
          <div
            key={m.label}
            className="glass rounded-xl p-4 text-center border border-accent-blue/10"
          >
            <div className="text-2xl font-bold font-mono text-accent-blue mb-1">
              {m.value}
            </div>
            <div className="text-[10px] font-mono text-gray-500 uppercase">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <span className="text-accent-blue font-mono">$</span> Lab Stack
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {labStack.map((tool) => {
            const Icon = ICON_MAP[tool.role] || FiServer;
            return (
              <div
                key={tool.id}
                className="glass rounded-xl p-4 border"
                style={{ borderColor: tool.color + "30" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: tool.color + "15",
                      color: tool.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <StatusBadge status={tool.status} />
                </div>
                <div className="text-white font-bold mb-1">{tool.name}</div>
                <div
                  className="text-[10px] font-mono mb-2"
                  style={{ color: tool.color }}
                >
                  {tool.role}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scenarios */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <span className="text-accent-blue font-mono">$</span> Detection Scenarios
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {labScenarios.map((s) => (
            <div
              key={s.id}
              className="glass rounded-xl p-5 border border-accent-blue/20"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-white font-bold">{s.title}</h4>
                <StatusBadge status={s.status} />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.mitre.map((m) => (
                  <span
                    key={m}
                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-accent-purple/10 text-accent-purple border border-accent-purple/30"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap REMOVED */}
    </>
  );

  if (embedded) {
    return <div>{content}</div>;
  }

  return (
    <section id="lab" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-24">
      <div className="text-center mb-12">
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-4">
          <span className="w-2 h-2 inline-block rounded-full bg-accent-blue animate-pulse mr-2" />
          PERSONAL SOC LAB
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          SOC <span className="text-accent-blue">Home Lab</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
          {labStatus.description}
        </p>
        <div className="w-20 h-1 bg-accent-blue mx-auto mt-4" />
      </div>
      {content}
    </section>
  );
}