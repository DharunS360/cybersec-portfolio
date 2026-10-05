import { useState, useEffect } from "react";
import BootSequence from "./components/BootSequence";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Labs from "./components/Labs";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Terminal from "./components/Terminal";
import AttackSurfaceMap from "./components/AttackSurfaceMap";
import ParticleBg from "./components/ParticleBg";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import SoundToggle from "./components/SoundToggle";
import CRTWrapper from "./components/CRTWrapper";

export default function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (booted) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [booted]);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <CRTWrapper>
        <div className="relative bg-bg-primary min-h-screen noise">
          <AttackSurfaceMap />
          <ParticleBg />
          <CursorGlow />
          <ScrollProgress />
          <SoundToggle />

          <div className="relative z-10">
            <Navbar />
            <Hero />
            <Terminal />
            <About />
            <Skills />
            <Labs />
            <Projects />
            <Certifications />
            <Experience />
            <Contact />
            <Footer />
          </div>
        </div>
      </CRTWrapper>
    </>
  );
}