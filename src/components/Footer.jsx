import { personal } from "../data/portfolio";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent-blue/20 bg-black/40 backdrop-blur-sm relative">
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00bfff, #00d4ff, #00bfff, transparent)",
          boxShadow: "0 0 10px #00bfff",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md glass flex items-center justify-center text-accent-blue">
                <span className="font-mono text-sm font-bold">D</span>
              </div>
              <div>
                <div className="font-mono text-accent-blue font-bold text-sm">
                  {personal.name}
                </div>
                <div className="text-[10px] font-mono text-gray-500">
                  {personal.title}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Blue team analyst focused on threat detection, incident response,
              and defensive security operations.
            </p>
          </div>

          {/* Center: Status */}
          <div>
            <div className="text-[10px] font-mono text-accent-blue tracking-widest mb-3">
              SYSTEM STATUS
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-gray-400">Portfolio:</span>
                <span className="text-accent">Operational</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                <span className="text-gray-400">SOC Lab:</span>
                <span className="text-accent-blue">In Progress</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-gray-400">Available:</span>
                <span className="text-accent">Yes</span>
              </div>
            </div>
          </div>

          {/* Right: Connect */}
          <div>
            <div className="text-[10px] font-mono text-accent-blue tracking-widest mb-3">
              CONNECT
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-accent-blue transition"
              >
                <FiMail size={12} /> {personal.email}
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-accent-blue transition"
              >
                <FiGithub size={12} /> GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-accent-blue transition"
              >
                <FiLinkedin size={12} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent-blue/10 pt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Copyright */}
          <div className="text-[10px] font-mono text-gray-500">
            <span className="text-accent-blue">©</span> {year}{" "}
            <span className="text-gray-400">{personal.name}</span>
            <span className="mx-2 text-gray-700">|</span>
            <span>All Rights Reserved</span>
          </div>

          {/* Center: Signature */}
          <div className="text-[10px] font-mono text-gray-600">
            <span className="text-gray-700">$</span>{" "}
            <span className="text-gray-500">designed & developed by</span>{" "}
            <span className="text-accent-blue">{personal.name}</span>
          </div>

          {/* Right: Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-accent-blue transition group"
            title="Back to top"
          >
            <span>BACK TO TOP</span>
            <span className="w-6 h-6 rounded border border-accent-blue/30 flex items-center justify-center group-hover:border-accent-blue group-hover:bg-accent-blue/10 transition">
              <FiArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}