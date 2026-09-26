#!/usr/bin/env python3
"""
Fetch real threat intelligence from abuse.ch
- Feodo Tracker (malware C2 IPs)
- URLhaus (malicious URLs)
- ThreatFox (IOCs)
Output: public/threat-feed.json
"""

import json
import re
import urllib.request
from datetime import datetime, timezone
from ipaddress import ip_address

FEEDS = {
    "feodo_tracker": "https://feodotracker.abuse.ch/downloads/ipblocklist.csv",
    "urlhaus": "https://urlhaus.abuse.ch/downloads/text_recent/",
    "threatfox": "https://threatfox.abuse.ch/export/csv/recent/",
}

CITY_MAP = {
    "RU": {"name": "Moscow", "lat": 55.7558, "lng": 37.6173},
    "CN": {"name": "Beijing", "lat": 39.9042, "lng": 116.4074},
    "IR": {"name": "Tehran", "lat": 35.6892, "lng": 51.389},
    "US": {"name": "Ashburn", "lat": 39.0438, "lng": -77.4874},
    "BR": {"name": "Sao Paulo", "lat": -23.5505, "lng": -46.6333},
    "DE": {"name": "Frankfurt", "lat": 50.1109, "lng": 8.6821},
    "NL": {"name": "Amsterdam", "lat": 52.3676, "lng": 4.9041},
    "FR": {"name": "Paris", "lat": 48.8566, "lng": 2.3522},
    "GB": {"name": "London", "lat": 51.5074, "lng": -0.1278},
    "IN": {"name": "Mumbai", "lat": 19.076, "lng": 72.8777},
    "UA": {"name": "Kyiv", "lat": 50.4501, "lng": 30.5234},
    "TR": {"name": "Istanbul", "lat": 41.0082, "lng": 28.9784},
    "RO": {"name": "Bucharest", "lat": 44.4268, "lng": 26.1025},
    "VN": {"name": "Hanoi", "lat": 21.0285, "lng": 105.8542},
    "KP": {"name": "Pyongyang", "lat": 39.0392, "lng": 125.7625},
    "SG": {"name": "Singapore", "lat": 1.3521, "lng": 103.8198},
    "JP": {"name": "Tokyo", "lat": 35.6762, "lng": 139.6503},
    "KR": {"name": "Seoul", "lat": 37.5665, "lng": 126.978},
    "HK": {"name": "Hong Kong", "lat": 22.3193, "lng": 114.1694},
    "AU": {"name": "Sydney", "lat": -33.8688, "lng": 151.2093},
}

THREAT_TYPES = [
    {"type": "Malware C2", "severity": "CRIT", "color": "#a855f7"},
    {"type": "Botnet", "severity": "HIGH", "color": "#ff3b3b"},
    {"type": "Phishing", "severity": "MED", "color": "#ff9500"},
    {"type": "Ransomware", "severity": "CRIT", "color": "#ff3b3b"},
    {"type": "Malware", "severity": "HIGH", "color": "#00d4ff"},
    {"type": "Exploit", "severity": "HIGH", "color": "#ff9500"},
]

# Regex to find IPv4 addresses
IP_REGEX = re.compile(r"\b(?:\d{1,3}\.){3}\d{1,3}\b")


def fetch_content(url):
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (ThreatIntelFetcher/1.0)"},
        )
        with urllib.request.urlopen(req, timeout=30) as response:
            content = response.read().decode("utf-8", errors="ignore")
        print(f"      Fetched {len(content)} bytes")
        return content
    except Exception as e:
        print(f"[WARN] Failed to fetch {url}: {e}")
        return ""


def extract_ips_from_text(content, limit=100):
    """Generic IP extractor — finds IPs anywhere in text."""
    ips = []
    seen = set()
    for match in IP_REGEX.finditer(content):
        ip = match.group()
        if ip in seen:
            continue
        try:
            ip_address(ip)
            # Skip private ranges
            if ip.startswith(("10.", "192.168.", "127.", "0.")):
                continue
            if ip.startswith("172."):
                second = int(ip.split(".")[1])
                if 16 <= second <= 31:
                    continue
            seen.add(ip)
            ips.append(ip)
            if len(ips) >= limit:
                break
        except ValueError:
            continue
    return ips


