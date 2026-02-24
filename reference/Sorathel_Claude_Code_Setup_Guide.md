# SORATHEL — CLAUDE CODE PROJECT SETUP
### Best Practices for Writing a Fantasy Novel with Claude Code
*February 2026*

---

## 1. FOLDER STRUCTURE

```
sorathel/
├── CLAUDE.md                          # Master instructions for Claude Code
├── .claude/
│   ├── settings.json                  # Permissions, model preferences
│   ├── skills/
│   │   ├── prose-writer/
│   │   │   └── SKILL.md              # How to write Sorathel prose
│   │   ├── story-bible-updater/
│   │   │   └── SKILL.md              # How to update the Story Bible after chapters
│   │   └── continuity-checker/
│   │       └── SKILL.md              # How to check for contradictions
│   └── rules/
│       └── writing-rules.md           # The 13 Writing Rules (from Story Bible §7)
│
├── bible/
│   ├── story-bible.md                 # Running Story Bible (auto-updated)
│   ├── anomaly-bible.md               # Anomaly Bible v2 (author-level truth)
│   ├── season-1-outline.md            # Season 1 episode/chapter structure
│   └── terminology.md                 # Locked terms (extracted from Story Bible §8)
│
├── characters/
│   ├── vaelen.md                      # Character sheet — extracted from Story Bible
│   ├── drenna.md                      # Character sheet — includes Tabata notes
│   ├── caeleth.md                     # Character sheet — beloved beats tracker
│   ├── jorath.md
│   ├── sorvyn.md
│   ├── zethael.md                     # Character sheet — Eduardo/Real Valor parallel
│   └── minor/
│       ├── torven.md
│       ├── hathren.md
│       └── drenna-father.md
│
├── episodes/
│   ├── ep01/
│   │   ├── outline.md                 # Episode 1 chapter-level outline
│   │   ├── ch01-caeleth.md            # Chapter prose (markdown, not HTML)
│   │   ├── ch02-drenna.md
│   │   ├── ch03-vaelen.md
│   │   └── ch04-tbd.md
│   ├── ep02/
│   │   └── outline.md
│   ├── ep03/
│   │   └── outline.md
│   ... (through ep08/)
│
├── reference/
│   ├── tabata-amaral-dna.md           # Emotional DNA extraction for Drenna
│   ├── eduardo-realvalor-dna.md       # Emotional DNA extraction for Zethael
│   ├── world-bible-v10.md             # Legacy World Bible (reference only)
│   └── grrm-sanderson-notes.md        # Craft notes from critique sessions
│
├── drafts/                            # Working area for in-progress revisions
│   ├── ch01-caeleth-rev2.md
│   └── ...
│
├── output/                            # Final formatted versions for publishing
│   ├── ch01-caeleth.html              # Pretty HTML versions
│   └── ...
│
└── changelog.md                       # Track what changed and why
```

### Why this structure:

**Claude Code reads files on demand.** It doesn't load everything at once — it reads what it needs. So instead of one massive Story Bible that fills the context window, you split reference material into focused files that Claude pulls when relevant. The CLAUDE.md tells it WHERE to find things; the skills tell it HOW to use them.

**Chapters in markdown, not HTML.** Write in .md for easy editing with Claude Code's tools. Convert to HTML only for final output/publishing. Claude Code's str_replace and file editing tools work much better on markdown than on HTML with embedded CSS.

**Characters as separate files.** When writing a Drenna chapter, Claude loads `drenna.md` + `story-bible.md`. When writing Vaelen, it loads `vaelen.md` instead. This keeps context focused and prevents the 150K-token limit from becoming an issue at novel scale (~200K words).

---

## 2. THE CLAUDE.md FILE

This is the most important file. It's what Claude Code reads at the start of EVERY session. Keep it concise (under 150 lines) — it should orient, not overwhelm.

```markdown
# Sorathel — Fantasy Novel Project

## What This Is
A multi-POV fantasy novel (~200K words, 8 episodes, ~45 chapters).
Three co-protagonists: Vaelen (pattern reader), Drenna (political strategist), 
Zethael (frontier builder). Season 1 covers the world cracking open.

## Project Structure
- `bible/` — Story Bible, Anomaly Bible, outline, terminology
- `characters/` — Individual character sheets
- `episodes/ep##/` — Chapter outlines and prose, organized by episode
- `reference/` — Background research and character DNA documents
- `drafts/` — In-progress work
- `output/` — Final formatted versions

