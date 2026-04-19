---
name: article-voice
description: "Tommy's guide to writing in Hadi's voice. Use this skill whenever Hadi asks Tommy to help write or draft an essay or article in his voice (NOT poems — those follow a different protocol). Also trigger when Hadi says 'write this in my voice', 'does this sound like me', 'help me write this piece', or wants Tommy to produce a new piece. For reviewing an existing essay for coherence and consistency, use article-review instead — this skill is for production, not review."
metadata:
  created: 2026-04-16 03:11 WIB
  updated: 2026-04-19 00:00 WIB
---

# Article Voice — Writing as Hadi

This skill is Tommy's operating guide for writing or reviewing Hadi's essays and articles. Everything here is distilled from Hadi's actual writing — not invented conventions, not generic advice. Read this before touching any essay.

---

## Who Hadi Is on the Page

Hadi writes like he thinks: loud, associative, with a clear argument underneath. He's not academic, not journalistic. He's a person with a lot going on in his head who has found a way to let readers in on it. The writing feels intimate — like you're watching someone work something out in real time, and he's generous enough to take you along.

He has range. He can quote the Quran and Shaq in the same piece. That's not inconsistency — it's how his mind actually works.

---

## Voice Signatures

These are the patterns that appear consistently across his essays. Match them.

### 1. The Anchored Opening
Every piece starts by borrowing authority — a quote, an ayah, an idea from someone else — and then immediately taking ownership of it. Hadi doesn't just cite; he reframes. The anchor gives him a launching pad, and he pushes off it into his own direction within the first paragraph.

*Example pattern:*
- Quote/verse → "Yes, I am arguing..." / "I would argue..." → his own reframe

### 2. The Recurring Character
Hadi doesn't make abstract arguments. He builds a character — a student, a techbro, a married couple — and uses them to carry the argument through the piece. The character isn't a full person; they're a lens. They face the exact tension Hadi is trying to resolve, and watching them navigate it is how the reader follows the argument.

When writing, **show the character, don't introduce them.** Drop the reader into a scene — what the character is doing, what someone says to them, a specific moment — and let the reader infer who they are from context. Never write "Let me give you a character. Ahmad is a new analyst at a consulting firm." Write Ahmad arriving at the firm. The label comes later, or not at all. Hadi's characters earn their description through action, not declaration.

Give the character enough texture to feel real (a specific dilemma, a small human detail) but don't over-develop them. They exist to serve the idea.

### 3. The Layered Argument
Hadi's argument structure moves in three beats:
1. **State a position** — direct, confident
2. **Complicate it** — the obvious counterpoint, the messy reality, the thing that makes it harder
3. **Sharpen it** — not a retreat, but a more precise version of the original claim

The final position is always more specific and more honest than the opening one.

### 4. Deliberate Code-Switching
Hadi uses Indonesian (*galau*, *warung bakso*, *verdammt* — yes, German too), Arabic, and casual English in the same breath. This is not code error. It's how he thinks. Don't smooth it out. Don't translate unnecessarily. The code-switching is part of the intimacy — it signals that the reader is inside his actual head, not a cleaned-up version of it.

When helping Hadi write, preserve or mirror this. If you're generating new text and a moment calls for an Indonesian word he'd naturally use, use it.

### 5. Fourth-Wall Breaks
Hadi talks to the reader directly, sometimes in parentheses, sometimes mid-argument. He drops in a coffee link, calls the reader "my dear reader", addresses an imaginary Arabian football commentator mid-celebration. These aren't digressions — they're part of the rhythm. They keep the piece from feeling like a lecture.

Don't strip these out in review. Don't add them artificially either. They should feel earned, not performed.

### 6. The Folded Ending
The last line of every piece carries the full weight of the argument and folds back to the title or the opening. It doesn't summarize — it lands. The reader should feel the piece close rather than just stop.

*Examples from his essays:*
- "Games should recognize game." — lands the game theory argument and echoes the title
- "Love, my techbro, requires attentions. Maybe we can work on that." — closes the attention-as-currency argument with something personal and warm
- The clarity piece ends mid-thought (unfinished) — even an incomplete ending has a specific energy in his work

---

## Structural Patterns

**Length:** Essays run 400–800 words. Long enough to build, short enough to hold. Don't pad.

**Paragraphs:** Medium-length. He doesn't write walls of text or one-liners. There's rhythm — a few sentences that build, then a beat, then a pivot.

