import { useState } from "react";
import { motion } from "framer-motion";
import { FiActivity, FiShield, FiAlertTriangle, FiX, FiChevronDown } from "react-icons/fi";

export default function SOCPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute top-20 left-4 z-20 hidden xl:block"
    >
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="soc-panel rounded-lg px-3 py-2 backdrop-blur-md flex items-center gap-2 hover:border-accent-blue/50 transition-all"
          title="Expand SOC Monitor"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
          </span>
          <span className="text-[10px] font-mono text-accent-blue tracking-widest">
            SOC MONITOR
          </span>
          <FiChevronDown size={10} className="text-gray-500" />
        </button>
      )}

      {expanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="soc-panel p-3 rounded-lg backdrop-blur-md w-52"
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-accent-blue/20">
            <FiActivity size={12} className="text-accent-blue animate-pulse" />
            <span className="text-[10px] font-mono text-accent-blue tracking-widest">
              SOC MONITOR
            </span>
            <button
              onClick={() => setExpanded(false)}
              className="ml-auto text-gray-500 hover:text-accent-blue transition"
              title="Collapse"
            >
              <FiX size={12} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <FiShield size={10} className="text-accent" />
                <span className="text-[10px] font-mono text-gray-500">
                  POSTURE
                </span>
              </div>
              <span className="text-[10px] font-mono text-accent font-bold">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <FiAlertTriangle size={10} className="text-alert-high" />
                <span className="text-[10px] font-mono text-gray-500">
                  ALERTS
                </span>
              </div>
              <span className="text-[10px] font-mono text-alert-high font-bold">
                3 PENDING
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono text-gray-500">
                  STATUS
                </span>
              </div>
              <span className="text-[10px] font-mono text-accent font-bold">
                ONLINE
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}