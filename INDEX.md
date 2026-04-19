# claude_skill — Skill Index

All custom skills for Hadi's workflows. Each skill lives in its own folder with a `SKILL.md` as the entry point.

**Read the relevant `SKILL.md` before executing any skill-based task.**

---

## Writing & Voice

| Skill | What it does |
|---|---|
| `article-voice/` | Tommy's guide to writing in Hadi's voice — distilled from his actual essays. Read this before writing or drafting any article. |
| `article-voice-updater/` | Updates `article-voice/` as Hadi writes new essays. Run after a new piece lands in `life-os/writing/`. |
| `article-review/` | Reviews an essay for coherence, internal consistency, argument logic, and structural flow. Use when Hadi says "review this: [filename]". Does not edit or rewrite. |
| `thomas-article-commentary/` | Tommy writes a commentary on an essay, article, or poem — in Hadi's voice, but with Tommy's own opinions. Source is never modified. Output goes to `life-os/writing/commentary/`. Includes authorship frontmatter and a visible disclaimer. |

## Publishing

| Skill | What it does |
|---|---|
| `article-publisher/` | Publishes a full essay from `life-os/writing/` to karuniawan — handles frontmatter, HTML conversion, and file placement. |
| `poetry-publisher/` | Publishes poems to karuniawan with correct frontmatter. |
| `essay-publish-check/` | Checks which essays in `life-os/writing/` have been published to karuniawan. |

## Social Media

| Skill | What it does |
|---|---|
| `twitter-tweet-publisher/` | Adapts an essay into a Twitter/X thread or single tweet. Saves output to `life-os/social/`. |
| `linkedin-post/` | Adapts an essay into a short, punchy LinkedIn feed post. Saves output to `life-os/social/`. |
| `linkedin-post-publisher/` | Prepares a full article for LinkedIn's article editor — format clean, voice unchanged. |

## Intelligence & Research

| Skill | What it does |
|---|---|
| `human-analysis/` | OSINT and personal relationship intelligence for building profiles on people. |

## Meta

| Skill | What it does |
|---|---|
| `thomas-skill-creator/` | Creates and iterates on new skills. Stores them in `claude_skill/`. Use when Hadi wants to capture a workflow as a reusable skill. |

---

## Adding a new skill

1. Create `claude_skill/<skill-name>/SKILL.md`
2. Add an entry to this INDEX.md under the right category
3. Update the skill table in `mothership/CLAUDE.md` to reference this file
4. Commit and push `claude_skill` as its own repo, then update the submodule pointer in `mothership`
