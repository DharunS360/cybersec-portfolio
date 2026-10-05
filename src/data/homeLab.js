// SOC Home Lab configuration
export const labStatus = {
  status: "In Progress",
  started: "2026",
  eta: "Coming Soon",
  description:
    "Building a personal SOC lab to simulate real-world attacks, practice detection engineering, and master incident response workflows.",
};

export const labStack = [
  { id: "splunk", name: "Splunk", role: "SIEM", color: "#00bfff", description: "Central log collection and analysis platform", status: "planned" },
  { id: "wazuh", name: "Wazuh", role: "SIEM / EDR", color: "#00bfff", description: "Open-source security monitoring and XDR", status: "planned" },
  { id: "sysmon", name: "Sysmon", role: "Endpoint Logging", color: "#00d4ff", description: "Windows event logging with process creation tracking", status: "planned" },
  { id: "windows", name: "Windows 10", role: "Victim Endpoint", color: "#ff9500", description: "Primary Windows victim machine with Sysmon", status: "planned" },
  { id: "ubuntu", name: "Ubuntu Server", role: "Victim Server", color: "#ff9500", description: "Linux victim server for SSH/brute-force scenarios", status: "planned" },
  { id: "kali", name: "Kali Linux", role: "Attacker VM", color: "#ff3b3b", description: "Attack simulation platform", status: "planned" },
  { id: "atomic", name: "Atomic Red Team", role: "Attack Framework", color: "#ff3b3b", description: "MITRE ATT&CK-based attack simulation", status: "learning" },
  { id: "snort", name: "Snort", role: "IDS", color: "#a855f7", description: "Network intrusion detection", status: "planned" },
];

export const labScenarios = [
  { id: "brute-force", title: "Brute Force Detection", description: "Simulate RDP/SSH brute force attacks and detect via Splunk correlation rules + Windows Event ID 4625.", mitre: ["T1110 - Brute Force", "T1078 - Valid Accounts"], status: "planned" },
  { id: "powershell", title: "PowerShell Abuse Detection", description: "Detect malicious PowerShell commands using Sysmon Event ID 1 (Process Creation) and script block logging.", mitre: ["T1059.001 - PowerShell"], status: "planned" },
  { id: "lateral", title: "Lateral Movement Detection", description: "Track SMB/WMI lateral movement across endpoints using Sysmon Event ID 3 (Network Connection).", mitre: ["T1021 - Remote Services"], status: "planned" },
  { id: "c2", title: "C2 Beacon Detection", description: "Detect command & control beacons via network analysis (Zeek/Snort) and DNS anomaly detection.", mitre: ["T1071 - Application Layer Protocol"], status: "planned" },
];

export const labMetrics = {
  uptime: "—",
  alertsProcessed: "—",
  detectionsBuilt: "—",
  incidentsSimulated: "—",
};