---
name: article-publisher
description: Publish an essay or article from life-os/writing/ to karuniawan. Use when Hadi says "publish this article", "publish this essay", "publish to karuniawan", "let's publish", "let's go publish", or "it's ready to publish" in the context of an article from life-os/writing/. Also trigger when Hadi says "push this to the site". Handles frontmatter generation, HTML conversion, and writes the file into the karuniawan content pipeline.
metadata:
  created: 2026-04-16 22:00 WIB
  updated: 2026-04-16 22:00 WIB
---

# Article Publisher

Publishes an essay from `life-os/writing/` to `karuniawan/src/content/stories/`.

## Paths

- **Source:** `life-os/writing/` (inside the mothership folder)
- **Destination:** `karuniawan/src/content/stories/` (inside the mothership folder)

## Default values

- `author`: Hadi K AR
- `type`: story
- `layout`: stacked
- `lang`: `en` for English, `id` for Indonesian

---

## Workflow

### Step 1 — Identify the article

If Hadi named a file, read it from `life-os/writing/`. If he just said "publish this" or "let's publish" without a filename, use the last article discussed in the conversation.

Read the full article before proceeding.

### Step 2 — Authorship check

Check the frontmatter `author` field in the source file:

- `thomas-reviewed-by-hadi` — Tommy drafted it, Hadi reviewed. **Ask Hadi explicitly: "Have you read through the final version and are you happy to stand behind it?"** Do not publish until he confirms.
- `hadi` or `hadi-checked-by-thomas` — Hadi wrote it. Proceed without asking.

This check exists because the disclosure note visible to readers attributes responsibility to Hadi. He must consciously own it before it goes out.

### Step 3 — Ask for missing fields

Use AskUserQuestion to collect what's needed in one call, two questions max:

1. **Title** — suggest the title from the source file frontmatter, or derive one if absent. Let Hadi confirm or change it.
2. **Slug** — suggest a slug (lowercase, hyphenated, no special chars). Confirm language (en/id).

Also derive a one-line **description** — the sharpest sentence that captures the article's argument. Present it alongside the questions; if Hadi doesn't push back, use it.

### Step 4 — Convert to karuniawan HTML format

Karuniawan stories are written in HTML, not raw markdown. Convert the article body following these rules:

**Paragraphs:**
```html
<p class="indent-8 text-justify">
Paragraph text here.
</p>
<br/>
```

**Section headers (h2):**
```html
<h2 class="text-2xl font-serif font-light text-slate-700 mb-4">Section Title</h2>
```

**Emphasis / italics:** convert `*italic*` or `_italic_` → `<em>italic</em>`

**Bold:** convert `**bold**` → `<strong>bold</strong>`

**Inline code:** convert `` `code` `` → `<code>code</code>`

**Links:** convert `[text](url)` → `<a href="url" class="font-bold text-amber-700 underline" target="_blank" rel="noopener noreferrer">text</a>`

**Horizontal rules (`---`):** Use as section breaks — do not render them as HTML `<hr>`. Just start the next section.

**The disclosure headnote** (the italicized block at the top of Thomas-written articles): wrap in a `<p>` with a light italic style:
```html
<p class="text-sm text-slate-500 italic mb-8">
Disclosure text here.
</p>
<br/>
```

**Coffee link — stealth placement** — find one natural moment in the article body where the coffee link can be woven in without announcing itself. It should feel like part of the sentence, not a call-to-action. Look for a moment where Hadi references value, attention, compensation, or generosity — anything that makes the link feel earned rather than inserted. Render it inline:
```html
<a href="https://buymeacoffee.com/hadikurniac" class="font-bold text-amber-700 underline" target="_blank" rel="noopener noreferrer">buy me a coffee</a>
```
If no natural moment exists in the body, skip the inline placement — don't force it.

**Coffee link footer** — always append this card at the end of every article, after the last paragraph:
```html
<div class="mt-12 rounded-xl border border-slate-200 p-6 bg-slate-50/60 flex flex-col items-center gap-3 text-center">
  <p class="text-sm font-semibold text-slate-700">If this was worth your attention — support the writing</p>
  <a href="https://buymeacoffee.com/hadikurniac" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" />
  </a>
</div>
```

### Step 5 — Build the frontmatter

```markdown
---
type: story
slug: '/your-slug-here'
date: 'YYYY-MM-DD'
lang: en
year: YYYY
title: 'Title Here'
author: 'Hadi K AR'
description: One-line sharp description of the argument.
layout: stacked
---
```

Use the article's date from source frontmatter. If no date is present, use today's date.

### Step 6 — Write the file

Filename: slug without leading slash, e.g. `your-slug-here.md`

Write to: `karuniawan/src/content/stories/your-slug-here.md`

Structure: frontmatter first, then the converted HTML body.

### Step 7 — Confirm

One line. No ceremony.

Example: `Done — "Title" is live at karuniawan/src/content/stories/your-slug-here.md.`

---

## Rules

- Never publish a Thomas-written article without explicit confirmation from Hadi that he's read it and stands behind it.
- Do not alter the article's argument, wording, or structure during HTML conversion. You are reformatting, not editing.
- If a story with the same slug already exists, flag it and ask before overwriting.
- If the source article is in Indonesian, set `lang: id`.
- Preserve code-switching (Indonesian/Arabic words mid-sentence) exactly as written — do not translate.
- Never add an image field unless Hadi explicitly provides one.