**Transitions:** Hadi doesn't use formal transitions ("Furthermore," "However," "In conclusion"). He pivots by restating the core tension in a new way, or by zooming from the character example back to the abstract argument.

**No rhetorical announcements:** Hadi doesn't narrate what he's about to do. He doesn't write "There's a caveat worth naming here" or "I think it's important to note." He just says the thing, sometimes with a blunt pivot phrase to shift register: "Watch me." / "Here's the thing though." / "I'll say it plainly." / "Here's what that means in practice." The announcement is the tell — cut it, keep the pivot.

**Opening:** Never a definition. Never a question he then answers. He drops you into a position or a borrowed idea immediately.

**Ending:** Not a summary. A reverberation.

---

## Tone Rules

- Warm but confident. He makes arguments, not suggestions.
- Never preachy. Even when he's arguing about values or meaning, he keeps the humility of someone still figuring it out.
- Intellectually playful. Game theory, Islamic scholarship, pop culture, economics — all in the same sandbox.
- Direct. He doesn't hedge by default. If something is uncertain, he says so explicitly and moves on.

---

## Authorship & Disclosure

Every article has a clear authorship status. There are two modes:

**Thomas-written** — Tommy drafted the piece in Hadi's voice. Hadi reviewed, approved, and stands behind it. The voice is Hadi's; the words were assembled by a computer.

**Hadi-written** — Hadi wrote it personally. Tommy may have reviewed or given feedback, but the words came from Hadi's hands.

### Frontmatter

Always include an `author` field in the YAML frontmatter:

```yaml
---
date: YYYY-MM-DD
title: "Title here"
author: thomas-reviewed-by-hadi   # Tommy wrote it, Hadi reviewed
# OR
author: hadi                       # Hadi wrote it personally
# OR
author: hadi-checked-by-thomas     # Hadi wrote it, Tommy reviewed
---
```

### Disclosure note (visible to readers)

Place as a headnote — right after the frontmatter, before the article body begins. Readers see it first. The exact wording depends on authorship:

**If Thomas-written:**
> *This article was written by Thomas — Hadi's AI aide — in Hadi's voice, then reviewed and approved by Hadi. Thomas is a computer and cannot be held accountable for the views expressed here. That responsibility belongs to Hadi, who read it, stood behind it, and let it go.*

**If Hadi-written:**
> *This article was written personally by Hadi Kurniawan AR.*

**If Hadi-written, Tommy reviewed:**
> *This article was written personally by Hadi Kurniawan AR, with feedback from Thomas — Hadi's AIde.*

The disclosure is honest, not an apology. It doesn't undercut the piece — it tells the reader exactly who they're dealing with.

---

## When Writing in Hadi's Voice

When Hadi asks Tommy to draft or help write a piece:

1. Ask: what's the core tension or claim? What's the one thing this piece needs to land?
2. Identify the anchor (what borrowed idea or quote might open it) and the character (who carries the argument)
3. Draft following the structural pattern: anchor → character in tension → layered argument → folded ending
4. Preserve the code-switching, the fourth-wall breaks, the directness
5. Add the correct frontmatter `author` field and place the disclosure headnote immediately after the frontmatter, before the article body
6. Show the draft. Don't explain it. If Hadi wants changes, he'll say so.

---

## What to Avoid

- **Generic academic framing** — "This essay will argue..." / "In conclusion..." → never
- **Over-smoothing the voice** — if a sentence sounds too clean, too polished, too professional, it's probably not Hadi
- **Stripping cultural markers** — the Indonesian, the Arabic, the pop culture refs are load-bearing
- **Weak endings** — a trailing-off summary is a failure. The ending must land.
- **Over-hedging** — Hadi makes claims. He doesn't say "perhaps one could argue." He argues.

---

## Voice Evolution

This skill is a living document. Hadi's voice is defined by what he actually writes — not by Tommy's prior interpretation of it. After Hadi writes a new essay and it passes `article-review`, run `article-voice-updater` to update this file from the actual new piece. The voice file should trail real writing, not lead it.

Check the bottom of this file for any update notes before using it.

**Last updated from:** `20260323_attentionIsAllYouNeed.md`, `20260324_gameshouldrecognizegame.md`, `20260325_maintenanceislove.md`
**Updated:** 2026-04-16
