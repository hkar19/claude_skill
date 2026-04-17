---
name: twitter-tweet-publisher
description: Adapt an essay or article from life-os/writing/ into a Twitter/X thread or single tweet, in Hadi's voice. Use when Hadi says "post this on Twitter", "make a thread from this", "Twitter version of this", "tweet this", "X thread", "share this on X", or "turn this into a thread" in the context of an article or essay. Produces a ready-to-copy tweet or thread — the argument compressed to its sharpest form — and saves it to life-os/social/.
metadata:
  created: 2026-04-16 22:30 WIB
  updated: 2026-04-17 00:00 WIB
---

# Twitter Tweet Publisher

Adapts an essay from `life-os/writing/` into a Twitter/X thread or standalone tweet, ready to copy-paste. Saves the output to `life-os/social/`.

## What Twitter is (and isn't)

Twitter is a bar fight, not a seminar. Every tweet competes with everything else in a feed moving at speed. The voice has to be punchy, direct, a little provocative — but never hollow. Hadi's voice already has this. The job is compression, not translation.

A thread works when the argument has real steps — a setup, a turn, a landing. A single tweet works when the whole point can be said in one breath.

**Voice stays Hadi's.** Do not adapt or soften the voice for Twitter. No LinkedIn-speak, no influencer-speak. Same person, smaller canvas.

---

## Workflow

### Step 1 — Identify the article

If Hadi named a file, read it from `life-os/writing/`. If he said "tweet this" without a filename, use the last article discussed.

Read the full article before writing anything. Also read `claude_skill/article-voice/SKILL.md` — the voice rules there apply here.

### Step 2 — Decide: thread or single tweet

**Single tweet** — if the article's core argument can be said in one sharp sentence or two. Good for pieces with a single strong claim.

**Thread** — if the argument needs steps: a hook, a complication, a resolution. Most essays become threads. Aim for 4–7 tweets.

If unclear, default to a thread — easier to collapse than to expand.

### Step 3 — Write

**For a thread:**

- **Tweet 1 (hook)** — the single sharpest line from the article. Must work as a standalone. No "🧵" or "/1" — just the line. 280 chars max, aim for under 200.
- **Tweets 2–N (body)** — one idea per tweet. The argument moves forward with each one. No tweet repeats what the previous said. Short sentences. Line breaks between ideas within a tweet if needed.
- **Final tweet (landing)** — the folded ending from the article, compressed. The thing that makes the reader feel the thread close. Optionally add the karuniawan link: `hadikar.id/stories/[slug]` and the coffee link: `buymeacoffee.com/hadikurniac`

**For a single tweet:**

One sentence or two. The full argument in the smallest possible space. Add the karuniawan link if it exists. Coffee link only if it fits without feeling tacked on.

**Voice rules:**
- No hashtags unless Hadi asks. They look desperate on Twitter.
- No "a thread 🧵" opener. Just start.
- No numbering tweets (1/, 2/) — let the thread flow.
- Code-switching is fine. Keep it.
- Don't hedge. Hadi makes claims. Make claims.

### Step 4 — Present the output

Show each tweet separated by a blank line and a `---` divider so Hadi can see the thread clearly and copy each tweet individually. No explanation — he can read it.

### Step 5 — Save to life-os/social/

After showing Hadi the output (don't wait for explicit approval — save alongside presenting):

1. Derive a filename from the source article slug or title: `YYYY-MM-DD_twitter_[slug].md`
2. Save to `life-os/social/` — create the folder if it doesn't exist
3. Format:

```markdown
---
source: life-os/writing/[source-filename]
platform: twitter
date: YYYY-MM-DD
type: thread | tweet
---

[tweet 1]

---

[tweet 2]

---

[final tweet]
```

Confirm with one line: `Saved to life-os/social/[filename].`

---

## Rules

- Each tweet must be under 280 characters. Check before presenting.
- The hook tweet must work without reading the rest. If it only makes sense with context, rewrite it.
- Don't summarize the article — distill it. One strong angle, taken all the way.
- Don't add ideas that aren't in the original article.
- Never use "excited to share" or any variant. Ever.
