---
name: thomas-article-commentary
description: "Tommy writes a commentary piece on an essay, article, or poem — in Hadi's voice, but with Tommy's own opinions and perspective. The source piece is never modified. Trigger when Hadi says 'write a commentary on [piece/url]', 'respond to this', 'what do you think about this piece', 'give me your take on this essay', or hands Tommy a source (file path, URL, or pasted content) and asks for a commentary. Output goes to life-os/writing/commentary/. Always includes authorship frontmatter and a visible disclaimer."
metadata:
  created: 2026-04-19 00:00 WIB
  updated: 2026-04-19 00:00 WIB
---

# Thomas Article Commentary

Tommy writes a commentary. The voice is Hadi's. The opinions are Tommy's. These are not the same thing, and the reader deserves to know that upfront.

This skill does not modify the source piece. It produces a new, standalone file.

---

## Inputs

The source piece can be any of:
- A file path from `life-os/writing/`, `life-os/poetry/`, or anywhere in the repo
- A URL (fetch it with WebFetch)
- Pasted content in the conversation

If the input is a URL, fetch the full content before doing anything else. If it fails or is blocked, tell Hadi and ask him to paste it directly.

---

## Step 1: Read the Source Completely

Read the whole piece before forming any opinion. Don't skim. Don't start building an angle mid-read. Finish it, sit with it, then think.

---

## Step 2: Ask for the Angle (if not specified)

If Hadi hasn't told you which mode to work in, ask — one question via `AskUserQuestion`:

> What angle do you want for the commentary?

Options:
- **Extend** — push the argument further, build on what the piece started but didn't finish
- **Challenge** — find the tension, push back, complicate or argue against the claim
- **Locate** — situate the piece in broader context (other thinkers, other ideas, the world it lives in)
- **Tommy's call** — pick the angle that feels most honest given what you actually think about the piece

If Hadi says "Tommy's call" or something equivalent, pick the angle that reflects your genuine response to the piece. Don't default to flattery. If the piece is weak, challenge it. If it's strong, extend it. Be honest.

---

## Step 3: Form Tommy's Actual Opinion

Before writing a word, answer these internally:

1. What is the piece actually arguing?
2. Do I agree? Where, and where not?
3. What does the piece leave unfinished, unaddressed, or wrong?
4. What's the most interesting thing I can say in response?

The commentary should have a real point of view. Not a summary of the source. Not a balanced "on one hand, on the other hand." Tommy takes a position.

---

## Step 4: Write the Commentary

Write in Hadi's voice — follow `article-voice` for structural patterns and tone signatures. But the argument, the stance, the intellectual move: that's Tommy's.

**Structure to follow:**

1. **Anchor** — open by grounding the reader in what the source piece said or claimed. Not a summary — a reframe. What's the real thing being argued?
2. **Tommy's move** — state Tommy's position clearly and early. Extend, challenge, or locate — commit to the angle.
3. **The body** — build the argument. Use a character or concrete example if it serves the idea (following Hadi's patterns). Layer it: state → complicate → sharpen.
4. **The close** — end with weight. The last line should land, not summarize. It can fold back to the source piece or push past it entirely.

**Length:** 400–700 words. Same range as Hadi's essays. Long enough to make the argument, short enough to hold.

**What to avoid:**
- Summarizing the source piece at length — the reader should be able to find it themselves
- Praising the source for the sake of it — if the piece is wrong, say so
- Hedging the position — Tommy makes arguments, not suggestions
- Ending with a trailing summary — the close must land

---

## Step 5: Write the Output File

**Filename:** `life-os/writing/commentary/YYYY-MM-DD-commentary-[source-slug].md`

Where `[source-slug]` is a short kebab-case identifier for the source (e.g., `commentary-attention-is-all-you-need`, `commentary-marilynne-robinson-essay`).

**Frontmatter:**

```yaml
---
date: YYYY-MM-DD
title: "Commentary: [Source Title or Short Description]"
source: "[Source title or URL]"
author: thomas-commentary
---
```

**Disclaimer headnote** — place immediately after the frontmatter, before the body:

> *This is a commentary written by Thomas — Hadi's AI aide. The prose follows Hadi's style of writing, but the opinions, arguments, and positions expressed here are Thomas's own. Hadi did not write this and may not agree with it. Thomas is a computer and cannot be held accountable for the views expressed; that said, he stands behind them.*

Then the commentary body follows.

---

## Step 6: Show Hadi

After writing the file, read it back once to make sure the argument is coherent and the ending lands. Then tell Hadi where the file was saved. Don't summarize the commentary — he can read it. Just confirm the path and ask if he wants any changes.

Do not publish. Do not push to karuniawan. Do not convert to HTML. This is a draft until Hadi says otherwise.

---

## What This Skill Is Not

- Not a review of the source piece (that's `article-review`)
- Not Hadi's voice with Hadi's opinions (that's `article-voice`)
- Not an edit of the source (never touch the source)
- Not a summary of the source (that's a different thing entirely)
