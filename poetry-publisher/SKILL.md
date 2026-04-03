---
name: poetry-publisher
description: Publish a poem from life-os/poetry/ to karuniawan. Use when Hadi says "publish this", "publish this poem", or "publish to karuniawan" with or without a filename. Handles frontmatter generation and drops the file into the karuniawan content pipeline.
---

# Poetry Publisher

Publishes a poem from `life-os/poetry/` to `karuniawan/src/content/poems/`.

## Paths

- **Source:** `life-os/poetry/` (inside the mothership folder)
- **Destination:** `karuniawan/src/content/poems/` (inside the mothership folder)

## Default values

- `author`: Malik A.D.
- `type`: poem
- `image`: none (text-only cards)
- `lang`: match the poem's language — `en` for English, `id` for Indonesian

## Workflow

### Step 1 — Identify the poem

If Hadi named a file, read it from `life-os/poetry/`. If he just said "publish this" without a filename, use the last poem discussed in the conversation.

Read the poem fully before proceeding.

### Step 2 — Ask for the missing fields

Use AskUserQuestion to collect what's needed in one call, two questions max:

1. **Title** — suggest a title derived from the poem's opening line or mood. Let Hadi confirm or change it.
2. **Slug** — suggest a slug (lowercase, hyphenated, no special chars, no leading slash in the question but include it in the final frontmatter). Confirm language (en/id).

Also derive a one-line **description** — the most evocative line, or a plain summary. Present it alongside the questions; if Hadi doesn't push back, use it.

### Step 3 — Generate the karuniawan file

Construct frontmatter like this:

```markdown
---
type: poem
slug: '/your-slug-here'
date: 'YYYY-MM-DD'
lang: en
year: YYYY
title: 'Title Here'
author: 'Malik A.D.'
description: One-line evocative description.
---
```

Use the poem's date from its source file frontmatter. If no date is present, use today's date.

For the poem body, preserve original line breaks exactly. Use `\` at the end of each line (Markdown hard line break) to maintain the poem's rhythm — consistent with existing poems in karuniawan.

### Step 4 — Write the file

Filename: slug without leading slash, e.g. `your-slug-here.md`

Write to: `karuniawan/src/content/poems/your-slug-here.md`

### Step 5 — Confirm

One line. No ceremony.

Example: `Done — "Title" is live at karuniawan/src/content/poems/your-slug-here.md.`

## Rules

- Do not alter the poem's words, punctuation, or structure. Only wrap it in frontmatter.
- If the poem is in Indonesian, set `lang: id`.
- Never add an image field unless Hadi explicitly provides one.
- If a poem with the same slug already exists, flag it and ask before overwriting.