## Before Writing Any Chapter
1. Read the episode outline: `episodes/ep##/outline.md`
2. Read the Story Bible: `bible/story-bible.md`
3. Read the character sheet for the POV character: `characters/{name}.md`
4. Read the Writing Rules: `.claude/rules/writing-rules.md`
5. Check the previous chapter for continuity

## After Writing Any Chapter
1. Update the Story Bible with new canon details
2. Update the character sheet if new information was revealed
3. Log the change in `changelog.md`

## Key Creative Principles
- Chapters are deep third-person POV (Martin convention)
- The Ethura is NEVER named in prose — shown through sensory wrongness
- Drenna = Tabata Amaral (ambition AND compassion, always simultaneous)
- Caeleth = build to be loved (he dies in Episode 4)
- Jorath = resourceful survivor, not just money counter
- Vaelen = gift-first (the warmth is REAL, he just can't believe it)
- Physical effects must map to emotional truth (no spectacle for its own sake)
- Community is a mechanical survival factor, not just a theme

## Voice Calibration
- Caeleth: wonder, wanting, metaphor-rich, longer sentences
- Drenna: sharp, observational, concrete, shorter sentences, warmth buried under strategy
- Vaelen: fast, restless, always processing, controlled surface over sensory overwhelm

## Model Preference
Use Opus for prose writing and character work.
Use Sonnet for mechanical tasks (formatting, file organization, continuity checks).
```

---

## 3. SKILLS — THE SECRET WEAPON

Skills are `.claude/skills/` folders with a SKILL.md that Claude reads when relevant. They're "progressive disclosure" — Claude doesn't load them until it needs them. This is where your craft knowledge lives.

### `.claude/skills/prose-writer/SKILL.md`

```markdown
# Prose Writing Skill — Sorathel

## Pre-Flight Checklist
Before writing ANY prose:
- [ ] Read the episode outline for this chapter's agreed beats
- [ ] Read the Story Bible for continuity
- [ ] Read the POV character's sheet
- [ ] Read the Writing Rules in .claude/rules/
- [ ] Check discussion notes for specific details promised

## Writing Process
1. Draft the full chapter in `drafts/`
2. Review against Writing Rules (self-check)
3. Move to `episodes/ep##/` when approved
4. Update Story Bible and character sheet
5. Log in changelog.md

## Style Targets
- 3,500–5,500 words per chapter
- Literary epic fantasy — sentences that breathe
- Metaphors from the physical world (campfires, stone, water, furniture)
- Interior monologue woven through observation, not separated
- Dialogue: rough, interrupted, people talking past each other
- Humor through character, not wit

## Common Mistakes to Avoid
- Using analytical vocabulary in character voice ("perform," "institution," 
  "framework," "scaffolding," "structure," "authenticity")
- Interpreting gestures instead of showing them ("the look said:")
- Writing Drenna with a political document/notebook (NEVER — zombie idea)
- Repeated character beats without variation
- Jacket-blurb sentences that summarize instead of showing
- Characters knowing things they shouldn't know yet
```

### `.claude/skills/continuity-checker/SKILL.md`

```markdown
# Continuity Checking Skill

When checking continuity for a chapter:

1. Read `bible/story-bible.md` for all established facts
2. Read `bible/terminology.md` for correct term usage
3. Check: Is "Amarvel" used for roots and "Amarwen" for the Tree?
4. Check: Is the Ethura never named by characters?
5. Check: Are character physical descriptions consistent?
6. Check: Does timeline make sense (time of day, travel distances)?
7. Check: Are character relationships consistent with previous chapters?
8. Check: Are world details (food, architecture, creatures) consistent?

Report any contradictions found.
```

---

## 4. RULES FILE

### `.claude/rules/writing-rules.md`

Extract your 13 Writing Rules from Story Bible §7 into this standalone file. Claude Code loads rules automatically when working in relevant directories. This ensures the rules are ALWAYS present without bloating the CLAUDE.md.

---

## 5. WORKFLOW — HOW A WRITING SESSION GOES

### Starting a Session

```bash
cd ~/sorathel
claude
```

Then tell Claude what you want to do:

**For revision work:**
> "I need to revise ch01-caeleth.md. The main changes: add Caeleth beloved beats (funniest line, specific fear, kindness), add the Mirathyn joke scene, sharpen Drenna's Tabata entrance. Read the revision analysis in drafts/ first."

**For new chapter writing:**
> "Write Episode 1 Chapter 4. Read the episode outline, Story Bible, and character sheets for Zethael and Drenna first. This chapter has the Zethael wayhouse scene and Drenna's departure."

**For continuity checking:**
> "Check chapters 1-3 for continuity against the Story Bible. Report any contradictions."

### The Writer/Reviewer Pattern

This is one of Claude Code's best features for creative work. Use TWO sessions:

1. **Session 1 (Writer):** Writes or revises the chapter
2. **Session 2 (Reviewer):** Fresh context, reads the output, catches problems the writer session can't see (because it's biased toward what it just wrote)

You can do this sequentially (write, then open a new session to review) or in parallel using Claude Code's multi-session support.

### Revision Workflow

For your current situation (revising Ch 1-3):

```bash
# Session 1: Do the revision
claude "Revise episodes/ep01/ch01-caeleth.md based on the revision 
analysis in drafts/revision-analysis.md. Write the revised version 
to drafts/ch01-caeleth-rev2.md"

# Session 2: Review the revision (fresh context)
claude "Compare drafts/ch01-caeleth-rev2.md against the original 
episodes/ep01/ch01-caeleth.md and the Writing Rules. What improved? 
What's still missing? Any new problems introduced?"
```

---

## 6. CONTEXT MANAGEMENT — THE CRITICAL CHALLENGE

Your novel will be ~200K words. Claude's context window is ~150K tokens (~112K words). You CANNOT load the whole novel at once. This is the #1 challenge for long-form fiction with AI.

### The Solution: Modular Loading

**Per-chapter context budget:**
- CLAUDE.md: ~500 words (always loaded)
- Story Bible: ~5,000 words (load relevant sections)
- Character sheet: ~1,500 words (POV character only)
- Writing Rules: ~1,000 words
- Episode outline: ~2,000 words
- Previous chapter (for continuity): ~5,000 words
- Current chapter draft: ~5,000 words
- **Total: ~20,000 words** — leaves massive headroom

**What you DON'T load:**
- All character sheets at once
- The Anomaly Bible (author truth, not needed during writing unless dealing with Ethura mechanics)
- Other episodes' outlines
- Reference documents (Tabata DNA, Eduardo DNA) unless specifically relevant

### When to Split the Story Bible

Once your Story Bible grows past ~10,000 words (it's already ~6,000), consider splitting it:

```
bible/
├── story-bible-characters.md      # §1 Characters
├── story-bible-world.md           # §2-4 World, Lore, Timeline
├── story-bible-magic.md           # §5 Network Mechanics
├── story-bible-voice.md           # §6 Voice & Style
└── story-bible-rules.md           # §7 Writing Rules (→ moved to .claude/rules/)
```

Claude Code reads files on demand. Smaller files = faster loading, more focused context.

---

## 7. VERSION CONTROL — USE GIT

This is non-negotiable for a project this size.

```bash
cd ~/sorathel
git init
git add .
git commit -m "Initial setup: chapters 1-3, story bible, outlines"
```

**Before every writing session:**
```bash
git add . && git commit -m "Pre-session checkpoint"
```

**After every chapter revision:**
```bash
git add . && git commit -m "Ch01 rev2: added Caeleth beloved beats, Mirathyn joke, Drenna Tabata sharpening"
```

**Why this matters:**
- You can always go back to any version of any chapter
- You can see exactly what changed between drafts
- If a revision goes wrong, `git checkout` recovers the previous version instantly
- The changelog.md is useful but git is the real safety net

---

## 8. SPECIFIC RECOMMENDATIONS FOR SORATHEL

### The Story Bible Auto-Update Process

After each chapter, Claude should update the Story Bible. Create a skill for this:

```
After writing/revising a chapter:
1. Identify NEW canon details (character descriptions, world facts, 
   magic mechanics, relationships shown)
2. Add them to the appropriate Story Bible section
3. If a new Writing Rule was learned from a mistake, add it to §7
4. Update the terminology table if new terms appeared
5. Commit both the chapter and the updated Story Bible together
```

### Character Sheet Format

Each character file should follow a standard format:

```markdown
# [CHARACTER NAME]

## Physical (as shown in prose)
[Only what's been described on page]

## Behavior on Page
[Specific actions, habits, gestures — with chapter citations]

## Relationships (as shown)
[What the reader has seen, chapter by chapter]

## What the Reader Knows
[Accumulated knowledge through the text]

## What the Reader Doesn't Know Yet
[Planned reveals — reference outline]

## Beloved Beats Tracker (Caeleth only)
[x] The funniest line — Ch1, the [specific moment]
[ ] A specific fear — planned for Ch3
[x] "Bees behind a wall" — Ch3
[x] "It's beautiful" — Ch3
[ ] Mother's journal inscription — Ch1 revision
```

### The "Spec First, Write Second" Pattern

For each new chapter, use Claude Code's interview pattern:

```
> "I'm going to write Episode 2, Chapter 1. Interview me about what 
should happen in this chapter. Ask about the beats, the character 
moments, the worldbuilding details, the voice. Then write a spec 
to episodes/ep02/ch01-spec.md. I'll review it, and THEN we write."
```

This prevents the drift problem where Claude starts writing and makes assumptions you didn't approve.

### Handling the 200K-Word Scale

At full novel length, you'll need a strategy for cross-chapter consistency:

1. **The Story Bible is the source of truth.** Not the chapters. If a chapter contradicts the Bible, the chapter is wrong.
2. **Run continuity checks at episode boundaries.** After finishing all chapters in an episode, do a full check.
3. **Character voice samples.** Keep 2-3 paragraphs of each character's BEST voice in their character sheet. When starting a new chapter for that POV, Claude reads the sample first to calibrate.
4. **The "Previously On" pattern.** Before writing Chapter 15, have Claude read the Story Bible + the outline + the LAST chapter of this POV character (not the last chapter overall). This keeps the voice continuous even when chapters are interleaved.

---

## 9. IMMEDIATE NEXT STEPS

### Migration from Claude.ai to Claude Code

1. **Create the folder structure** on your local machine
2. **Convert chapters from HTML to markdown** (Claude Code works better with .md)
3. **Split the Story Bible** into the modular format above
4. **Extract Writing Rules** into `.claude/rules/writing-rules.md`
5. **Create character sheets** from Story Bible §1
6. **Write the CLAUDE.md** (use the template above, customize)
7. **Initialize git** and make the first commit
8. **Copy the comprehensive revision analysis** into `drafts/revision-analysis.md`
9. **Start revising Chapter 1** using the workflow above

### The First Claude Code Session

```bash
cd ~/sorathel
claude

> "Read the CLAUDE.md, then read drafts/revision-analysis.md. 
We're revising Chapter 1 (Caeleth). The main changes needed are 
listed in the analysis. Read the current chapter at 
episodes/ep01/ch01-caeleth.md and the character sheet at 
characters/caeleth.md. Then let's discuss the approach before 
you start writing."
```

---

## 10. ANTI-PATTERNS — WHAT NOT TO DO

**Don't put everything in CLAUDE.md.** Keep it under 150 lines. Use skills and rules for progressive disclosure.

**Don't write in one giant session.** Long sessions degrade quality. Write one chapter per session. Review in a fresh session.

**Don't skip the Story Bible update.** Every chapter that adds canon details must be followed by a Bible update. This is the discipline that prevents contradictions at 200K words.

**Don't load all reference files at once.** Only load what's needed for the current chapter. The Anomaly Bible, the World Bible v10, the Tabata DNA document — these are reference for WHEN NEEDED, not for every session.

**Don't let Claude write without the outline.** Every chapter should have an agreed spec/outline FIRST. The "spec first, write second" pattern prevents drift.

**Don't forget the Writer/Reviewer split.** Claude can't effectively review its own work in the same session. Fresh context catches things the writing session can't see.
