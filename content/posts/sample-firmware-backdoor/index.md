---
# SAMPLE POST from the design handoff. Placeholder copy, not real research.
# It stays hidden on the live site (draft: true). Delete this folder once you've published your first real post.
title: "Dissecting a firmware backdoor hiding in plain sight on edge routers"
date: 2026-10-01
draft: true
author: "Jack McCullough"
dek: "A routine question about a slow router turned into a three-week trail through firmware, a forgotten init script, and a listener nobody had noticed."
excerpt: "A hardcoded credential, a dormant listener, and a supply chain nobody audited. How the implant works and how to check your fleet."
tags: ["Threat Research", "Firmware", "Supply Chain"]
cover: "cover.jpg"
coverAlt: ""
---

In August, a routine firmware diff on a mid-range edge router turned up a binary that had no business being there. It was small, stripped, and launched by an init script that appeared in only one point release.

This post walks through how the implant starts, what it listens for, and how to check whether devices on your network are running an affected build.

{{< pullquote >}}
It was small, stripped, and only appeared in one point release. That alone was enough to keep digging.
{{< /pullquote >}}

## Finding the listener

The init script calls `/usr/sbin/hwmond` with a single flag. Despite the name, it has nothing to do with hardware monitoring.

{{< callout type="note" >}}
All samples were analyzed offline in an isolated lab. Hashes are listed at the end of this post.
{{< /callout >}}

```bash {filename="check_build.sh"}
# Flag devices running the affected point release
for host in $(cat routers.txt); do
  ver=$(ssh admin@$host "cat /etc/fw_version")
  [ "$ver" = "4.2.17" ] && echo "$host affected"
done
```

Once running, the process binds to a high UDP port and waits for a packet that begins with a fixed eight-byte magic value. Anything else is silently dropped, which is why port scans never flagged it.

{{< callout type="disclosure" >}}
The vendor was notified on August 14 and shipped a fixed release on September 22. Update before applying any other mitigation.
{{< /callout >}}

{{< figure src="evidence-1.jpg" caption="Packet capture showing the eight-byte magic value that wakes the listener." num="1" >}}

## What to do now

Run the script above against your inventory, upgrade any affected device, and rotate credentials that were stored on it.
