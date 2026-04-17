---
name: article-voice-updater
description: "Updates the article-voice skill whenever Hadi writes a new essay or article. Triggers automatically when a new .md file is added to life-os/writing/ (excluding TEMPLATE.md and README.md). Also trigger when Hadi says 'update my voice skill', 'I wrote something new', 'distill this into my voice guide', or 'feed this to article-voice'. This skill reads the new piece, extracts what's new or evolved in Hadi's voice, and patches article-voice/SKILL.md accordingly."
metadata:
  created: 2026-04-16 03:11 WIB
  updated: 2026-04-16 03:11 WIB
---

# Article Voice Updater

This skill keeps `article-voice/SKILL.md` alive. Every new essay Hadi writes is a data point. Some will confirm patterns already in the guide. Some will show evolution — a new structural move, a new type of character, a shift in tone. This skill's job is to read the new piece, compare it against the existing guide, and update it honestly.

The goal is not to make the guide longer. It's to make it more accurate.

---

## When This Runs

This skill triggers when:
- A new `.md` file appears in `life-os/writing/` (excluding `TEMPLATE.md`, `README.md`)
- Hadi explicitly says to update the voice guide with a new piece

---

## Step 1: Read the New Article

Read the full article from `life-os/writing/`. Don't skim.

Note:
- How it opens (anchor type, borrowed idea, or original)
- What character or vehicle it uses (if any)
- How the argument is structured (does it follow the 3-beat pattern?)
- Tone markers (code-switching, fourth-wall breaks, directness)
- How it ends (does it fold back? does it land?)
- Anything that feels new or different from previous essays

---

## Step 2: Read the Current article-voice/SKILL.md

Read `claude_skill/article-voice/SKILL.md` in full. Hold both in mind simultaneously.

---

## Step 3: Diff — What's New, What's Confirmed, What's Shifted

Go through the new article and classify each observation:

**Confirmed** — The new piece uses a pattern already in the guide. Note it (strengthens confidence in that pattern, no change needed).

**New** — A pattern or move appears that isn't in the guide yet. Decide if it's a one-off or a real addition. If it appeared in this piece and you can see traces of it in previous essays too, it's real. If it seems totally isolated, flag it to Hadi rather than adding it.

**Shifted** — Something in the guide no longer holds exactly. Maybe the ending style is evolving, or the character structure is looser than documented. Note what shifted and how.

---

## Step 4: Decide What to Update

Be conservative. The guide should reflect Hadi's real voice, not every experiment. Rules for what earns an update:

- A **new pattern** is worth adding if it appeared in this piece AND you can see traces of it in at least one previous essay (even implicitly)
- A **shift** is worth updating if it changes the guide in a meaningful way, not just a minor variation
- A **confirmed pattern** earns a note in the "Last updated from" section but no body changes
- A **one-off experiment** gets flagged to Hadi, not added to the guide

If you're unsure whether something is real or experimental, err toward flagging it rather than adding it. The guide's value comes from accuracy, not completeness.

---

## Step 5: Update article-voice/SKILL.md

Make targeted edits — don't rewrite sections wholesale unless the shift is fundamental.

**For additions:** Add the new pattern to the most relevant section (Voice Signatures, Structural Patterns, Tone Rules). Write it in the same style as the existing entries — specific, grounded in actual examples from Hadi's writing.

**For shifts:** Update the relevant entry. Keep the old version visible briefly if the shift is subtle — e.g., "Previously X; now tends toward Y in recent essays."

**Always update the footer:**

```
**Last updated from:** [list of all filenames used to build this version]
**Updated:** YYYY-MM-DD
```

---

## Step 6: Report to Hadi

After updating, give a brief honest report:

- What was confirmed (1-2 things max — don't list everything)
- What was added or changed (and why)
- Anything you flagged as experimental and didn't add (with your reasoning)

Keep it short. This is a maintenance task, not a debrief.

---

## What Not to Do

- Don't add every stylistic choice from a single piece — one-offs aren't patterns
- Don't make the guide longer just because you read something new — if nothing meaningfully changed, say so and update only the footer
- Don't soften or generalize existing entries to accommodate a new essay — if the new piece genuinely contradicts an existing pattern, flag it rather than blurring the pattern
- Don't run without reading both the article AND the current guide — updates without that comparison are noise

---

## File Paths

- New articles: `life-os/writing/YYYYMMDD_title.md`
- Voice guide to update: `claude_skill/article-voice/SKILL.md`
- Skip: `life-os/writing/TEMPLATE.md`, `life-os/writing/README.md`
