# Writing cheatsheet

Everything here works in Obsidian's editor and on the site.

## Publish a new article

1. **New article:** press `Ctrl/Cmd + N` for a blank note, then click the **<%** Templater icon in the left ribbon → **New article** → type the title. It turns the note into `content/posts/<title>/index.md`.
   - Or `Ctrl/Cmd + P` → "Templater: Create new note from template" → **New article**.
   - The insert icon needs an open note; with nothing open, Templater shows "No active editor".
   - Optional, Ctrl + N alone: Settings → Templater → turn on *Trigger Templater on new file creation*, then add a folder template: `content/posts` → `obsidian/templates/New article.md`.
2. **Write.** Fill in `dek` and `tags` in Properties at the top.
3. **Drag images** into the note. They're saved in the article's folder automatically.
4. **Cover image:** rename your lead image to `cover` (right-click → Rename), or type its file name in the `cover` property.
5. **Publish:** untick `draft`, then click **Commit-and-sync** (Obsidian Git icon in the left ribbon, or `Ctrl/Cmd + P` → "Git: Commit-and-sync"). It's live in about a minute.

To fix a typo after publishing, edit the note and Commit-and-sync again.

## Home page

The home page shows two stories: the **lead** (big card) and one story **beside it**. Everything else is on the Articles page.

| Property | What it does |
|---|---|
| `featured` ☑ | Pins this post as the lead, however old. If several are ticked, the newest ticked one wins. Untick to go back to newest-first. |
| `hideFromHome` ☑ | Keeps the post off the home page. It still appears under Articles, tags, Archive and RSS. |

Older posts don't have these checkboxes yet. Add them in Properties (**+ Add property** → `featured`, type Checkbox), or just type `featured: true` in the properties.

## Text formatting

| Type this | Looks like | Shortcut in Obsidian |
|---|---|---|
| `**bold**` | **bold** | `Ctrl/Cmd + B` |
| `*italic*` | *italic* | `Ctrl/Cmd + I` |
| `<u>underline</u>` | <u>underline</u> | none (type it) |
| `==highlight==` | ==highlight== (soft red on the site) | none |
| `~~strikethrough~~` | ~~strikethrough~~ | none |
| `` `code` `` | `code` | none |
| `<kbd>Ctrl</kbd>` | <kbd>Ctrl</kbd> key caps | none |
| `H<sub>2</sub>O`, `x<sup>2</sup>` | H<sub>2</sub>O, x<sup>2</sup> | none |

Mix them: `**<u>bold and underlined</u>**`. Formatting works in the article body and story blocks, not in the `title` or `dek` properties.

## Titles

Titles can use any punctuation: `?`, `!`, `&`, `:`, quotes. Type the title normally when Templater asks, or edit `title` in Properties later. The web address (the folder name) drops the punctuation: "Is Your Router Lying?" lives at `/posts/is-your-router-lying/`.

## Story blocks

```markdown
> [!quote]
> The pull quote: big text with the red bar.

> [!note]
> Grey box for context, method, or caveats.

> [!disclosure]
> Red box for who was notified and when.

> [!note] Custom label
> Any title after the type replaces the label.
```

## Images

```markdown
![Caption shown under the image as "Fig. 1"](screenshot.png)
```

- An image on its own line becomes a numbered evidence figure, but only if it has a caption.
- File names with spaces (like Obsidian's `Pasted image …png`) are fine.
- The site publishes resized copies with **GPS and camera metadata stripped**. Your original files are never published.

## Code

````markdown
```bash {title="check_build.sh"}
grep -r "password" /etc
```
````

The title shows in the bar above the code, with a Copy button. Leave out `{…}` to show just the language.

## Tags

The first tag is the red category pill. Obsidian tags can't contain spaces, so use hyphens: `threat-research` shows as **Threat Research**. Tags already used on the site: `investigations`, `threat-research`, `vulnerabilities`, `tooling`, `data-breaches`, `phishing-scams`, `social-engineering`, `privacy`, `OSINT`, `malware`.

## Comments to yourself

```markdown
<!-- Notes like this never appear on the site or in the RSS feed. -->
```
