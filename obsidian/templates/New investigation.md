<%*
// "New investigation": creates content/investigations/<slug>/index.md and fills in the properties.
// Ctrl + N for a blank note, then the Templater icon in the ribbon → New investigation.
let title = await tp.system.prompt("Investigation title");
if (!title || !title.trim()) title = "Untitled investigation";
title = title.trim();
const slug = title.toLowerCase()
  .replace(/['’]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 60) || "untitled-investigation";
const folder = `content/investigations/${slug}`;
if (!app.vault.getAbstractFileByPath(folder)) {
  await app.vault.createFolder(folder);
}
await tp.file.move(`${folder}/index`);
const safeTitle = title.replace(/"/g, '\\"');
-%>
---
title: "<% safeTitle %>"
date: <% tp.date.now("YYYY-MM-DD") %>
draft: true
dek: ""
labels:
  - Network scan
meta: ""
---
<!--
  Properties above:
  - dek: one or two sentences under the title, on the Investigations tab and the home card.
  - labels: the pills above the title. The first one is red. Spaces are fine: "Lab · Pod 2".
  - meta: short facts after the date, e.g. "3 scans · 2 hosts · uncredentialed".
  - draft: untick (false) when it's ready, then Commit-and-sync to publish.
  Blocks and data files: see "Investigations cheatsheet" in this folder.
  Delete any block below you don't need. Comments like this one never appear on the site.
-->

```tools
Nmap | 7.99
```

## What I found

```stats
256 | IPs scanned
5 | Hosts up
```

<% tp.file.cursor() %>Summarize what you found in two or three sentences.

## Hosts

```host
title: 10.0.0.1
badge: High
subtitle: Windows 10 · 3 open ports
---
What stands out about this host.
```

## Key findings

```findings
High | The most serious thing you found.
Medium | The next one.
```

## What I would do next

```next-steps
First thing to fix.
Second thing to fix.
```
