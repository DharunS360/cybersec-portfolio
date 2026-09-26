import { useState, useEffect } from "react";
import { personal } from "../data/portfolio";
import { HiMenu, HiX } from "react-icons/hi";
import { FiTerminal } from "react-icons/fi";
import useScramble from "../hooks/useScramble";
import useSound from "../hooks/useSound";

const links = [
  { name: "about", href: "#about" },
  { name: "skills", href: "#skills" },
  { name: "labs", href: "#labs" },
  { name: "projects", href: "#projects" },
  { name: "certs", href: "#certs" },
  { name: "experience", href: "#experience" },
  { name: "contact", href: "#contact" },
];

function NavLink({ name, href, onHoverSound, onClickSound }) {
  const { display, scramble } = useScramble(name, { trigger: "hover" });

  return (
    <a
      href={href}
      onMouseEnter={() => {
        scramble();
        onHoverSound();
      }}
      onClick={onClickSound}
      className="text-gray-300 hover:text-accent-blue font-mono text-sm transition relative group"
    >
      <span className="text-accent-blue">#</span>
      <span className="ml-0.5">{display}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan group-hover:w-full transition-all duration-300" />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { hover, click } = useSound();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map((l) => l.href.slice(1));
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      setActive(current || "");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong py-3 shadow-[0_4px_30px_rgba(0,191,255,0.1)]"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md glass flex items-center justify-center text-accent-blue group-hover:animate-glow-blue transition">
            <FiTerminal size={14} />
          </div>
          <span className="font-mono text-accent-blue text-base font-bold">
            <span className="text-accent-cyan">&lt;</span>
            {personal.firstName}
            <span className="text-accent-cyan">/&gt;</span>
          </span>
          <span className="hidden md:inline text-[10px] font-mono text-gray-500 ml-2 px-2 py-0.5 border border-accent-blue/20 rounded">
            SOC v1.0
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.name}
              {...l}
              onHoverSound={hover}
              onClickSound={click}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>online</span>
          </div>

          <button
            onClick={() => {
              click();
              setOpen(!open);
            }}
            className="lg:hidden text-accent-blue text-2xl"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass-strong mt-3 mx-4 rounded-xl p-4 flex flex-col gap-3 animate-fade-in-up">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => {
                click();
                setOpen(false);
              }}
              className={`font-mono text-sm py-2 px-3 rounded-md transition ${
                active === l.href.slice(1)
                  ? "bg-accent-blue/10 text-accent-blue"
                  : "text-gray-300 hover:text-accent-blue"
              }`}
            >
              <span className="text-accent-blue">#</span>
              {l.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}