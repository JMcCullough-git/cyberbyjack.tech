---
title: "Two end-of-life Windows machines and an exposed VNC login on a five-host lab network"
date: 2026-10-17
draft: false
dek: "I scanned 10.71.2.0/24 and found Windows XP and Windows 7 still answering on SMB and RDP."
labels:
  - Network scan
  - Nmap
  - Windows
  - SMB
meta: "40 sec scan"
---

```tools
Nmap | 7.99
```

## What I found

```stats
256 | IPs scanned
5 | Hosts up
40.48s | Scan time
7.99 | Nmap version
```

Five hosts answered: three Windows lab machines (10, XP and 7), one Cisco device with a web interface, and the Linux box I scanned from. Two of the Windows systems run operating systems that no longer get security updates, and all three expose SMB and RDP.

## Hosts at a glance

```table
file: hosts.csv
```

> [!note]
> Risk ratings are my judgment from a top-100-port scan alone. I have not verified any of these weaknesses by exploitation or authenticated testing.

## Host by host

```host
title: 10.71.2.101
badge: Medium
subtitle: Windows 10 · VMware · 00:50:56:81:B2:1C · 0.00019s latency · 93 closed ports
ports: ports.csv
---
VNC and RDP are both exposed, and the TightVNC banner gives away a username.
```

```text {title="nmap · 10.71.2.101"}
5800/tcp open  vnc-http  TightVNC (user: [redacted]; VNC TCP port: 5900)
```

```host
title: 10.71.2.102
badge: High
subtitle: Windows XP SP2/SP3 · VMware · 00:50:56:81:39:AB · 0.00018s latency · 96 closed ports
ports: ports.csv
---
Windows XP is long past end of life and gets no security updates.

SMB and RPC on an unpatched XP system are typically open to well-known remote exploits; I would verify before concluding.
```

```host
title: 10.71.2.106
badge: High
subtitle: Host name redacted · VMware · 00:50:56:81:1D:90 · 0.00019s latency · 94 filtered ports
ports: ports.csv
---
Windows 7 is end of life. Nmap flagged its OS detection as unreliable because it found no closed port, so treat the OS as a best guess.

Most ports are filtered, which points to an active host firewall. Port 554 (RTSP) is unexpected on a lab workstation.
```

```host
title: 10.71.2.254
badge: Low
subtitle: Cisco device · 70:B3:17:E5:61:FA · 0.0014s latency · 97 closed ports
ports: ports.csv
---
Management runs over SSH and HTTPS, but plain HTTP on port 80 is open too. I would confirm it only redirects to HTTPS.
```

```host
title: 10.71.2.20
badge: Info
subtitle: Scanning host (0 hops) · Linux · 98 filtered ports
ports: ports.csv
---
The OS fingerprint was inconclusive; the best guesses were various Linux kernels.
```

## Key findings

```findings
High | Two end-of-life Windows systems (XP at .102, 7 at .106) are reachable on SMB and RDP.
Medium | SMB (445) and RDP (3389) are open on all three Windows hosts.
Medium | VNC is exposed on .101 and the TightVNC banner discloses a username.
Low | The Cisco device at .254 serves HTTP, HTTPS and SSH.
```

## What I would do next

```next-steps
Retire or isolate the XP and Windows 7 hosts and segment them from everything else.
Restrict RDP, SMB and VNC to the sources that need them, and require network-level authentication for RDP.
Disable or firewall VNC on .101 if it is not needed, or tunnel it over SSH or a VPN.
Confirm the Cisco device redirects HTTP to HTTPS and limit management access to trusted addresses.
Follow up with a vulnerability scan (Nmap NSE scripts or a dedicated scanner) to confirm which weaknesses actually apply.
```
