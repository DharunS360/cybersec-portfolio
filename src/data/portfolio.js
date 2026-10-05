export const personal = {
  name: "Dharun S",
  firstName: "Dharun",
  lastName: "S",
  title: "SOC L1 Analyst",
  tagline: "Entry-Level Cyber Security Professional",
  subtitle: "Threat Intelligence | SIEM Monitoring | Incident Response",
  email: "dharuns276@gmail.com",
  location: "Karur, Tamil Nadu, India",
  github: "https://github.com/DharunS360",
  linkedin: "https://www.linkedin.com/in/dharun-/",
  letsdefend: "https://app.letsdefend.io/user/dharunshanmugam",
  resume: "/resume.pdf",
};

export const about = `SOC L1 Analyst aspirant with hands-on experience in SIEM monitoring, threat detection, and incident response. Completed 15+ LetsDefend SOC analyst courses with 100% success rate and 3074 points. Certified in Threat Intelligence (arcX) and Google Threat Intelligence with practical skills in Splunk, Wazuh, Sysmon, and the MITRE ATT&CK framework. Passionate about blue team operations, detection engineering, and building security labs to simulate real-world threats.`;

export const stats = [
  { label: "LetsDefend Score", value: 3074, suffix: "" },
  { label: "Success Rate", value: 100, suffix: "%" },
  { label: "Courses Completed", value: 15, suffix: "+" },
  { label: "Certifications", value: 3, suffix: "" },
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
    title: "LetsDefend SOC Analyst Path",
    category: "SOC",
    description:
      "Completed 15+ LetsDefend courses (Network Essentials, Cyber Kill Chain, MITRE ATT&CK, Malware Analysis). 3074 points with 100% success rate and Lab Builder badge.",
    stack: ["LetsDefend", "Splunk", "MITRE ATT&CK"],
    link: "https://app.letsdefend.io/path/soc-analyst-learning-path",
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
    name: "Foundation Level Threat Intelligence Analyst",
    full: "Threat Intelligence Analyst",
    issuer: "arcX",
    year: "2024",
    status: "Completed",
    color: "#a855f7",
  },
  {
    name: "Google Threat Intelligence",
    full: "Completion Badge — Google Cloud",
    issuer: "Google Cloud",
    year: "2025",
    status: "Completed",
    color: "#00bfff",
  },
  {
    name: "LetsDefend SOC Analyst Path",
    full: "SOC Analyst Learning Path — 96% Complete",
    issuer: "LetsDefend",
    year: "2024 - 2026",
    status: "In Progress",
    color: "#00ff9d",
  },
];

export const experience = [
  {
    role: "Cyber Security Intern",
    company: "Ozone Cyber Security",
    duration: "Jun 2023 - Feb 2024",
    points: [
      "Completed foundational training in cybersecurity fundamentals and networking",
      "Hands-on practice with Nmap, Wireshark, and Splunk in lab environment",
      "Studied SOC L1 workflows: alert triage, incident escalation, and documentation",
      "Learned MITRE ATT&CK framework and its application in threat detection",
      "Built awareness of common attack vectors: phishing, malware, and social engineering",
    ],
  },
];

export const letsDefendStats = {
  username: "dharunshanmugam",
  profileUrl: "https://app.letsdefend.io/user/dharunshanmugam",
  pathUrl: "https://app.letsdefend.io/path/soc-analyst-learning-path",
  rank: "VIP",
  score: 3074,
  sla: 4385,
  successRate: 100,
  recentBadge: "Lab Builder",
  badgeDate: "13 Aug 2026",
  coursesCompleted: [
    "How to Investigate a SIEM Alert?",
    "Network Essentials",
    "Cyber Kill Chain",
    "Malware Analysis Fundamentals",
    "MITRE ATT&CK Framework",
    "Career Switch to Cybersecurity",
    "Network Log Analysis",
    "Malicious Document Analysis",
    "Windows Operating System Fundamentals",
    "Network Fundamentals",
    "IT Security Fundamentals",
    "Cyber Threat Intelligence Fundamentals",
    "Application-Level Protocols",
    "Linux Operating System Fundamentals",
    "Dynamic Malware Analysis",
    "Detecting Web Attacks",
  ],
  investigatedAlertTypes: [
    { type: "Exchange", count: 8 },
    { type: "Proxy", count: 4 },
    { type: "Mobile", count: 1 },
    { type: "ThreatIntel", count: 1 },
    { type: "Malware", count: 12 },
    { type: "Ransomware", count: 1 },
    { type: "Brute Force", count: 1 },
    { type: "Web Attack", count: 15 },
    { type: "Generic", count: 2 },
    { type: "Unauthorized Access", count: 1 },
    { type: "LOLBin", count: 1 },
    { type: "Data Leakage", count: 1 },
    { type: "Persistence", count: 1 },
    { type: "Privilege Escalation", count: 1 },
    { type: "APT Group", count: 1 },
  ],
};

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