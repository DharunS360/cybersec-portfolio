import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { fetchThreatFeed, targetLocation } from "../data/attackData";

export default function AttackGlobe() {
  const globeRef = useRef(null);
  const containerRef = useRef(null);
  const [arcs, setArcs] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ monitored: 0, blocked: 0, critical: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [feedInfo, setFeedInfo] = useState({
    isReal: false,
    source: "loading",
    totalIPs: 0,
    lastUpdated: null,
  });
  const [threatPool, setThreatPool] = useState([]);

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.min(650, Math.max(500, rect.width * 0.55)),
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadFeed() {
      const result = await fetchThreatFeed();
      if (!mounted) return;
      setThreatPool(result.locations);
      setFeedInfo({
        isReal: result.isReal,
        source: result.source,
        totalIPs: result.totalIPs,
        lastUpdated: result.lastUpdated,
      });
    }
    loadFeed();
    return () => {
      mounted = false;
    };
  }, []);

  // Globe initialization — key fix for centering
  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 180;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.5;

    // Center camera on globe
    globeRef.current.pointOfView({ lat: 20, lng: 78, altitude: 2.5 }, 0);
  }, [dimensions]);

  useEffect(() => {
    if (threatPool.length === 0) return;

    const generateEvent = () => {
      const threat = threatPool[Math.floor(Math.random() * threatPool.length)];
      if (!threat) return;

      const newArc = {
        id: Date.now() + Math.random(),
        startLat: threat.lat,
        startLng: threat.lng,
        endLat: targetLocation.lat,
        endLng: targetLocation.lng,
        color: [threat.color || "#00bfff", "#00ff9d"],
        source: threat.city,
        ip: threat.ip,
        malware: threat.malware,
        type: threat.type,
        severity: threat.severity,
        timestamp: new Date().toLocaleTimeString(),
        action: "MONITORED",
      };

      setArcs((prev) => [...prev.slice(-12), newArc]);
      setEvents((prev) => [newArc, ...prev.slice(0, 5)]);
      setStats((prev) => ({
        monitored: prev.monitored + 1,
        blocked: prev.blocked + (Math.random() > 0.25 ? 1 : 0),
        critical: prev.critical + (threat.severity === "CRIT" ? 1 : 0),
      }));

      setTimeout(() => {
        setArcs((prev) => prev.filter((a) => a.id !== newArc.id));
      }, 4000);
    };

    generateEvent();
    const interval = setInterval(generateEvent, 2200);
    return () => clearInterval(interval);
  }, [threatPool]);

  return (
    <section id="globe" className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Heading */}
      <div className="mb-8 text-center">
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-4">
          <span className="w-2 h-2 inline-block rounded-full bg-accent-blue animate-pulse mr-2" />
          GLOBAL THREAT MONITORING
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Global <span className="text-accent-blue">Defense Posture</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          {feedInfo.isReal
            ? "Monitoring " +
              feedInfo.totalIPs +
              " active threat indicators from " +
              feedInfo.source
            : "Loading threat intelligence..."}
        </p>
        <div className="w-20 h-1 bg-accent-blue mx-auto mt-4" />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
        <div className="glass rounded-lg p-3 text-center border border-accent-blue/10">
          <div className="text-2xl font-bold font-mono text-accent-blue">
            {stats.monitored}
          </div>
          <div className="text-[10px] font-mono text-gray-500 uppercase">
            Events Monitored
          </div>
        </div>
        <div className="glass rounded-lg p-3 text-center border border-accent-blue/10">
          <div className="text-2xl font-bold font-mono text-accent">
            {stats.blocked}
          </div>
          <div className="text-[10px] font-mono text-gray-500 uppercase">
            Threats Blocked
          </div>
        </div>
        <div className="glass rounded-lg p-3 text-center border border-accent-blue/10">
          <div className="text-2xl font-bold font-mono text-alert-critical">
            {stats.critical}
          </div>
          <div className="text-[10px] font-mono text-gray-500 uppercase">
            Critical Alerts
          </div>
        </div>
      </div>

      {/* Globe container */}
      <div
        ref={containerRef}
        className="glass rounded-xl overflow-hidden relative border border-accent-blue/20 mb-6"
      >
        <div
          style={{
            width: "100%",
            height: dimensions.height + "px",
            background:
              "radial-gradient(ellipse at center, #0a1424 0%, #050810 100%)",
            position: "relative",
          }}
        >
          {/* Star field */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(2px 2px at 20% 30%, #ffffff, transparent), radial-gradient(1px 1px at 60% 70%, #ffffff, transparent), radial-gradient(1px 1px at 80% 10%, #ffffff, transparent), radial-gradient(2px 2px at 40% 80%, #ffffff, transparent), radial-gradient(1px 1px at 90% 50%, #ffffff, transparent), radial-gradient(1px 1px at 10% 60%, #ffffff, transparent), radial-gradient(2px 2px at 50% 20%, #ffffff, transparent), radial-gradient(1px 1px at 70% 40%, #ffffff, transparent)",
              opacity: 0.3,
            }}
          />

          {/* Globe */}
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            atmosphereColor="#00bfff"
            atmosphereAltitude={0.22}
            showAtmosphere={true}
            polygonsData={[]}
            // Country borders (highlighted)
            showGraticules={true}
            arcsData={arcs}
            arcColor="color"
            arcDashLength={0.5}
            arcDashGap={0.15}
            arcDashAnimateTime={1400}
            arcStroke={0.5}
            arcAltitudeAutoScale={0.4}
            labelsData={[
              {
                lat: targetLocation.lat,
                lng: targetLocation.lng,
                text: "HQ",
                color: "#00ff9d",
                size: 0.8,
              },
            ]}
            labelDotRadius={0.5}
            labelColor={() => "#00ff9d"}
            labelResolution={2}
            ringsData={[
              {
                lat: targetLocation.lat,
                lng: targetLocation.lng,
                maxR: 5,
                propagationSpeed: 1.5,
                repeatPeriod: 1500,
              },
            ]}
            ringColor={() => "rgba(0, 255, 157, 0.6)"}
            ringMaxRadius={5}
            ringPropagationSpeed={1.5}
            ringRepeatPeriod={1500}
          />

          {/* HUD corners */}
          <div className="absolute top-4 left-4 text-[10px] font-mono text-accent-blue pointer-events-none">
            ◉ MONITORING
          </div>
          <div className="absolute top-4 right-4 text-[10px] font-mono text-accent flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            DEFENSE ACTIVE
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-500 pointer-events-none">
            SOC: {feedInfo.source.toUpperCase()}
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-accent-blue pointer-events-none">
            {feedInfo.lastUpdated
              ? new Date(feedInfo.lastUpdated).toLocaleString()
              : "syncing..."}
          </div>

          {/* Defense log overlay — bottom-right */}
          <div className="absolute bottom-12 right-4 w-80 max-h-[240px] glass-strong rounded-lg border border-accent-blue/20 p-3 z-10 hidden lg:block">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-accent-blue/10">
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-[10px] font-mono text-accent-blue tracking-widest">
                DEFENSE LOG
              </span>
              <span className="ml-auto text-[10px] font-mono text-gray-500">
                {events.length}/6
              </span>
            </div>
            <div className="space-y-1.5 overflow-y-auto max-h-[180px] pr-1">
              {events.slice(0, 4).map((evt) => (
                <div
                  key={evt.id}
                  className="text-[10px] font-mono border-l-2 pl-2 py-0.5"
                  style={{
                    borderColor:
                      evt.severity === "CRIT"
                        ? "#ff3b3b"
                        : evt.severity === "HIGH"
                        ? "#ff9500"
                        : evt.severity === "MED"
                        ? "#ffb700"
                        : "#00bfff",
                  }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-gray-500">[{evt.timestamp}]</span>
                    <span
                      className="text-[8px] font-bold px-1 py-0.5 rounded"
                      style={{
                        color:
                          evt.severity === "CRIT"
                            ? "#ff3b3b"
                            : evt.severity === "HIGH"
                            ? "#ff9500"
                            : evt.severity === "MED"
                            ? "#ffb700"
                            : "#00bfff",
                        background: "rgba(255,255,255,0.05)",
                      }}
                    >
                      {evt.severity}
                    </span>
                  </div>
                  <div className="text-white text-[10px]">
                    {evt.type} — {evt.ip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-alert-critical" />
          <span className="text-gray-400">Critical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-alert-high" />
          <span className="text-gray-400">High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-alert-medium" />
          <span className="text-gray-400">Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-blue" />
          <span className="text-gray-400">Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-gray-400">Blocked</span>
        </div>
      </div>
    </section>
  );
}