---
name: linkedin-post
description: Adapt an essay or article from life-os/writing/ into a short, punchy LinkedIn feed post in Hadi's voice. Use when Hadi says "LinkedIn post from this", "make a LinkedIn post", "short LinkedIn version", "LinkedIn feed post", "post this on LinkedIn", or "LinkedIn this" without the word "article". Produces a ready-to-copy short-form post — argument compressed to its sharpest form, Hadi's voice intact. Saves output to life-os/social/. Not for full LinkedIn articles — use linkedin-post-publisher for that.
metadata:
  created: 2026-04-17 00:00 WIB
  updated: 2026-04-17 00:00 WIB
---

# LinkedIn Post

Adapts an essay from `life-os/writing/` into a short LinkedIn feed post. Compressed, punchy, Hadi's voice. Not a summary — a distillation.

## What a LinkedIn feed post is (and isn't)

LinkedIn feed posts live in a scroll. They need a hook that stops the thumb, a body that earns the read, and a landing that justifies the stop. But this is still Hadi — same directness, same code-switching, same willingness to make a claim and mean it.

What it isn't: a watered-down, professional-toned summary with hashtags and a "what do you think?" closer. That's not him. The format changes — the person doesn't.

Read `claude_skill/article-voice/SKILL.md` before writing. The voice rules there apply here in full.

---

## Format

A LinkedIn feed post has three parts:

**Hook (1–2 lines)** — the sharpest claim or tension from the article. This is what shows above the "see more" fold. It must work as a standalone sentence — no setup required. Make it land or they won't click.

**Body (3–6 short paragraphs)** — one idea per paragraph. Each paragraph is 1–3 sentences. Line breaks between each one — LinkedIn feed posts breathe with white space. The argument moves forward, same structural shape as the essay (anchor → complication → landing), but compressed.

**Closing line** — the folded ending. Compress the essay's last beat into one sentence. Optionally add the karuniawan link: `hadikar.id/stories/[slug]` and the coffee link: `buymeacoffee.com/hadikurniac`

**Total length:** 150–300 words. Long enough to say something real, short enough to not overstay.

---

## Workflow

### Step 1 — Identify the article

If Hadi named a file, read it from `life-os/writing/`. If he said "LinkedIn this" without a filename, use the last article discussed.

Read the full article before writing anything.

### Step 2 — Extract the core

Find the article's sharpest single claim — the one sentence that, if a reader got nothing else, is the thing worth knowing. That becomes the hook.

Then trace the argument's spine: what's the tension, the complication, the resolution? That's the body.

### Step 3 — Write

Follow the format above. Apply the voice rules from `article-voice`:

- Anchored opening → layered argument → folded ending (compressed)
- Code-switching stays
- No hedging. Make claims.
- No hashtags unless Hadi asks.
- No "excited to share", no "I've been thinking about X lately", no "Drop your thoughts below."
- Don't narrate what you're about to say. Just say it.

### Step 4 — Present the output

Show the post as-is. No wrapper, no explanation. Hadi can read it.

### Step 5 — Save to life-os/social/

After showing Hadi the output:

1. Derive a filename: `YYYY-MM-DD_linkedin_[slug].md`
2. Save to `life-os/social/` — create the folder if it doesn't exist
3. Format:

```markdown
---
source: life-os/writing/[source-filename]
platform: linkedin
date: YYYY-MM-DD
type: post
---

[post content here]
```

Confirm with one line: `Saved to life-os/social/[filename].`

---

## Rules

- Hook must work above the fold — no context required.
- Total word count: 150–300. Check before presenting.
- One idea per paragraph. White space is structure.
- Voice does not change for LinkedIn. Hadi's directness, code-switching, and claim-making stay intact.
- No hashtags by default.
- Never use "excited to share" or any variant.
- Don't add ideas that aren't in the original article.
