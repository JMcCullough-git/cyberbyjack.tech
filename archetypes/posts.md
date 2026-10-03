---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
author: "Jack McCullough"
# One-sentence hook shown under the title and on cards
dek: ""
# First tag = category pill (red). Others = neutral tags.
tags: ["Investigations"]
# Put cover.jpg in this post's folder (page bundle)
cover: "cover.jpg"
coverAlt: ""
---

Open with the moment the story started. What was the question, who asked it, what looked off?

{{< pullquote >}}
The line you want readers to remember.
{{< /pullquote >}}

## What I found

Walk through the evidence in order. Drop screenshots into this folder and reference them:

{{< figure src="evidence-1.png" caption="What this image shows." num="1" >}}

{{< callout type="note" >}}
Context, method, or a caveat.
{{< /callout >}}

```bash {filename="example.sh"}
# commands or code
```

{{< callout type="disclosure" >}}
Who was notified, when, and what they did.
{{< /callout >}}

## What it means

Close the story. What should the reader do or take away?
