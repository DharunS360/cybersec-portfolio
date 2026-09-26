import { motion } from "framer-motion";
import { about, personal, stats } from "../data/portfolio";
import { FiMapPin, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { useCountUp } from "../hooks/useCountUp";
import {
  FiTerminal,
  FiTarget,
  FiAward,
  FiShield,
} from "react-icons/fi";

const STAT_ICONS = [FiTerminal, FiTarget, FiShield, FiAward];
const STAT_COLORS = ["#00bfff", "#00d4ff", "#a855f7", "#ffb700"];

function StatItem({ icon: Icon, label, value, suffix, color, delay }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass rounded-xl p-6 text-center hover:border-accent-blue/50 transition relative overflow-hidden group"
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

export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-4">
          <span className="text-accent-cyan">●</span> ABOUT
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          About <span className="text-accent-blue">Me</span>
        </h2>
        <div className="w-20 h-1 bg-accent-blue mx-auto mt-4" />
      </motion.div>

      {/* Bio + Social */}
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2"
        >
          <p className="text-gray-300 leading-relaxed text-lg mb-6">{about}</p>
          <div className="flex flex-wrap gap-4 text-sm font-mono">
            <span className="flex items-center gap-2 text-accent-blue">
              <FiMapPin /> {personal.location}
            </span>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 text-accent-cyan hover:underline"
            >
              <FiMail /> {personal.email}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-accent-blue font-mono mb-4 text-sm">
            $ connect --social
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-accent-blue transition"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-accent-blue transition"
            >
              <FiLinkedin /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats (merged) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-3">
          <span className="text-accent-cyan">●</span> METRICS
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <StatItem
            key={s.label}
            icon={STAT_ICONS[i] || FiTerminal}
            label={s.label}
            value={s.value}
            suffix={s.suffix}
            color={STAT_COLORS[i] || "#00bfff"}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  );
}