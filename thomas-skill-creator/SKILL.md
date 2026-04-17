---
name: thomas-skill-creator
description: "Create new skills for Hadi's claude_skill submodule, modify and improve existing ones, and measure skill performance. Use this skill whenever Hadi says 'create a skill', 'make a skill for X', 'build a skill that does Y', 'turn this into a skill', 'update this skill', or wants to test, benchmark, or optimize an existing skill. Also trigger when Hadi is describing a workflow he wants captured and reusable. All new skills are stored in the claude_skill submodule."
metadata:
  created: 2026-04-16 03:11 WIB
  updated: 2026-04-17 00:00 WIB
---

# Thomas Skill Creator — Hadi's claude_skill Edition

A skill for creating new skills and iteratively improving them. Adapted from the default skill-creator for Hadi's setup: all skills live in `claude_skill/` (a git submodule inside `mothership`), Tommy is the one running them, and we're in Cowork (no subagents, no browser display).

**Skill output location:** `<mothership>/claude_skill/<skill-name>/`  
**Packager location:** `/sessions/<session-id>/mnt/.claude/skills/skill-creator/scripts/`

The core loop: understand → draft → test → review → iterate → package. Jump in wherever Hadi is.

---

## Step 1: Capture Intent

If the current conversation already contains a workflow Hadi wants to capture (tools used, steps taken, corrections made), extract answers from it first — then fill the gaps by asking.

Ask via `AskUserQuestion` (combine into one call where possible):
1. What should this skill enable Tommy to do?
2. When should it trigger? (what phrases or contexts)
3. What's the expected output?
4. Does it need test cases? Skills with verifiable outputs (file transforms, fixed workflows) benefit from tests. Subjective skills (writing voice) usually don't — suggest the right default.

### Confirm the Skill Name Before Building Anything

After understanding what the skill does, propose a name and confirm it before writing any files. Use `AskUserQuestion` to offer 2–3 options.

Good names follow the patterns used across this suite:
- `<platform>-<action>` — platform-specific (e.g. `twitter-tweet-publisher`, `poetry-publisher`)
- `<noun>-<verb>` — general workflows (e.g. `essay-publish-check`, `article-voice-updater`)
- `<noun>` — reference/guide skills only (e.g. `article-voice`, `human-analysis`)

Rules: kebab-case, all lowercase, 2–3 words max, specific enough to be unambiguous. The name is the folder name, the `name` frontmatter field, and what Hadi will call it — it should feel natural to say.

Wait for Hadi's selection. If he picks "Other", use his exact input — don't normalize without asking.

---

## Step 2: Interview and Research

Ask about edge cases, input/output formats, example files, success criteria, and dependencies before writing anything. Use WebSearch or WebFetch if best practices research would help. Come prepared.

---

## Step 3: Write the SKILL.md

Every skill gets its own folder:

```
claude_skill/
└── skill-name/
    ├── SKILL.md          ← required
    ├── scripts/          ← optional: executable code
    ├── references/       ← optional: docs loaded on demand
    └── assets/           ← optional: templates, icons, etc.
```

### Frontmatter

```yaml
---
name: skill-name
description: "What it does + when to trigger. Be slightly pushy — Claude undertriggers. Put all 'when to use' logic here, not in the body."
metadata:
  created: YYYY-MM-DD HH:MM WIB
  updated: YYYY-MM-DD HH:MM WIB
---
```

`created` and `updated` **must** live under `metadata:` — the packager rejects them as top-level keys.

### Skill Writing Guide

**Progressive disclosure** — three loading levels:
1. Metadata (name + description) — always in context (~100 tokens)
2. SKILL.md body — loaded when skill triggers (keep under 500 lines)
3. Bundled resources — loaded only when referenced (unlimited)

**Structure skills around domains.** If a skill supports multiple variants (e.g. AWS vs GCP), split them into `references/` files and have SKILL.md route to the right one.

**Write in imperative form.** Explain *why* things matter — Tommy responds better to reasoning than rigid rules. If you find yourself writing ALWAYS/NEVER in all caps, step back and explain the reasoning instead.

**Output format patterns:**
```markdown
## Output structure
Use this exact template:
# [Title]
## Summary
## Details
```

**Example patterns:**
```markdown
## Example
Input: "publish my latest essay"
Output: reads life-os/writing/, converts to HTML, writes to karuniawan/src/content/stories/
```

---

## Step 4: Test Cases (if applicable)

Come up with 2–3 realistic test prompts — the kind of thing Hadi would actually say. Share them: "Here are a few test cases. Do these look right?"

Save to `claude_skill/<skill-name>-workspace/evals/evals.json`:

