import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGrid, FiShare2, FiTool } from "react-icons/fi";
import { skills } from "../data/portfolio";
import SkillGraph from "./SkillGraph";

const TABS = [
  { id: "grid", label: "Grid", icon: FiGrid },
  { id: "graph", label: "Graph", icon: FiShare2 },
  { id: "tools", label: "Tools", icon: FiTool },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("grid");

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-8">
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-4">
          <span className="text-accent-cyan">●</span> CAPABILITIES
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Technical <span className="text-accent-blue">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-accent-blue mx-auto" />
      </div>

      {/* Tab bar */}
      <div className="flex justify-center mb-8">
        <div className="glass-strong rounded-lg p-1 flex gap-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={
                  "flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs transition-all " +
                  (active
                    ? "bg-accent-blue text-black"
                    : "text-gray-400 hover:text-accent-blue")
                }
              >
                <Icon size={12} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Object.entries(skills).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-6 hover:border-accent-blue/50 transition"
              >
                <h3 className="text-accent-blue font-mono text-sm mb-4">
                  <span className="text-gray-500">//</span> {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 bg-accent-blue/10 text-accent-blue rounded-md font-mono border border-accent-blue/20 hover:bg-accent-blue/20 transition cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "graph" && (
          <motion.div
            key="graph"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <SkillGraph embedded />
          </motion.div>
        )}

        {activeTab === "tools" && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {Object.entries(skills).map(([category, items], i) => (
              <div
                key={category}
                className="glass rounded-xl p-5 border border-accent-blue/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-accent-blue tracking-widest">
                    {category.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    {items.length} tools
                  </span>
                </div>
                <div className="space-y-2">
                  {items.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-accent-blue/5 last:border-0"
                    >
                      <span className="text-gray-300">▸ {skill}</span>
                      <span className="w-2 h-2 rounded-full bg-accent-blue/60" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}