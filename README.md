# The Cyber Seal Report

Source for [cybersealreport.com](https://cybersealreport.com): a static [Hugo](https://gohugo.io) site deployed by Cloudflare Pages on every push to `main`.

## Cloudflare Pages build settings

| Setting | Value |
|---|---|
| Framework preset | Hugo |
| Build command | `hugo --minify` |
| Build output directory | `public` |
| Environment variable | `HUGO_VERSION` = `0.167.0` |

The site needs Hugo **extended, 0.146 or newer** (it uses the `layouts/_partials` folder layout). If `HUGO_VERSION` isn't set, Cloudflare falls back to its default Hugo, which works but is older.

## Write a post

Each post is a folder. Everything for that post lives inside it.

```
content/posts/router-backdoor/
  index.md        ← the story, in Markdown
  cover.jpg       ← lead image (cards + post hero)
  evidence-1.png  ← screenshots, diagrams, photos
```

1. `hugo new posts/router-backdoor/index.md` (or copy an existing post folder).
2. Fill in the front matter: `title`, `date`, `dek` (one-sentence hook), and `tags`. **The first tag is the red category pill.**
3. Write the story. Plain paragraphs, `##` headings, lists and fenced code all just work.
4. Drop images into the folder. Covers and figures are resized and converted to WebP automatically, so full-size screenshots are fine.
5. Preview with `hugo server -D` and open http://localhost:1313.
6. Set `draft: false`, commit, and push. Cloudflare publishes in about a minute.

The URL is the folder name: `content/posts/router-backdoor/` → `/posts/router-backdoor/`.

### Story blocks

```markdown
{{< pullquote >}}
The line you want readers to remember.
{{< /pullquote >}}

{{< callout type="note" >}}
Context, method, or a caveat.
{{< /callout >}}

{{< callout type="disclosure" >}}
Who was notified, when, and what they did.
{{< /callout >}}

{{< figure src="evidence-1.png" caption="What this image shows." num="1" alt="Describe the image" >}}
```

Code blocks get a filename bar and a Copy button:

````markdown
```bash {filename="check_build.sh"}
for host in $(cat routers.txt); do echo "$host"; done
```
````

## Site settings (`hugo.toml`)

- `params.contactEmail` / `params.pgpFingerprint`: About page contact block (empty hides it).
- `params.topics`: the "What I cover" tags on the About page.
- `params.newsletter.action`: your newsletter provider's form URL. While empty, the signup card shows "Signups open soon" and can't be submitted.
- `params.footerLinks`: footer links; a link with an empty `url` is hidden.
- `menus.main`: header navigation.

The About page text lives in `content/about.md`; the portrait is `static/images/jack.jpg`.

## Sample posts

`content/posts/sample-*` are the placeholder articles from the design handoff, kept as drafts so you can preview the layout with `hugo server -D`. They never appear on the live site. Delete them once you've published real posts.

## Notes

- Fonts (Bricolage Grotesque, Public Sans, JetBrains Mono) are self-hosted in `static/fonts/` under the SIL Open Font License, so the site makes no third-party requests.
- `static/_headers` sets a strict Content Security Policy and other security headers on Cloudflare Pages. If you add third-party embeds or scripts later, update the CSP or they'll be blocked.
- Light theme only; dark mode wasn't part of the design.
