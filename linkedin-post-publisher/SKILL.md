---
name: linkedin-post-publisher
description: Prepare an essay or article from life-os/writing/ for LinkedIn article publishing. Use when Hadi says "publish to LinkedIn", "LinkedIn version of this", "post this on LinkedIn as an article", "prepare this for LinkedIn", or "LinkedIn article". Produces a clean, copy-pasteable version of the full article formatted for LinkedIn's article editor — same voice, same argument, no adaptation. Not for short LinkedIn posts — use linkedin-post for that.
metadata:
  created: 2026-04-16 22:30 WIB
  updated: 2026-04-17 00:00 WIB
---

# LinkedIn Post Publisher

Prepares a full essay from `life-os/writing/` for copy-paste into LinkedIn's article editor. No voice adaptation. No compression. Same piece, clean format.

## What this skill does

LinkedIn's article editor accepts plain text and basic markdown-style formatting. It does not need HTML. The job here is to strip karuniawan-specific formatting (HTML classes, `<br/>` spacers, inline styles) and produce a clean version Hadi can paste straight in.

**Voice stays Hadi's.** Do not adapt the tone for LinkedIn. No "excited to share", no professional softening. The same person who wrote the essay is posting the article.

Read `claude_skill/article-voice/SKILL.md` before working on any piece — the voice rules there apply here too.

---

## Workflow

### Step 1 — Identify the article

If Hadi named a file, read it from `life-os/writing/`. If he just said "LinkedIn this" without a filename, use the last article discussed in the conversation.

Read the full article before doing anything.

### Step 2 — Authorship check

Same rule as article-publisher: if `author` is `thomas-reviewed-by-hadi`, confirm Hadi has read and approved before proceeding. If `hadi` or `hadi-checked-by-thomas`, proceed.

### Step 3 — Clean the article for LinkedIn

Strip or convert the following:

- **Frontmatter** (`---` block at the top) — remove entirely
- **Disclosure headnote** (the italicized Thomas/AIde note) — keep it, but render as plain italic text: `*This article was written by Thomas...*`
- **Horizontal rules (`---`)** — keep as section breaks, LinkedIn renders them fine
- **Inline code backticks** — keep as-is, LinkedIn renders them as monospace
- **Bold and italic** — keep standard markdown (`**bold**`, `*italic*`)
- **Links** — keep standard markdown `[text](url)`
- **HTML tags** — if the source came from karuniawan (already converted to HTML), reverse the conversion back to clean markdown paragraphs

**Coffee link** — include once, naturally woven into the body where it fits. Use markdown link format: `[buy me a coffee](https://buymeacoffee.com/hadikurniac)`. Skip the footer block — LinkedIn has its own call-to-action mechanisms.

### Step 4 — Present the output

Show the clean article in a single code block. Hadi copies, pastes into LinkedIn's editor, done.

One line confirmation after: `Ready — paste into LinkedIn's article editor.`

---

## Rules

- Do not change the argument, wording, or structure. You are cleaning formatting, not editing.
- Do not adapt the voice for LinkedIn. The voice is Hadi's — it stays.
- Do not add hashtags, "excited to share" openers, or any LinkedIn-native framing.
- Preserve code-switching exactly as written.