```json
{
  "skill_name": "skill-name",
  "evals": [
    {
      "id": 1,
      "prompt": "User's task prompt",
      "expected_output": "Description of expected result",
      "files": []
    }
  ]
}
```

---

## Step 5: Run and Evaluate (Cowork mode)

We're in Cowork: no subagents, no browser display. Adapt accordingly.

### Running test cases

For each test case: read the SKILL.md, follow its instructions to complete the prompt yourself. One at a time. This is less rigorous than independent subagents (you wrote the skill and you're running it), but Hadi's review compensates.

Organize results in `claude_skill/<skill-name>-workspace/iteration-1/eval-<id>/`. Create an `eval_metadata.json` per test case:

```json
{
  "eval_id": 0,
  "eval_name": "descriptive-name",
  "prompt": "The task prompt",
  "assertions": []
}
```

### Generate the eval viewer — BEFORE evaluating yourself

**Do this before making any judgments about what to fix.** Get Hadi's eyes on the outputs first.

```bash
python <skill-creator-path>/eval-viewer/generate_review.py \
  claude_skill/<skill-name>-workspace/iteration-1 \
  --skill-name "<skill-name>" \
  --static claude_skill/<skill-name>-workspace/review.html
```

Present the HTML file using `present_files`. Hadi clicks through each test case and leaves feedback. When done, he clicks "Submit All Reviews" — this downloads `feedback.json`.

For iteration 2+, pass `--previous-workspace` pointing at the previous iteration directory.

### After Hadi reviews

Read `feedback.json`:

```json
{
  "reviews": [
    {"run_id": "eval-0", "feedback": "the output is missing X", "timestamp": "..."},
    {"run_id": "eval-1", "feedback": "", "timestamp": "..."}
  ]
}
```

Empty feedback = fine. Focus improvements on cases with complaints.

### Benchmarking

Skip quantitative benchmarking without subagents. Focus on Hadi's qualitative feedback.

---

## Step 6: Iterate

Based on feedback:

1. **Generalize** — don't over-fit to specific test cases. This skill will run thousands of times with different prompts.
2. **Keep it lean** — remove anything not pulling its weight. Read the skill with fresh eyes after writing it.
3. **Explain the why** — tell Tommy *why* something matters, not just what to do.
4. **Bundle repeated work** — if test runs all wrote the same helper script independently, put it in `scripts/` and tell the skill to use it.

Apply improvements, rerun tests into `iteration-2/`, generate a new viewer, repeat until Hadi is satisfied.

---

## Step 7: Package and Store

Once the skill is in good shape:

```bash
cd /sessions/<session-id>/mnt/.claude/skills/skill-creator
python -m scripts.package_skill <mothership>/claude_skill/<skill-name>/ <mothership>/claude_skill/
```

This produces `<skill-name>.skill` in `claude_skill/`. Present it to Hadi:

```python
present_files([{ "file_path": "claude_skill/<skill-name>.skill" }])
```

Then update `claude_skill/INDEX.md` with the new skill.

---

## Step 8: Description Optimization (optional)

After the skill is solid and Hadi agrees, offer to optimize the trigger description.

Generate 20 eval queries (10 should-trigger, 10 should-not-trigger). Make them realistic and specific — file paths, Hadi's personal context, casual speech, near-misses. Bad: `"Format this data"`. Good: `"can you tweet the attentionIsAllYouNeed essay, maybe as a thread?"`.

Run the optimization loop:

```bash
cd /sessions/<session-id>/mnt/.claude/skills/skill-creator
python -m scripts.run_loop \
  --eval-set <path-to-trigger-eval.json> \
  --skill-path <mothership>/claude_skill/<skill-name>/ \
  --model claude-sonnet-4-6 \
  --max-iterations 5 \
  --verbose
```

Apply `best_description` from the output to the frontmatter. Show Hadi the before/after.

---

## Updating an Existing Skill

- Preserve the original folder name and `name` frontmatter field exactly
- If the path is read-only, copy to `/tmp/<skill-name>/`, edit there, package from the copy, move the `.skill` back
- Update `metadata.updated` in the frontmatter
- Note what changed and why in the SKILL.md body if the change is meaningful

---

## Storage Reminder

All skills belong in `claude_skill/` — not in `life-os/`, not in `.claude/skills/`, not anywhere else.

```
mothership/
└── claude_skill/          ← git submodule (github.com/hkar19/claude_skill)
    ├── AGENT.md           ← Tommy's operating guide for this submodule
    ├── INDEX.md           ← canonical skill list
    └── skill-name/
        └── SKILL.md
```

After creating or updating a skill: commit and push `claude_skill` as its own repo, then update the submodule pointer in `mothership`.
