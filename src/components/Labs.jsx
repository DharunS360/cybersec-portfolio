import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiServer, FiShield } from "react-icons/fi";
import HomeLab from "./HomeLab";
import MalwareLab from "./MalwareLab";

const TABS = [
  { id: "soc", label: "SOC Lab", icon: FiServer, color: "#00bfff" },
  { id: "malware", label: "Malware Lab", icon: FiShield, color: "#a855f7" },
];

export default function Labs() {
  const [activeTab, setActiveTab] = useState("soc");

  return (
    <section id="labs" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Tab bar */}
      <div className="flex justify-center mb-10">
        <div className="glass-strong rounded-lg p-1 flex gap-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={
                  "flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-xs transition-all " +
                  (active
                    ? "bg-accent-blue text-black shadow-[0_0_15px_rgba(0,191,255,0.4)]"
                    : "text-gray-400 hover:text-accent-blue")
                }
              >
                <Icon size={13} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "soc" && (
          <motion.div
            key="soc"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <HomeLab embedded />
          </motion.div>
        )}
        {activeTab === "malware" && (
          <motion.div
            key="malware"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <MalwareLab embedded />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}