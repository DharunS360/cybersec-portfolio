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
import ThreatFeed from "./components/ThreatFeed";
import Terminal from "./components/Terminal";
import AttackGlobe from "./components/AttackGlobe";
import AttackSurfaceMap from "./components/AttackSurfaceMap";
import ParticleBg from "./components/ParticleBg";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import SoundToggle from "./components/SoundToggle";
import SOCDashboard from "./components/SOCDashboard";
import CRTWrapper from "./components/CRTWrapper";

export default function App() {
  const [booted, setBooted] = useState(false);

  // 🔥 Fix: Force scroll to top on every page load
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Scroll to top instantly
    window.scrollTo(0, 0);
  }, []);

  // Boot complete aana appuram, scroll to top again
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
          {/* === BACKGROUND LAYERS === */}
          <AttackSurfaceMap />
          <ParticleBg />

          {/* === UI OVERLAYS (fixed) === */}
          <CursorGlow />
          <ScrollProgress />
          <SoundToggle />
          <SOCDashboard />

          {/* === MAIN CONTENT === */}
          <div className="relative z-10">
            <Navbar />
            <Hero />
            <ThreatFeed />
            <Terminal />
            <AttackGlobe />
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