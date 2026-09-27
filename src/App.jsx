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

          {/* === MAIN CONTENT (proper order) === */}
          <div className="relative z-10">
            {/* 1. Navbar (fixed top) */}
            <Navbar />

            {/* 2. Hero (Shield + Name + Terminal) */}
            <Hero />

            {/* 3. Threat Feed (marquee) */}
            <ThreatFeed />

            {/* 4. Terminal (interactive SOC console) */}
            <Terminal />

            {/* 5. Attack Globe (3D earth) */}
            <AttackGlobe />

            {/* 6. About (Avatar + Bio + Stats) */}
            <About />

            {/* 7. Skills (Tabs: Grid | Graph | Tools) */}
            <Skills />

            {/* 8. Labs (Tabs: SOC | Malware) */}
            <Labs />

            {/* 9. Projects */}
            <Projects />

            {/* 10. Certifications */}
            <Certifications />

            {/* 11. Experience */}
            <Experience />

            {/* 12. Contact */}
            <Contact />

            {/* 13. Footer */}
            <Footer />
          </div>
        </div>
      </CRTWrapper>
    </>
  );
}