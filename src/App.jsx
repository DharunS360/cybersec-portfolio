import { useState } from "react";
import BootSequence from "./components/BootSequence";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Terminal from "./components/Terminal";
import AttackGlobe from "./components/AttackGlobe";
import Skills from "./components/Skills";
import Labs from "./components/Labs";
import About from "./components/About";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThreatFeed from "./components/ThreatFeed";
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
          <AttackSurfaceMap />
          <ParticleBg />
          <CursorGlow />
          <ScrollProgress />
          <SoundToggle />
          <SOCDashboard />

          <div className="relative z-10">
            <Navbar />
            <Hero />
            <ThreatFeed />
            <Terminal />
            <AttackGlobe />
            <Skills />
            <Labs />
            <About />
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