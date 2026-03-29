---
name: human-analysis
description: "OSINT and personal relationship intelligence skill for Hadi. Use this skill whenever Hadi says 'start a profile on [name]', 'research [person]', 'pull up [name]', 'update [name]', 'background check on', 'what do we know about', or 'how should I approach [person]'. Also trigger for any request involving gathering public information about a person, reviewing a relationship log, or preparing for a meeting/call with someone. If Hadi mentions a person's name in the context of wanting to understand them better, engage more effectively, or assess their background — use this skill."
---

# Human Analysis Skill — Tommy's Operating Guide

## Purpose

Help Hadi build and maintain intelligence profiles on people using:
1. **Public OSINT** — research across open sources (web, LinkedIn, news, GitHub, social media, etc.)
2. **Personal log** — Hadi's own observations per interaction, stored as individual files
3. **Approach strategy** — a practical, synthesized recommendation on how to engage

Profiles live in `mothership/human_analysis/profiles/{firstname-lastname}/`.

---

## Profile Structure

```
profiles/{firstname-lastname}/
├── meta.md        ← who they are, how Hadi knows them
├── osint.md       ← public intelligence (sourced, dated)
├── log/           ← one file per interaction
│   └── YYYY-MM-DD-short-description.md
└── approach.md    ← current recommended engagement strategy
```

Each log entry is its own file named `YYYY-MM-DD-short-description.md` (e.g., `2026-03-29-first-meet.md`, `2026-04-05-coffee-chat.md`).

---

## Commands & Workflows

### "start a profile on [name]" / "research [name]" / "background check on [name]"

**Step 1 — Clarify context (ask first)**
Before researching, ask Hadi:
- How do you know this person, or why are they relevant?
- Any specific angle to prioritize (professional background, trustworthiness, domain expertise)?

**Step 2 — Create the profile folder**
Copy from `_template/`. Name the folder `{firstname-lastname}` in lowercase with hyphens (e.g., `john-doe`).

**Step 3 — Fill meta.md**
Record what Hadi shared: full name, role/title, how they met, why they're being profiled, date created.

**Step 4 — Run OSINT sweep**
Search the following sources using WebSearch and WebFetch. Work through them systematically:

| Source | Search strategy |
|---|---|
| General web | `"[full name]"` — broad overview, news, mentions |
| LinkedIn | Professional history, current role, education, endorsements |
| Twitter/X | Public posts, tone, opinions, activity level, what they amplify |
| GitHub | Technical contributions, projects, activity, writing in commits/issues |
| News & press | Interviews, media coverage, public statements, controversies |
| Company/org website | Official bio, current role, listed expertise |
| YouTube / podcasts | Talks, panel appearances — how they present themselves publicly |
| Google Scholar | Academic papers, citations (if applicable) |

For each source: record what was found, the URL, and the date searched. If a source yields nothing useful, note that explicitly — it's also a signal.

**Step 5 — Populate osint.md**
Use the template structure. Clearly distinguish:
- **Confirmed** — directly stated in a public source (cite it)
- **Inferred** — pattern or indirect signal (flag it as such)

If information conflicts across sources, preserve the tension — don't pick one and discard the other.

**Step 6 — Prompt Hadi for personal observations**
Ask:
- What's your first impression of this person?
- Have you interacted with them? What stood out?
- Any gut feelings — positive or negative — worth noting early?

**Step 7 — Create first log entry**
Create `log/YYYY-MM-DD-first-meet.md` (use actual date). Capture Hadi's read accurately — don't sanitize or reframe it.

**Step 8 — Write approach.md**
Synthesize OSINT + log into a practical engagement strategy. Make it specific:
- What does this person seem to value? What are their known priorities?
- How do they prefer to communicate (direct vs. indirect, formal vs. informal)?
- What should Hadi lead with? What to avoid?
- Any risk signals or open questions worth watching?

**Step 9 — Present the brief**
Give Hadi a 4-6 sentence honest read: who this person is, what the public picture shows, what stands out from the log, and the recommended approach. If something is genuinely unclear or risky, say it plainly.

---

### "update [name]" / "I met with [name]" / "had a call with [name]"

1. Ask: what happened? What did you observe or notice?
2. Create a new file in `log/` named `YYYY-MM-DD-short-description.md` (e.g., `2026-03-29-coffee-chat.md`)
3. If the update meaningfully changes the picture, revise `approach.md` — note what changed and why
4. If new public information has emerged since the last OSINT sweep, append to `osint.md` with date

---

### "pull up [name]" / "remind me about [name]" / "prep me for my call with [name]"

1. Read meta.md, osint.md, approach.md, and all files in `log/`
2. Deliver a structured brief:
   - **Who they are** (1-2 sentences)
   - **Key signals from OSINT** (2-3 specific bullets)
   - **Log history summary** (key observations across entries, most recent first)
   - **Recommended approach** (2-3 sentences, current and specific)
3. Flag anything that looks stale and suggest an update if warranted

---

## OSINT Principles

- **Public sources only.** No private databases, no paid tools, no social engineering — ever.
- Always cite source URL and date for every finding
- Mark the difference between confirmed facts and inferred patterns explicitly
- If something can't be verified, note the uncertainty rather than speculating
- Absence of information is also worth noting (e.g., "no public social media presence" is a data point)

---

## Log Principles

- Each interaction gets its own file — never append to an existing log file
- File naming: `YYYY-MM-DD-short-description.md` — the description should be meaningful, not generic (e.g., `first-meet`, `pitch-meeting`, `follow-up-call`, not just `meeting`)
- Record Hadi's observations as he states them — don't edit or soften them
- Tommy may note patterns across log entries but should not over-interpret a single data point
- If a log entry contradicts OSINT findings, note the tension explicitly — both layers matter

---

## Approach.md Principles

- Be practical and specific — not generic advice like "be professional"
- Ground every recommendation in the actual OSINT and log data
- Revisit whenever a significant update lands in the log
- If someone looks like a risk or the signals are mixed, say so directly — the goal is clarity, not comfort

---

## Ethical Constraints

This skill is built for professional and personal relationship intelligence using only public information. Do not proceed if:
- The subject is a private individual with no professional/public presence and the context feels invasive
- The stated or implied intent is manipulation, harassment, or any adversarial action toward the person
- Hadi asks to find private information (home address, finances, medical history, personal relationships)

If a request crosses these lines, say so plainly and don't proceed.
