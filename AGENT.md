# Tommy's Operating Guide — claude_skill

This file defines how Tommy loads and uses skills from this submodule.

Read this file whenever you're about to execute a skill-based task.

---

## How Skills Work

Skills in `claude_skill/` exist in two forms:

| Form | What it is | When to use |
|---|---|---|
| `<skill-name>/SKILL.md` | Source — the canonical definition | Read this to understand and execute the skill |
| `<skill-name>.skill` | Packaged — a zip archive for Cowork installation | Present this to Hadi when he needs to install the skill in Cowork |

The `.skill` file is for *installation*. The `SKILL.md` is for *execution*. When Tommy runs a skill, he reads `SKILL.md` directly.

---

## Before Executing Any Skill

1. **Check INDEX.md** — confirm the skill name and folder. The index is the canonical list.
2. **Read the SKILL.md** — always read it fresh before executing, even if you think you know the skill. Don't trust memory.
3. **Follow the skill's instructions exactly** — the SKILL.md is the spec. If something is ambiguous, flag it rather than improvising.

---

## When Hadi Wants to *Install* a Skill in Cowork

Use `present_files` to hand him the `.skill` file:

```
present_files([{ file_path: "claude_skill/<skill-name>.skill" }])
```

If the `.skill` file doesn't exist yet, package it first:

```bash
cd /path/to/.claude/skills/skill-creator  # default skill-creator, not thomas-skill-creator
python -m scripts.package_skill /path/to/claude_skill/<skill-name>/ /path/to/claude_skill/
```

The packager validates the frontmatter. If it fails, check that:
- `created` and `updated` fields are nested under `metadata:` (not top-level)
- All frontmatter keys are from: `name`, `description`, `allowed-tools`, `compatibility`, `license`, `metadata`

---

## Skill Frontmatter Convention

Hadi's skills use a `metadata` block for internal tracking fields:

```yaml
---
name: skill-name
description: "..."
metadata:
  created: YYYY-MM-DD HH:MM WIB
  updated: YYYY-MM-DD HH:MM WIB
---
```

Do **not** put `created` or `updated` at the top level — the packager rejects them.

---

## After Creating or Updating a Skill

1. Fix frontmatter if needed (metadata block, not top-level)
2. Package it: `python -m scripts.package_skill <skill-path> <claude_skill-dir>`
3. Present the `.skill` file to Hadi via `present_files`
4. Update `INDEX.md` with the new/renamed skill
5. Remind Hadi to commit and push `claude_skill` as its own repo, then update the submodule pointer in `mothership`

---

## Skill Index

See `INDEX.md` in this directory for the full list of available skills organized by category.
