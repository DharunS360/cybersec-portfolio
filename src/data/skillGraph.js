// SOC / Blue Team skill network graph
// Defensive security skills only

export const skillGraph = {
  nodes: [
    {
      id: "me",
      label: "DHARUN",
      type: "center",
      color: "#00bfff",
      size: 24,
      level: 100,
    },

    // 4 blue team categories
    {
      id: "siem",
      label: "SIEM & Log Mgmt",
      type: "category",
      color: "#00bfff",
      size: 15,
      level: 85,
      parent: "me",
    },
    {
      id: "detection",
      label: "Detection Engineering",
      type: "category",
      color: "#00d4ff",
      size: 15,
      level: 80,
      parent: "me",
    },
    {
      id: "threat",
      label: "Threat Intelligence",
      type: "category",
      color: "#a855f7",
      size: 15,
      level: 80,
      parent: "me",
    },
    {
      id: "response",
      label: "Incident Response",
      type: "category",
      color: "#00ff9d",
      size: 15,
      level: 75,
      parent: "me",
    },

    // SIEM & Log Management tools
    { id: "splunk", label: "Splunk", type: "tool", color: "#00bfff", size: 10, level: 80, parent: "siem" },
    { id: "wazuh", label: "Wazuh", type: "tool", color: "#00bfff", size: 10, level: 80, parent: "siem" },
    { id: "elk", label: "ELK Stack", type: "tool", color: "#00bfff", size: 10, level: 70, parent: "siem" },
    { id: "sysmon", label: "Sysmon", type: "tool", color: "#00bfff", size: 10, level: 85, parent: "siem" },

    // Detection Engineering tools
    { id: "snort", label: "Snort", type: "tool", color: "#00d4ff", size: 10, level: 70, parent: "detection" },
    { id: "suricata", label: "Suricata", type: "tool", color: "#00d4ff", size: 10, level: 70, parent: "detection" },
    { id: "yara", label: "YARA", type: "tool", color: "#00d4ff", size: 10, level: 65, parent: "detection" },
    { id: "sigma", label: "Sigma Rules", type: "tool", color: "#00d4ff", size: 10, level: 65, parent: "detection" },

    // Threat Intelligence tools
    { id: "mitre", label: "MITRE ATT&CK", type: "tool", color: "#a855f7", size: 10, level: 85, parent: "threat" },
    { id: "misp", label: "MISP", type: "tool", color: "#a855f7", size: 10, level: 75, parent: "threat" },
    { id: "vt", label: "VirusTotal", type: "tool", color: "#a855f7", size: 10, level: 90, parent: "threat" },
    { id: "abuseipdb", label: "AbuseIPDB", type: "tool", color: "#a855f7", size: 10, level: 85, parent: "threat" },
    { id: "shodan", label: "Shodan", type: "tool", color: "#a855f7", size: 10, level: 80, parent: "threat" },

    // Incident Response tools
    { id: "wireshark", label: "Wireshark", type: "tool", color: "#00ff9d", size: 10, level: 85, parent: "response" },
    { id: "volatility", label: "Volatility", type: "tool", color: "#00ff9d", size: 10, level: 70, parent: "response" },
    { id: "autopsy", label: "Autopsy", type: "tool", color: "#00ff9d", size: 10, level: 65, parent: "response" },
    { id: "nist", label: "NIST 800-61", type: "tool", color: "#00ff9d", size: 10, level: 75, parent: "response" },
  ],
};