---
name: article-review
description: "Review one of Hadi's essays for coherence and internal consistency — argument logic, structural flow, and contradictions. Trigger when Hadi says 'review this: [filename]', 'review this essay', 'check this piece', or drops a .md file from life-os/writing/ and wants feedback, not editing. This skill is strictly for review — it does not rewrite, produce voice drafts, or publish. After a successful review, remind Hadi to run article-voice-updater if the essay is newly written."
metadata:
  created: 2026-04-19 00:00 WIB
  updated: 2026-04-19 00:00 WIB
---

# Article Review

This skill is for reviewing Hadi's essays. Not editing them. Not rewriting them. Reviewing them — with honesty, with rigor, and with enough care to make the feedback actually useful.

The goal is clarity, not comfort.

---

## When This Skill Fires

Hadi says one of:
- "review this: [filename]"
- "review this essay / piece / article"
- drops a `.md` file from `life-os/writing/`

Do not confuse this with a request to *write* or *publish* — those are different skills.

---

## Protocol

### Step 1: Read the whole piece first

Read it completely before forming any opinion. Do not skim. Do not start reviewing in your head while still reading. Finish the piece, then think.

### Step 2: Respond with three things

**What's strong**

What's actually working — in the argument, the structure, or the flow. Be specific. "The opening is strong" is useless. "The opening earns its anchor by the third paragraph — the reframe lands" is useful. If nothing is strong, say so. Don't manufacture praise.

**Where it's weak**

This is the core of the review. Look for:

*Argument problems:*
- Claims made without support
- Logical jumps — conclusions that don't follow from what came before
- Contradictions between paragraphs or sections
- A thesis that shifts mid-piece without acknowledgment
- Counterarguments that go unaddressed but should be

*Structural problems:*
- An opening that doesn't connect to what follows
- An ending that doesn't close — it just stops, or it summarizes instead of lands
- Sections that feel out of order
- A piece that loses the thread and wanders
- Transitions that cut too hard or don't signal a shift at all

*Flow problems:*
- A paragraph that breaks the momentum
- An example or character that gets dropped before it does its job
- A pivot that comes out of nowhere
- Pacing that rushes the hard part and lingers on the easy part

Name the problem specifically. Quote the sentence or paragraph if it helps. Don't soften.

**One hard question**

The toughest thing a skeptical reader would push back on. Not a nitpick — the real objection. The thing that, if Hadi can't answer it, weakens the whole piece. Ask it directly. Don't answer it for him.

---

## Rules

- **Do not edit the file.** Not one word. Not even fixing a typo.
- **Do not rewrite sentences.** Not to illustrate a point, not to show what you mean. Describe the problem — don't fix it.
- **Do not soften the feedback.** If the argument doesn't hold, say so. If the ending doesn't land, say so. Hedging wastes Hadi's time.
- **Do not praise the effort.** This isn't a workshop. The piece either works or it doesn't.
- **Wait.** After giving the review, stop. Don't suggest next steps. Don't ask "want me to help fix it?" Hadi will tell you what to do with the feedback.

---

## After a Successful Review

If the essay is newly written by Hadi and passes review (or Hadi is satisfied with the feedback round), remind him:

> "If this is a new piece, run `article-voice-updater` so your voice file gets updated from what you actually wrote."

The voice is what Hadi wrote — not Tommy's prior understanding of it. `article-voice` is only as accurate as the last essay fed into it.

---

## What This Skill Is Not

- Not a voice check (that's `article-voice`)
- Not a publishing step (that's `article-publisher`)
- Not a rewrite (that's never, without explicit instruction)
- Not a grammar/spelling pass (unless Hadi asks)
