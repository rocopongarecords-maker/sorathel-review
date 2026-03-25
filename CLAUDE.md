# Sorathel — Fantasy Novel Project

## What This Is
Multi-POV fantasy novel (~200K words, 9 episodes, ~45 chapters). Season 1: "The World Cracks Open."
Three co-protagonists: Vaelen (pattern reader, gift-first), Drenna (Tabata Amaral archetype), Zethael (Eduardo/Real Valor archetype).
Core question: "When the world stops telling you who to be, can you survive becoming yourself?"

## Project Structure
- `bible/` — Story Bible, Anomaly Bible, outline, terminology (the source of truth)
- `bible/version-registry.md` — **CHECK THIS FIRST.** Tracks which version of every document is canonical.
- `characters/` — Individual character sheets (load POV character per chapter)
- `episodes/ep##/` — Chapter outlines and prose by episode
- `reference/` — Background research, character DNA documents (some SUPERSEDED — check registry)
- `drafts/` — In-progress revision work (registry tracks which draft is latest per chapter)
- `output/` — Final formatted versions for publishing

## Before Writing Any Chapter
1. Read the episode outline: `episodes/ep##/outline.md`
2. Read the Story Bible: `bible/story-bible.md`
3. Read the POV character sheet: `characters/{name}.md`
4. Read `.claude/rules/writing-rules.md`
5. If chapter touches the Ethura, node decline, anomalies, or Hushing: read `bible/anomaly-bible.md`
6. Check the most recent chapter by this POV character for voice continuity

## After Writing Any Chapter
1. Update `bible/story-bible.md` with new canon details
2. Update the character sheet if new information was revealed on page
3. Log the change in `changelog.md` with date, chapter, and what changed

## Key Creative Principles
- Deep third-person POV, Martin convention. Everything filtered through the POV character's specific subjectivity.
- The Ethura is NEVER named in prose. Shown through sensory wrongness characters can't articulate.
- Physical effects must map to emotional truth. No spectacle for spectacle's sake.
- Drenna = Tabata Amaral. Ambition AND compassion visible simultaneously, always. She feels AND files. Neither is the mask for the other.
- Caeleth = build to be loved. He dies in Episode 5. Every scene must make the reader carry him.
- Vaelen = gift-first. The warmth is REAL. The tragedy isn't a broken performer — it's an extraordinary person who can't see the extraordinary thing isn't the performance.
- Jorath = resourceful problem-solver. Show his survival instinct through varied behaviors, not just counting money.
- Zethael = Eduardo parallel. ADHD energy, brilliant, frustrated with institutions, builds from scratch.
- Community is a mechanical survival factor, not just a theme.
- **Build the world the reader sees.** Every new location, every new person needs physical description. The reader must be able to picture Sorathel. See Writing Rule 25.

## Anti-Patterns (DO NOT Write)
- **No filing culture.** No reports, appendices, protocol-required attachments, deployment summaries, forms. Information flows through conversation and verbal debrief. The Solvarei are consultants, not Soviet bureaucrats.
- **Nobody lives at Solvarei HQ.** It's a workplace. Practitioners have homes/apartments in Darachet. They commute. HQ has: workspaces, practitioner training yards, workshops, a good kitchen, equipment storage, creature dispatch (messaging). Not quarters or barracks.
- **The Solvarei is a PRIVATE organization.** Not tied to governments or politicians. Sometimes hired for public projects, but fully independent. Think Accenture — a private firm that takes clients, not a government agency. Does NOT contain academies (Solcarin are separate), creature breeding/training (separate industry), or other societal functions. The Solvarei solves problems for clients. That's it.
- **Solvarei and Amarith are independent organizations.** Neither reports to the other. Both are private firms hired by communities, governments, or the seated independently. Different scope: Amarith = trunk-level (systemic, McKinsey), Solvarei = branch/capillary (community-level, Accenture). Not hierarchy — parallel firms.
- **The seated are NOT bureaucrats.** They are the upper class — nobility that mixes politics, business, and power. They sometimes hire the Solvarei to solve problems, but they do not control each other. Think of them as the powerful elite, not a government committee.
- **Simile restraint — HARD LIMIT.** See Writing Rule 24. Maximum 3 similes per chapter, 1 per scene break. After drafting, grep for "like ", "as if", "as though", "the way" and count every simile. If over 3, cut until under. "The way X does Y" is a simile. "Smelled like X" is a simile. Name things directly — don't compare them to other things.

## Voice Calibration
- **Caeleth:** Wonder, wanting, metaphor-rich, longer sentences. The world is mysterious through his eyes.
- **Drenna:** Sharp, observational, concrete, shorter sentences. Warmth buried under strategy. She names things, counts, files. Humor dry and rare.
- **Vaelen:** Fast, restless, always processing. Controlled surface over sensory overwhelm. His one unguarded space: the Amarvel.
- **Zethael:** Energetic, scattered, hyperfocused. Talks with hands. Ideas faster than words. Direct. Impatient with frameworks.

## Terminology (Quick Reference)
- Amarwen = the World Tree. Characters know her and use her name freely — she's central to all life in Sorathel. The SECRET (author-level only) is that she's conscious, making choices, and dying on purpose.
- Amarvel = the root network (what characters interact with)
- Mirathyn = extracted substance (addictive, from the roots)
- Amarith = elite private firm (McKinsey of Sorathel). Independent of Solvarei — neither reports to the other.
- Solvarei = private practitioner firm (Accenture of Sorathel). Independent. Takes clients — communities, governments, the seated. Does NOT contain academies or creature training.
- The seated = the upper class / nobility. People who have seats at tables of power. Mix politics, business, power. Sometimes hire the Solvarei. Not a government body — a social class.
- Solcarin = training institutions (multiple exist)
- Ethura = the threat (AUTHOR TERM ONLY — never in prose)
- Hushed = people who freeze (Ethura response 3)

## Model Preference
Opus for prose writing, character work, and revision.
Sonnet for formatting, file organization, continuity checks.
