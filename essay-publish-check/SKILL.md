---
name: essay-publish-check
description: Check which of Hadi's essays in life-os/writing/ have been published to karuniawan. Use this skill whenever Hadi asks about essay status, wants to know what's published vs in progress, asks "what have I published", "what essays are done", "which ones are live", or wants to track writing progress. Also trigger when Hadi says "check my essays" or asks what's left to publish.
metadata:
  created: 2026-03-28
  updated: 2026-04-16 03:11 WIB
---

# Essay Publish Check

This skill checks the publish status of Hadi's essays by comparing `life-os/writing/` against `karuniawan/src/content/stories/` and the karuniawan git status.

## How to determine publish status

An essay is considered **published** if:
1. A matching file exists in `karuniawan/src/content/stories/`
2. The karuniawan git working tree is clean (`nothing to commit, working tree clean`)

An essay is considered **in progress** if either condition is not met.

## Step-by-step

> Note: resolve the actual mount path at runtime — it follows the pattern `/sessions/<session-name>/mnt/personal/`. Use `ls /sessions/` to find the current session name, or reference the path from context.

### Step 1: List essays in life-os

Read all `.md` files in `life-os/writing/`, excluding `README.md` and `TEMPLATE.md`. These are Hadi's essays.

```bash
ls <mount-path>/life-os/writing/
```

### Step 2: List published stories in karuniawan

```bash
ls <mount-path>/karuniawan/src/content/stories/
```

### Step 3: Check karuniawan git status

```bash
git -C <mount-path>/karuniawan status
```

### Step 4: Match essays to stories

Essay filenames follow the pattern `YYYYMMDD_titleInCamelCase.md`.
Story filenames follow the pattern `title-in-kebab-case.md`.

Matching is fuzzy — strip the date prefix from the essay filename, then compare the title portion (case-insensitively, ignoring hyphens and underscores) to the story filename. For example:

- `20260323_attentionIsAllYouNeed.md` → matches `attention-is-all-you-need.md`
- `20260324_gameshouldrecognizegame.md` → matches `game-should-recognize-game.md`
- `20260325_maintenanceislove.md` → look for `maintenance-is-love.md` or similar

If no confident match is found, mark the essay as **unmatched** and note it separately.

### Step 5: Report

Present a clear status table:

```
PUBLISHED ✓
- [essay title] → [story filename] (git: clean)

IN PROGRESS ✗
- [essay title] → no matching story found

UNMATCHED (needs manual check)
- [essay title] → possible match: [candidate] but git has uncommitted changes
```

Keep the report brief and scannable. Hadi doesn't need a long explanation — he needs signal.

If all essays are published: say so clearly and ask if there's a new one to work on.
If there are essays in progress: name them directly and ask if he wants to open one now.
