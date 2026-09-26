// Real threat intel from abuse.ch (via GitHub Action / Python script)
// Fallback to embedded data if fetch fails

export const targetLocation = {
  name: "Your Location",
  lat: 13.0827,
  lng: 80.2707,
  country: "IN",
};

// Fallback data (if threat-feed.json fetch fails)
const FALLBACK_LOCATIONS = [
  {
    ip: "162.243.103.246",
    malware: "Emotet",
    source: "feodo",
    city: "Ashburn",
    lat: 39.0438,
    lng: -77.4874,
    type: "Malware C2",
    severity: "CRIT",
    color: "#a855f7",
  },
  {
    ip: "50.16.16.211",
    malware: "QakBot",
    source: "feodo",
    city: "Ashburn",
    lat: 39.0438,
    lng: -77.4874,
    type: "Botnet",
    severity: "HIGH",
    color: "#ff3b3b",
  },
  {
    ip: "34.204.119.63",
    malware: "QakBot",
    source: "feodo",
    city: "Ashburn",
    lat: 39.0438,
    lng: -77.4874,
    type: "Botnet",
    severity: "HIGH",
    color: "#ff3b3b",
  },
  {
    ip: "178.62.3.223",
    malware: "QakBot",
    source: "feodo",
    city: "Amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    type: "Botnet",
    severity: "HIGH",
    color: "#ff3b3b",
  },
  {
    ip: "27.133.154.218",
    malware: "QakBot",
    source: "feodo",
    city: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    type: "Botnet",
    severity: "HIGH",
    color: "#ff3b3b",
  },
];

export const threatTypes = [
  { type: "Malware C2", color: "#a855f7", severity: "CRIT" },
  { type: "Botnet", color: "#ff3b3b", severity: "HIGH" },
  { type: "Trojan", color: "#ff9500", severity: "HIGH" },
  { type: "Ransomware", color: "#ff3b3b", severity: "CRIT" },
  { type: "Phishing", color: "#ff9500", severity: "MED" },
  { type: "Malware", color: "#00d4ff", severity: "HIGH" },
];

/**
 * Fetch real threat data from public/threat-feed.json
 * Returns: { locations, lastUpdated, totalIPs, source, isReal }
 */
export async function fetchThreatFeed() {
  try {
    const res = await fetch("/threat-feed.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    if (!data.locations || data.locations.length === 0) {
      throw new Error("Empty feed");
    }

    return {
      locations: data.locations,
      lastUpdated: data.lastUpdated,
      totalIPs: data.totalIPs,
      source: data.source,
      isReal: true,
    };
  } catch (err) {
    console.warn("[ThreatFeed] Using fallback:", err.message);
    return {
      locations: FALLBACK_LOCATIONS,
      lastUpdated: new Date().toISOString(),
      totalIPs: FALLBACK_LOCATIONS.length,
      source: "fallback",
      isReal: false,
    };
  }
}