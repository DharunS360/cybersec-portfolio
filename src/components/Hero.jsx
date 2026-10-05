import { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "../data/portfolio";
import { FiDownload, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import useSound from "../hooks/useSound";
import useIsMobile from "../hooks/useIsMobile";
import GlitchText from "./GlitchText";
import RansomText from "./RansomText";
import Hero3D from "./three/Hero3D";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const { click, hover } = useSound();
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }

      gsap.to(titleRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-24 pb-12"
    >
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
      )}

      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,191,255,0.12),transparent_60%)] pointer-events-none z-[1]" />

      <div className="max-w-7xl w-full flex items-center justify-center relative z-10">
        <div ref={titleRef} className="max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-accent-blue mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>blue team · available for opportunities</span>
          </motion.div>

          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="barcode-deco" />
            <span className="text-[10px] font-mono text-gray-500 rotate-label">
              /// SOC_L1 /// 2026 ///
            </span>
          </div>

          <p className="text-accent-blue font-mono mb-3 text-sm">
            <span className="text-gray-500">$</span> whoami
            <span className="inline-block w-2 h-4 bg-accent-blue ml-1 animate-pulse align-middle" />
          </p>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <GlitchText
              text={personal.firstName}
              intensity="low"
              className="inline-block"
            />{" "}
            <RansomText text={personal.lastName} />
          </h1>

          <TypeAnimation
            sequence={[
              "SOC L1 Analyst",
              2000,
              "Blue Team Analyst",
              2000,
              "Threat Detection Engineer",
              2000,
              "Incident Responder",
              2000,
            ]}
            wrapper="p"
            className="text-2xl md:text-3xl text-accent-cyan font-mono mb-8"
            repeat={Infinity}
          />

          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed text-lg">
            {personal.subtitle} — monitoring, detecting, and defending the
            digital frontier from {personal.location}.
          </p>

          <div className="flex flex-wrap gap-4 mb-10 justify-center">
            <a
              href={personal.resume}
              download
              onClick={click}
              onMouseEnter={hover}
              className="group flex items-center gap-2 px-6 py-3 bg-accent-blue text-black font-semibold rounded-lg hover:shadow-[0_0_30px_#00bfff] transition-all relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FiDownload /> Resume
            </a>
            <a
              href="#contact"
              onClick={click}
              onMouseEnter={hover}
              className="flex items-center gap-2 px-6 py-3 border border-accent-blue/50 text-accent-blue rounded-lg hover:bg-accent-blue/10 hover:border-accent-blue transition"
            >
              <FiMail /> Contact
            </a>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <span className="text-xs font-mono text-gray-500">$ connect:</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              onClick={click}
              onMouseEnter={hover}
              className="text-gray-400 hover:text-accent-blue transition text-xl"
            >
              <FiGithub />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={click}
              onMouseEnter={hover}
              className="text-gray-400 hover:text-accent-blue transition text-xl"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-accent-blue z-10"
      >
        <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
        <span className="text-2xl">↓</span>
      </motion.div>
    </section>
  );
}