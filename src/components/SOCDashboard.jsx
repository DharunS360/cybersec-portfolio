import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertTriangle,
  FiActivity,
  FiClock,
  FiAward,
  FiTrendingUp,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

const ACHIEVEMENTS = [
  { id: 1, label: "First Blood", icon: "🩸", description: "Scrolled to projects" },
  { id: 2, label: "Lurker No More", icon: "👀", description: "Visited SOC Lab" },
  { id: 3, label: "Terminal Master", icon: "💻", description: "Ran a command" },
  { id: 4, label: "Global Threat", icon: "🌍", description: "Viewed defense globe" },
  { id: 5, label: "Recruiter", icon: "💼", description: "Reached contact section" },
];

export default function SOCDashboard() {
  // Default: collapsed (not expanded)
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [shiftTime, setShiftTime] = useState(0);
  const [alerts, setAlerts] = useState(3);
  const [triaged, setTriaged] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [threatLevel, setThreatLevel] = useState("ELEVATED");
  const [achievements, setAchievements] = useState([]);
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setShiftTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAlerts((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = Math.max(1, Math.min(12, prev + change));
        if (change === -1) {
          setTriaged((t) => t + 1);
          setXp((x) => {
            const newXp = x + 10;
            if (newXp >= 100) {
              setLevel((l) => Math.min(10, l + 1));
              return newXp - 100;
            }
            return newXp;
          });
        }
        return newValue;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (alerts <= 2) setThreatLevel("LOW");
    else if (alerts <= 5) setThreatLevel("ELEVATED");
    else if (alerts <= 8) setThreatLevel("HIGH");
    else setThreatLevel("SEVERE");
  }, [alerts]);

  useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById("projects");
      if (projectsEl && !achievements.find((a) => a.id === 1)) {
        const rect = projectsEl.getBoundingClientRect();
        if (rect.top < window.innerHeight) unlockAchievement(1);
      }
      const labEl = document.getElementById("labs") || document.getElementById("lab");
      if (labEl && !achievements.find((a) => a.id === 2)) {
        const rect = labEl.getBoundingClientRect();
        if (rect.top < window.innerHeight) unlockAchievement(2);
      }
      const contactEl = document.getElementById("contact");
      if (contactEl && !achievements.find((a) => a.id === 5)) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top < window.innerHeight) unlockAchievement(5);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [achievements]);

  useEffect(() => {
    const handleCommand = () => {
      if (!achievements.find((a) => a.id === 3)) unlockAchievement(3);
    };
    window.addEventListener("terminal:command", handleCommand);
    return () => window.removeEventListener("terminal:command", handleCommand);
  }, [achievements]);

  useEffect(() => {
    const handleGlobe = () => {
      if (!achievements.find((a) => a.id === 4)) unlockAchievement(4);
    };
    window.addEventListener("globe:viewed", handleGlobe);
    return () => window.removeEventListener("globe:viewed", handleGlobe);
  }, [achievements]);

  const unlockAchievement = (id) => {
    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;
    setAchievements((prev) => [...prev, ach]);
    setShowNotification(ach);
    setXp((x) => {
      const newXp = x + 25;
      if (newXp >= 100) {
        setLevel((l) => Math.min(10, l + 1));
        return newXp - 100;
      }
      return newXp;
    });
    setTimeout(() => setShowNotification(null), 4000);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  };

  const threatColors = {
    LOW: "#00ff9d",
    ELEVATED: "#00bfff",
    HIGH: "#ff9500",
    SEVERE: "#ff3b3b",
  };

  if (!visible) return null;

  return (
    <>
      {/* Collapsed pill — always visible */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed top-20 left-4 z-[9997] hidden lg:block"
      >
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="glass-strong rounded-full pl-3 pr-4 py-2 border border-accent-blue/30 hover:border-accent-blue flex items-center gap-2 transition-all group"
            title="Open SOC Dashboard"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-blue"></span>
            </span>
            <span className="text-[10px] font-mono text-accent-blue tracking-widest">
              SOC
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              {alerts}
            </span>
          </button>
        )}

        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-xl border border-accent-blue/30 overflow-hidden min-w-[240px] shadow-[0_0_30px_rgba(0,191,255,0.2)]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-accent-blue/20 bg-black/40">
              <FiActivity size={14} className="text-accent-blue animate-pulse" />
              <span className="text-[10px] font-mono text-accent-blue tracking-widest">
                SOC DASHBOARD
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="ml-auto text-gray-500 hover:text-accent-blue transition"
                title="Collapse"
              >
                <FiX size={14} />
              </button>
            </div>

            <div className="p-3 space-y-3">
              {/* Threat Level */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-gray-500">
                    THREAT LEVEL
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold animate-pulse"
                    style={{ color: threatColors[threatLevel] }}
                  >
                    ● {threatLevel}
                  </span>
                </div>
                <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width:
                        threatLevel === "LOW"
                          ? "25%"
                          : threatLevel === "ELEVATED"
                          ? "50%"
                          : threatLevel === "HIGH"
                          ? "75%"
                          : "100%",
                      background: threatColors[threatLevel],
                      boxShadow: "0 0 10px " + threatColors[threatLevel],
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FiAlertTriangle size={12} className="text-alert-high" />
                  <span className="text-[10px] font-mono text-gray-500">
                    QUEUE
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-alert-high">
                  {alerts} pending
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FiCheckCircle size={12} className="text-accent" />
                  <span className="text-[10px] font-mono text-gray-500">
                    TRIAGED
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-accent">
                  {triaged + 247}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FiClock size={12} className="text-accent-blue" />
                  <span className="text-[10px] font-mono text-gray-500">
                    SHIFT
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-accent-blue">
                  {formatTime(shiftTime)}
                </span>
              </div>

              <div className="pt-2 border-t border-accent-blue/10">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <FiTrendingUp size={12} className="text-accent-purple" />
                    <span className="text-[10px] font-mono text-gray-500">
                      LEVEL {level}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-accent-purple">
                    {xp}/100 XP
                  </span>
                </div>
                <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-purple transition-all duration-300"
                    style={{
                      width: xp + "%",
                      boxShadow: "0 0 8px #a855f7",
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-accent-blue/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <FiAward size={12} className="text-accent-amber" />
                    <span className="text-[10px] font-mono text-gray-500">
                      ACHIEVEMENTS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-accent-amber">
                    {achievements.length}/{ACHIEVEMENTS.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {ACHIEVEMENTS.map((a) => {
                    const unlocked = achievements.find((x) => x.id === a.id);
                    return (
                      <span
                        key={a.id}
                        title={a.label}
                        className={
                          "text-base transition-all " +
                          (unlocked ? "opacity-100" : "opacity-20 grayscale")
                        }
                      >
                        {a.icon}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-accent-blue/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono text-accent">
                  AVAILABLE FOR HIRE
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Achievement notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-20 right-4 z-[9999] glass-strong rounded-xl border border-accent-amber/40 p-4 min-w-[280px] shadow-[0_0_30px_rgba(255,183,0,0.3)]"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{showNotification.icon}</div>
              <div className="flex-1">
                <div className="text-[10px] font-mono text-accent-amber tracking-widest mb-1">
                  ★ ACHIEVEMENT UNLOCKED
                </div>
                <div className="text-white font-bold text-sm mb-0.5">
                  {showNotification.label}
                </div>
                <div className="text-[10px] font-mono text-gray-500">
                  {showNotification.description}
                </div>
              </div>
              <div className="text-[10px] font-mono text-accent-amber">
                +25 XP
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}