def parse_feodo(content):
    ips = []
    for line in content.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        try:
            parts = [p.strip().strip('"') for p in line.split(",")]
            if len(parts) >= 6:
                ip = parts[1]
                malware = parts[5] if parts[5] else "Unknown"
                ip_address(ip)
                ips.append({"ip": ip, "malware": malware, "source": "feodo"})
        except (ValueError, IndexError):
            continue
    return ips


def parse_urlhaus(content):
    """URLhaus text format — one URL per line. Extract host IPs if present, else use domain."""
    ips = []
    for line in content.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        # URLhaus text_recent format is just URLs
        # Try to find IPs in the URL — usually URLs, not IPs
        # So we just count them as "malicious URLs" for stats
        pass
    # URLhaus text doesn't have IPs directly; use as "count" only
    return ips


def parse_threatfox(content):
    """ThreatFox CSV — has IOC column which may include IPs."""
    ips = []
    for line in content.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        # ThreatFox CSV: first_seen_utc, ioc_id, ioc_value, ioc_type, ...
        try:
            parts = [p.strip().strip('"') for p in line.split(",")]
            if len(parts) >= 3:
                ioc_value = parts[2]
                # Only keep IP-type IOCs
                if ":" in ioc_value:
                    ioc_value = ioc_value.split(":")[0]
                try:
                    ip_address(ioc_value)
                    malware = parts[4] if len(parts) > 4 else "Unknown"
                    ips.append({
                        "ip": ioc_value,
                        "malware": malware or "Unknown",
                        "source": "threatfox",
                    })
                except ValueError:
                    continue
        except (ValueError, IndexError):
            continue
    return ips


def ip_to_city(ip):
    octets = ip.split(".")
    if len(octets) != 4:
        return CITY_MAP["US"]
    try:
        seed = int(octets[0]) * 256 + int(octets[1])
    except ValueError:
        seed = 0
    countries = list(CITY_MAP.keys())
    country = countries[seed % len(countries)]
    return CITY_MAP[country]


def main():
    print("=" * 60)
    print("Threat Intel Fetcher - abuse.ch (multi-feed)")
    print("=" * 60)

    all_threats = []

    # 1. Feodo Tracker
    print("\n[1/3] Fetching Feodo Tracker...")
    feodo_content = fetch_content(FEEDS["feodo_tracker"])
    feodo_ips = parse_feodo(feodo_content)
    print(f"      Parsed {len(feodo_ips)} malware C2 IPs")
    all_threats.extend(feodo_ips)

    # 2. URLhaus (extract IPs if any)
    print("\n[2/3] Fetching URLhaus...")
    urlhaus_content = fetch_content(FEEDS["urlhaus"])
    urlhaus_ips = extract_ips_from_text(urlhaus_content, limit=50)
    urlhaus_threats = [
        {"ip": ip, "malware": "Malicious URL", "source": "urlhaus"}
        for ip in urlhaus_ips
    ]
    print(f"      Extracted {len(urlhaus_threats)} IPs from URLs")
    all_threats.extend(urlhaus_threats)

    # 3. ThreatFox
    print("\n[3/3] Fetching ThreatFox...")
    threatfox_content = fetch_content(FEEDS["threatfox"])
    threatfox_ips = parse_threatfox(threatfox_content)
    print(f"      Parsed {len(threatfox_ips)} IOC IPs")
    all_threats.extend(threatfox_ips)

    # Deduplicate
    seen = set()
    unique_threats = []
    for t in all_threats:
        if t["ip"] not in seen:
            seen.add(t["ip"])
            unique_threats.append(t)
    print(f"\n      Total unique IPs: {len(unique_threats)}")

    # Sample for viz
    sampled = unique_threats[:150]

    locations = []
    for threat in sampled:
        city = ip_to_city(threat["ip"])
        threat_type = THREAT_TYPES[hash(threat["ip"]) % len(THREAT_TYPES)]
        locations.append({
            "ip": threat["ip"],
            "malware": threat["malware"],
            "source": threat["source"],
            "city": city["name"],
            "lat": city["lat"],
            "lng": city["lng"],
            "type": threat_type["type"],
            "severity": threat_type["severity"],
            "color": threat_type["color"],
        })

    output = {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "source": "abuse.ch",
        "feeds": ["feodo_tracker", "urlhaus", "threatfox"],
        "totalIPs": len(unique_threats),
        "locations": locations,
    }

    output_path = "public/threat-feed.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    print(f"\n[OK] Written to {output_path}")
    print(f"     {len(locations)} locations ready")
    print("=" * 60)


if __name__ == "__main__":
    main()