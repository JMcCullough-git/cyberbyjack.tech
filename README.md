# The Cyber Seal Report

Source for [cybersealreport.com](https://cybersealreport.com): a static [Hugo](https://gohugo.io) site deployed as a Cloudflare Worker (static assets) on every push to `main`.

## Cloudflare build settings

Workers & Pages → **cyberseal** → Settings → Build:

| Setting | Value |
|---|---|
| Build command | `hugo --minify` |
| Deploy command | `npx wrangler deploy` |
| Build variable | `HUGO_VERSION` = `0.167.0` (under **Build** variables, not the Worker's runtime variables) |

`wrangler.jsonc` tells Wrangler to upload the `public/` folder Hugo produces. Keep the `name` in it matching the Worker's name in Cloudflare.

The site needs Hugo **extended, 0.146 or newer** (it uses the `layouts/_partials` folder layout). If `HUGO_VERSION` isn't set, Cloudflare falls back to its default Hugo, which works but is older.

## Write a post (Obsidian)

The repo doubles as an Obsidian vault. Open the repo folder in Obsidian and write with normal Obsidian features; the site renders them directly.

**One-time setup:** clone the repo, open the folder as a vault in Obsidian, turn on community plugins, and install **Templater** and **Git** (settings for both are already in `.obsidian/`).

**Each article:**

1. `Ctrl + N` for a blank note, then the **<%** Templater icon → **New article** → type the title. It turns the note into `content/posts/<title>/index.md`.
2. Write. Fill in `dek` (one-sentence hook) and `tags` in Properties. **The first tag is the red category pill.**
3. Drag screenshots into the note. They land in the article's folder. Type a caption between the `[ ]` to get a numbered "Fig. N".
4. Rename the lead image to `cover` (or type its file name in the `cover` property).
5. Untick `draft`, then **Git: Commit-and-sync**. Cloudflare publishes in about a minute.

`obsidian/Writing cheatsheet.md` has the full syntax: `> [!quote]` pull quotes, `> [!note]` / `> [!disclosure]` callouts, code blocks with `{title="file.sh"}`, and tags.

Images are published only as resized WebP copies with EXIF/GPS metadata stripped; the original files you drop in are never published.

The older Hugo shortcodes (`{{< pullquote >}}`, `{{< callout >}}`, `{{< figure >}}`) still work if you write outside Obsidian.

## Site settings (`hugo.toml`)

- `params.contactEmail` / `params.pgpFingerprint`: About page contact block (empty hides it).
- `params.topics`: the "What I cover" tags on the About page.
- `params.newsletter.action`: your newsletter provider's form URL. While empty, the signup card shows "Signups open soon" and can't be submitted.
- `params.footerLinks`: footer links; a link with an empty `url` is hidden.
- `menus.main`: header navigation.

The About page text lives in `content/about.md`; the portrait is `static/images/jack.jpg`.

## Sample posts

`content/posts/sample-*` are the placeholder articles from the design handoff, written in the same Obsidian syntax and kept as drafts. They never appear on the live site. Delete them once you've published real posts.

## Notes

- Fonts (Bricolage Grotesque, Public Sans, JetBrains Mono) are self-hosted in `static/fonts/` under the SIL Open Font License, so the site makes no third-party requests.
- `static/_headers` sets a strict Content Security Policy and other security headers (Cloudflare applies it to the static assets). If you add third-party embeds or scripts later, update the CSP or they'll be blocked.
- Light theme only; dark mode wasn't part of the design.
