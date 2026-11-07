<%*
// "Publish draft": moves the open draft out of the gitignored drafts/ folder into content/
// so the next Commit-and-sync publishes it.
//   drafts/posts/<slug>/index.md          → content/posts/<slug>/
//   drafts/investigations/<slug>/index.md → content/investigations/<slug>/
// The whole folder moves (images, CSVs), Obsidian keeps the links working, and draft is unticked.
// Run it with the draft open: Templater icon → Publish draft (it inserts nothing into the note).
const file = tp.config.target_file;
const parts = file.path.split("/");
const sections = ["posts", "investigations"];
if (parts.length !== 4 || parts[0] !== "drafts" || !sections.includes(parts[1]) || parts[3] !== "index.md") {
  new Notice("Publish draft: open a draft's index note (drafts/posts/<name>/index.md or drafts/investigations/<name>/index.md) first.", 10000);
  return;
}
const folder = file.parent;
const dest = `content/${parts[1]}/${folder.name}`;
if (app.vault.getAbstractFileByPath(dest)) {
  new Notice(`Publish draft: ${dest} already exists. Rename the draft's folder or remove the old one, then try again.`, 10000);
  return;
}
const ok = await tp.system.suggester(
  [`Publish "${folder.name}" (moves it to ${dest})`, "Cancel"],
  [true, false],
  false,
  "Publish this draft? The next Commit-and-sync puts it on GitHub and the live site."
);
if (!ok) return;
await app.fileManager.processFrontMatter(file, (fm) => { fm.draft = false; });
await app.fileManager.renameFile(folder, dest);
new Notice(`Moved to ${dest} and unticked draft. Run Git: Commit-and-sync to put it live.`, 10000);
-%>
