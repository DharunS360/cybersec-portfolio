import { motion } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";
import { FiShield, FiTarget, FiAward, FiTerminal } from "react-icons/fi";

const STATS = [
  { icon: FiTerminal, label: "CTF Challenges", value: 120, suffix: "+", color: "#00ff9d" },
  { icon: FiTarget, label: "Vulns Found", value: 45, suffix: "+", color: "#00d4ff" },
  { icon: FiShield, label: "Machines Owned", value: 75, suffix: "+", color: "#a855f7" },
  { icon: FiAward, label: "Certifications", value: 4, suffix: "", color: "#ff9500" },
];

function StatItem({ icon: Icon, label, value, suffix, color, delay }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass rounded-xl p-6 text-center hover:border-accent/50 transition relative overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}20, transparent 70%)`,
        }}
      />
      <div className="text-3xl mb-3 flex justify-center" style={{ color }}>
        <Icon />
      </div>
      <div
        className="text-4xl font-bold font-mono mb-1"
        style={{ color, textShadow: `0 0 20px ${color}80` }}
      >
        {count}
        {suffix}
      </div>
      <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent mb-4">
          <span className="text-accent-blue">●</span> LIVE METRICS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          By The <span className="text-accent">Numbers</span>
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}