# The Cyber Seal Report

Source for [cybersealreport.com](https://cybersealreport.com): a static [Hugo](https://gohugo.io) site deployed as a Cloudflare Worker (static assets) on every push to `main`.

## Cloudflare build settings

Workers & Pages → **cyberseal** → Settings → Build:

| Setting | Value |
|---|---|
| Build command | `npm ci && hugo --minify` |
| Deploy command | `npx --no-install wrangler deploy` |
| Build variable | `HUGO_VERSION` = `0.167.0` (under **Build** variables, not the Worker's runtime variables) |

`wrangler.jsonc` tells Wrangler to upload the `public/` folder Hugo produces. Keep the `name` in it matching the Worker's name in Cloudflare.

### Pinned deploy tooling

Wrangler is pinned to an exact version in `package.json`, and `package-lock.json` locks it and every dependency to known hashes. `npm ci` installs exactly that set, and `--no-install` makes `npx` fail instead of quietly downloading the newest Wrangler from npm. A compromised or breaking Wrangler release can't reach a deploy until I merge it.

To update Wrangler: Dependabot (`.github/dependabot.yml`) opens a PR each week a new version is out. I check the [release notes](https://github.com/cloudflare/workers-sdk/releases), then merge. To bump by hand: `npm install --save-exact wrangler@<version>` and commit both files.

`node_modules/` is gitignored, and writing posts never needs it; only Cloudflare's build installs it.

The site needs Hugo **extended, 0.146 or newer** (it uses the `layouts/_partials` folder layout). If `HUGO_VERSION` isn't set, Cloudflare falls back to its default Hugo, which works but is older.

## Write a post (Obsidian)

The repo doubles as an Obsidian vault. Open the repo folder in Obsidian and write with normal Obsidian features; the site renders them directly.

**One-time setup:** clone the repo, open the folder as a vault in Obsidian, turn on community plugins, and install **Templater** and **Git** (settings for both are already in `.obsidian/`).

**Commit identity (every device):** this repo is public, so every commit's author email is public too. Before the first commit from a new device, I set the vault to my GitHub no-reply address:

```bash
git config user.email "JMcCullough-git@users.noreply.github.com"
git config user.name "Jack McCullough"
```

I run these in the repo folder (not `--global`) so other repos keep their own identity. Obsidian Git commits with this config. Backstop: GitHub → Settings → Emails has **Keep my email addresses private** and **Block command line pushes that expose my email** turned on, so a push with a personal address gets rejected instead of published.

**Each article:**

1. `Ctrl + N` for a blank note, then the **<%** Templater icon → **New article** → type the title. It turns the note into `drafts/posts/<title>/index.md`.
2. Write. Fill in `dek` (one-sentence hook) and `tags` in Properties. **The first tag is the red category pill.**
3. Drag screenshots into the note. They land in the article's folder. Type a caption between the `[ ]` to get a numbered "Fig. N".
4. Rename the lead image to `cover` (or type its file name in the `cover` property).
5. **<%** icon → **Publish draft**. It moves the folder to `content/posts/` and unticks `draft`. Then **Git: Commit-and-sync**. Cloudflare publishes in about a minute.

### Drafts

The repo is public, so anything committed is readable on GitHub, even with `draft: true`. Drafts live in `drafts/posts/` and `drafts/investigations/` instead, and `drafts/` is gitignored: Commit-and-sync never pushes it, and Hugo never builds it (it's outside `content/`). The **New article** / **New investigation** templates create notes there; the **Publish draft** template (`obsidian/templates/Publish draft.md`) moves a finished one into `content/` with its images and data files and unticks `draft`.

The trade-off: drafts don't sync between devices through GitHub. I finish a draft on the device where I started it, or copy the folder over myself.

**Gotcha:** if `.gitignore` is ever missing `/drafts/` (an old clone, a bad merge), the next Commit-and-sync publishes every draft to GitHub. Before syncing on a new device I check that `git check-ignore drafts/x` prints `drafts/x`.

`obsidian/Writing cheatsheet.md` has the full syntax: `> [!quote]` pull quotes, `> [!note]` / `> [!disclosure]` callouts, code blocks with `{title="file.sh"}`, and tags.

Images are published only as resized WebP copies with EXIF/GPS metadata stripped; the original files you drop in are never published.

The older Hugo shortcodes (`{{< pullquote >}}`, `{{< callout >}}`, `{{< figure >}}`) still work if you write outside Obsidian.

## Home page

Lead story = the newest post with `featured: true`, otherwise the newest post. The next post sits beside it; older posts are on the Articles page. Posts with `hideFromHome: true` are skipped on the home page only.

## Site settings (`hugo.toml`)

- `params.contactEmail` / `params.pgpFingerprint`: About page contact block (empty hides it).
- `params.topics`: the "What I cover" tags on the About page.
- `params.newsletter.action`: your newsletter provider's form URL. While empty, the signup card shows "Signups open soon" and can't be submitted.
- `params.footerLinks`: footer links; a link with an empty `url` is hidden.
- `menus.main`: header navigation.

The About page text lives in `content/about.md`; the portrait is `static/images/jack.jpg`.

## Notes

- Fonts (Bricolage Grotesque, Public Sans, JetBrains Mono) are self-hosted in `static/fonts/` under the SIL Open Font License.
- Visitor analytics use Cloudflare Web Analytics (cookieless), switched on by `params.analytics.cloudflareToken` in `hugo.toml`. It's the site's only third-party script; the CSP allows `static.cloudflareinsights.com` and `cloudflareinsights.com` for it.
- `robots.txt` points search engines at `sitemap.xml` (`layouts/robots.txt`).
- `static/_headers` sets a strict Content Security Policy and other security headers (Cloudflare applies it to the static assets). If you add third-party embeds or scripts later, update the CSP or they'll be blocked.
- Light theme only; dark mode wasn't part of the design.
