import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  commands,
  commandNames,
  WELCOME,
} from "../data/terminalCommands";
import { personal } from "../data/portfolio";
import useSound from "../hooks/useSound";

gsap.registerPlugin(ScrollTrigger);

const PROMPT = "analyst@soc-lab:~$";

export default function Terminal() {
  const [history, setHistory] = useState([...WELCOME]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const containerRef = useRef(null);

  const { keypress, commandBeep, error, success } = useSound();

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
    setHasInteracted(true);
  };

  const handleCommand = (raw) => {
    const trimmed = raw.trim();
    const newLines = [...history];
    newLines.push(`${PROMPT} ${trimmed}`);

    if (!trimmed) {
      setHistory(newLines);
      return;
    }

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === "sudo" && args[0] === "hire-me") {
      const result = commands["sudo hire-me"].execute();
      newLines.push(...result);
      setHistory(newLines);
      success();
      setTimeout(() => {
        window.location.href = `mailto:${personal.email}?subject=Hire Me — Dharun&body=Hi Dharun, I would like to discuss an opportunity.`;
      }, 1500);
      return;
    }

    const command = commands[cmd];

    if (!command) {
      newLines.push(
        `bash: ${cmd}: command not found`,
        "Type 'help' for available commands"
      );
      setHistory(newLines);
      error();
      return;
    }

    const result = command.execute(args);
    commandBeep();

    if (result === "CLEAR") {
      setHistory([]);
      return;
    }

    if (Array.isArray(result)) {
      newLines.push(...result);
    } else if (typeof result === "string") {
      newLines.push(result);
    }

    setHistory(newLines);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      commandBeep();
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
      keypress();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
      keypress();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const match = commandNames.find((c) => c.startsWith(partial));
      if (match) setInput(match);
      keypress();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    keypress();
  };

  return (
    <section
      ref={containerRef}
      id="terminal"
      className="py-20 px-6 max-w-5xl mx-auto scroll-mt-24"
    >
      <div className="mb-8 text-center">
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-4">
          <span className="text-accent-cyan">●</span> INTERACTIVE SOC CONSOLE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Blue Team <span className="text-accent-blue">Console</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Simulated SOC environment. Type{" "}
          <span className="text-accent-blue font-mono">help</span> to explore.
        </p>
        <div className="w-20 h-1 bg-accent-blue mx-auto mt-4" />
      </div>

      <div className="glass-strong rounded-xl shadow-2xl overflow-hidden border border-accent-blue/20">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-accent-blue/20 bg-black/40">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-mono text-gray-500">
            analyst@soc-lab: ~ — SOC Console
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono text-accent">SHIFT ACTIVE</span>
          </div>
        </div>

        <div
          ref={bodyRef}
          onClick={focusInput}
          className="h-[480px] overflow-y-auto px-5 py-4 font-mono text-sm bg-black/60 cursor-text"
          style={{ scrollbarWidth: "thin" }}
        >
          {history.map((line, i) => (
            <div
              key={i}
              className={
                "whitespace-pre-wrap leading-relaxed " +
                (line.startsWith(PROMPT)
                  ? "text-accent-blue"
                  : line.includes("✓") || line.includes("●")
                  ? "text-accent"
                  : line.includes("[CRIT]")
                  ? "text-alert-critical"
                  : line.includes("[HIGH]")
                  ? "text-alert-high"
                  : line.includes("[MED]")
                  ? "text-alert-medium"
                  : line.includes("[LOW]")
                  ? "text-alert-low"
                  : line.includes("🎉") || line.includes("🔥")
                  ? "text-accent-amber"
                  : line.startsWith("bash:")
                  ? "text-red-400"
                  : "text-gray-300")
              }
            >
              {line || "\u00A0"}
            </div>
          ))}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-accent-blue shrink-0">{PROMPT}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent outline-none text-white caret-accent-blue font-mono"
            />
          </div>
        </div>

        <div className="px-4 py-2 border-t border-accent-blue/20 bg-black/40 flex flex-wrap gap-4 text-[10px] font-mono text-gray-500">
          <span>
            <span className="text-accent-blue">↑↓</span> history
          </span>
          <span>
            <span className="text-accent-blue">Tab</span> autocomplete
          </span>
          <span>
            <span className="text-accent-blue">Ctrl+L</span> clear
          </span>
          <span className="ml-auto text-accent-blue">
            try: "alerts" or "triage"
          </span>
        </div>
      </div>
    </section>
  );
}