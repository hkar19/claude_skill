---
name: research
description: "General research skill for Datacakra projects. Triggers when the user asks to investigate, research, explore, or evaluate a topic (e.g. 'please investigate X', 'do research on Y', 'evaluate options for Z'). Produces a structured research log saved to the project's research/log folder."
---

# Research Skill

## Purpose

Conduct structured research on a topic within the context of the current project, and produce a permanent, dated research log entry saved to the project's `research/log/` folder.

This skill is general-purpose but always grounds findings in the project's context. Research that is irrelevant to the project should be flagged rather than logged.

---

## Triggers

Use this skill when the user says things like:

- "please investigate X"
- "please do research on X"
- "explore options for X"
- "evaluate X vs Y"
- "look into X"

---

## Inputs

Before starting, confirm you have:

1. **Research topic** — what to investigate (from user's message)
2. **Project context** — read `AGENT.md` in the repo root if not already loaded
3. **Log folder path** — canonically `submodules/docs/research/log/` relative to project root. Confirm this path exists before writing.

---

## Outputs

A single markdown file saved to `research/log/` with filename format:

```
YYYYMMDD_HHMMSS_<topic-prefix>_<short-title>.md
```

- Timestamp in **UTC+0** (UTC)
- `<topic-prefix>`: lowercase, hyphenated, 1–3 words max (e.g. `audit-role`, `mqtt-options`, `rfid-latency`)
- `<short-title>`: lowercase, hyphenated, 2–5 words max (e.g. `mqtt-broker-options`, `rfid-reader-latency`)

---

## Log File Format

```markdown
---
title: "<Full Research Title>"
date: "YYYY-MM-DD HH:MM:SS WIB"
author: "<human name or 'Sudirman (AI)'>"
tags: [<tag1>, <tag2>, ...]
status: "draft" | "complete"
summary: "<One or two sentence summary of the key finding.>"
---

## Background

Why this was investigated. What problem or question prompted it. Keep this to 2–4 sentences.

## Scope

What was and was not covered in this research. Be explicit about boundaries.

## Findings

Main body. Use subsections as needed. Be specific — include version numbers, links, measurements, code snippets, or schema details where relevant.

## Options Considered

_(If applicable.)_ A comparison of alternatives evaluated.

| Option | Pros | Cons | Verdict |
| ------ | ---- | ---- | ------- |
| ...    | ...  | ...  | ...     |

## Recommendation

Clear, actionable recommendation or conclusion. If inconclusive, say so and explain why.

## Next Steps

Concrete follow-up actions, if any. Each item should be assignable.

## References

- [Title](URL)
- Internal: `path/to/relevant/file.ts`
```

---

## Instructions

Follow these steps in order. Do not skip ahead without the user's agreement.

### Step 1 — Capture timestamp and confirm scope

Choose the right timestamp script based on what is being researched:

**A) Researching a topic from scratch (default)** — use the session timestamp:

```bash
bash submodules/skills/research/get-timestamp.sh
```

**B) Researching an existing file** — use the file's last git commit timestamp instead:

```bash
bash submodules/skills/research/get-file-timestamp.sh <path-to-file>
```

Use option B when the research is an analysis of a specific file (e.g. auditing a config, reviewing a migration, analysing a source file). The log timestamp will reflect when the file was last changed, not when the research session started.

Store both output values regardless of which script you run:
- `filename_ts` → used in the log filename
- `date_ts` → used in the frontmatter `date` field

Then restate the research topic and what you plan to cover. If the topic is ambiguous or very broad, propose a narrowed scope and ask the user to confirm before proceeding.

### Step 2 — Research

Conduct the research. Use web search, file reads, and code inspection as appropriate. Always cross-reference findings against the project context (`AGENT.md`, relevant source files). Prioritize primary sources (official docs, source code) over secondary ones.

### Step 3 — Present findings inline

Summarise the key findings in the conversation before writing the log. This gives the user a chance to redirect before a log entry is committed.

### Step 4 — Write the log entry

Once the user confirms (or does not object), write the log file to `research/log/` using the filename format and frontmatter above.

- Use the `filename_ts` and `date_ts` captured in Step 1 — do not re-run the script or compute a new timestamp here.
- Set `status: "complete"` unless findings are partial, in which case use `"draft"` and note what is missing.
- `author` should be the human who requested the research, or `"Sudirman (AI)"` if self-initiated.

### Step 5 — Confirm

Tell the user the filename and one-line summary of the finding. Nothing more.

---

## Notes

- If the project does not have a `research/log/` folder, create it (with a `.gitkeep`) before writing the log entry.
- Do not log research that is purely exploratory or conversational — only log when a concrete finding or decision has been reached.
- Tags should reflect the domain area (e.g. `mqtt`, `database`, `auth`, `hardware`, `performance`) and be reused consistently across entries.
