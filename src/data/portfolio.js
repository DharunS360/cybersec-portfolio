export const personal = {
  name: "Dharun S",
  firstName: "Dharun",
  lastName: "S",
  title: "SOC L1 Analyst",
  tagline: "Entry-Level Cyber Security Professional",
  subtitle: "PenTest+ Certified | Threat Intelligence | SIEM Monitoring",
  email: "dharuns276@gmail.com",
  location: "Karur, Tamil Nadu, India",
  github: "https://github.com/DharunS360",
  linkedin: "https://www.linkedin.com/in/dharun-/",
  letsdefend: "https://app.letsdefend.io/user/dharunshanmugam",
  resume: "/resume.pdf",
};

export const about = `SOC L1 Analyst aspirant with hands-on experience in SIEM monitoring, threat detection, and incident response. CompTIA PenTest+ certified, with practical skills in Splunk, Wazuh, Sysmon, and MITRE ATT&CK framework. Passionate about blue team operations, detection engineering, and building security labs to simulate real-world threats.`;

export const stats = [
  { label: "Alerts Triaged", value: 500, suffix: "+" },
  { label: "Detection Rules", value: 25, suffix: "+" },
  { label: "LetsDefend Challenges", value: 40, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "" },
];

export const skills = {
  "SIEM & Log Mgmt": ["Splunk", "Wazuh", "ELK Stack", "Sysmon", "Windows Event Logs"],
  "Detection Engineering": ["Snort", "Suricata", "YARA", "Sigma Rules", "MITRE ATT&CK"],
  "Threat Intelligence": ["MISP", "VirusTotal", "Shodan", "AbuseIPDB", "OTX"],
  "Incident Response": ["Wireshark", "Volatility", "Autopsy", "NIST 800-61"],
  Languages: ["Python", "Bash", "PowerShell", "SQL"],
  "OS & Platforms": ["Windows Server", "Ubuntu", "Kali Linux", "Docker"],
};

export const projects = [
  {
    id: 1,
    title: "Real-Time Threat Intelligence Pipeline",
    category: "Threat Intel",
    description:
      "Python + GitHub Actions pipeline that fetches 2000+ malicious IPs daily from abuse.ch (Feodo, URLhaus, ThreatFox) and visualizes them in a 3D defense globe.",
    stack: ["Python", "GitHub Actions", "React", "Three.js"],
    link: "https://github.com/DharunS360/threat-intel-pipeline",
  },
  {
    id: 2,
    title: "SOC Home Lab — Wazuh + Sysmon",
    category: "SOC",
    description:
      "Personal SOC lab with Wazuh SIEM, Sysmon endpoint monitoring, and Atomic Red Team attack simulations mapped to MITRE ATT&CK.",
    stack: ["Wazuh", "Sysmon", "Splunk", "Atomic Red Team"],
    link: "https://github.com/DharunS360/soc-home-lab",
  },
  {
    id: 3,
    title: "Malware Analysis Lab",
    category: "Forensics",
    description:
      "Isolated REMnux + FlareVM lab for static and dynamic malware analysis with IOC extraction and YARA rule development.",
    stack: ["REMnux", "FlareVM", "INetSim", "YARA"],
    link: "https://github.com/DharunS360/malware-analysis-lab",
  },
  {
    id: 4,
    title: "LetsDefend SOC Challenges",
    category: "SOC",
    description:
      "Completed 40+ LetsDefend SOC analyst challenges covering phishing analysis, malware triage, and incident response workflows.",
    stack: ["LetsDefend", "Splunk", "MITRE ATT&CK"],
    link: "https://app.letsdefend.io/user/dharunshanmugam",
  },
  {
    id: 5,
    title: "Phishing URL Detector",
    category: "Web",
    description:
      "ML model achieving 97% accuracy in detecting phishing URLs using Random Forest + feature engineering on 50k dataset.",
    stack: ["Python", "scikit-learn", "Flask"],
    link: "https://github.com/DharunS360/phish-detect",
  },
  {
    id: 6,
    title: "SOC Automation Dashboard",
    category: "SOC",
    description:
      "Web dashboard that aggregates alerts from multiple SIEMs, enriches IOCs via VirusTotal, and visualizes threat trends in real-time.",
    stack: ["React", "Node.js", "Splunk API", "VirusTotal API"],
    link: "https://github.com/DharunS360/soc-dashboard",
  },
];

export const certifications = [
  {
    name: "CompTIA PenTest+ ce",
    full: "Penetration Testing Certification",
    issuer: "CompTIA",
    year: "2024 - 2027",
    status: "Active",
    color: "#ff3b3b",
  },
  {
    name: "Foundation Level Threat Intelligence Analyst",
    full: "Threat Intelligence Analyst",
    issuer: "arcX",
    year: "2024",
    status: "Active",
    color: "#a855f7",
  },
  {
    name: "Google Cybersecurity Certificate",
    full: "Professional Cybersecurity Program",
    issuer: "Google",
    year: "2025",
    status: "Active",
    color: "#00bfff",
  },
  {
    name: "SOC Level 1 Path",
    full: "SOC Analyst Learning Path",
    issuer: "LetsDefend",
    year: "2024",
    status: "Completed",
    color: "#00ff9d",
  },
];

export const experience = [
  {
    role: "Cyber Security Intern",
    company: "Cyber Security Firm",
    duration: "2024 - 2025",
    points: [
      "Conducted VAPT on 20+ web applications using Burp Suite and Nmap",
      "Identified 15+ critical vulnerabilities (CVSS 8.0+) and authored detailed reports",
      "Assisted in SOC L1 monitoring using Splunk, triaging 200+ daily alerts",
    ],
  },
  {
    role: "SOC Analyst Trainee",
    company: "Security Operations Center",
    duration: "2024",
    points: [
      "Monitored 500+ daily SIEM alerts, escalated critical incidents",
      "Performed threat hunting using MITRE ATT&CK framework",
      "Created detection rules for emerging IOCs and TTPs",
    ],
  },
];

export const threatFeed = [
  { type: "SQLi", severity: "HIGH", target: "192.168.1.42", action: "BLOCKED" },
  { type: "XSS", severity: "MED", target: "app.target.com", action: "SANITIZED" },
  { type: "Port Scan", severity: "LOW", target: "10.0.0.15", action: "LOGGED" },
  { type: "Brute Force", severity: "HIGH", target: "ssh://server01", action: "BLOCKED" },
  { type: "Malware", severity: "CRIT", target: "user@workstation", action: "QUARANTINED" },
  { type: "Phishing", severity: "MED", target: "mail.gateway", action: "FILTERED" },
  { type: "DDoS", severity: "HIGH", target: "edge-router", action: "MITIGATED" },
  { type: "CVE-2025-1337", severity: "CRIT", target: "prod-web-01", action: "PATCHED" },
];