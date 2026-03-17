#!/bin/bash
# Sorathel Project Setup Script
# Run this in your desired project directory: bash setup.sh

echo "Creating Sorathel project structure..."

# Core directories
mkdir -p bible characters characters/minor episodes reference drafts output
mkdir -p episodes/ep01 episodes/ep02 episodes/ep03 episodes/ep04
mkdir -p episodes/ep05 episodes/ep06 episodes/ep07 episodes/ep08

# Claude Code directories
mkdir -p .claude/skills/prose-writer
mkdir -p .claude/skills/continuity-checker
mkdir -p .claude/skills/story-bible-updater
mkdir -p .claude/rules

# Create changelog
cat > changelog.md << 'EOF'
# Sorathel Changelog

## February 2026

### Project Setup
- Migrated from Claude.ai to Claude Code
- Chapters 1-3 (Episode 1) in place — pending revision
- Story Bible, Anomaly Bible, Season 1 Outline imported

### Pending Revisions (from Comprehensive Revision Analysis)
- [ ] Ch01 (Caeleth): Beloved beats, Mirathyn joke, Jorath resourcefulness, Drenna Tabata entrance, Vaelen gift-first adjustment
- [ ] Ch02 (Drenna): Tabata interiority throughout, strategic filing, regional body foreshadowing, Jorath second beat
- [ ] Ch03 (Vaelen): Gift-first tonal adjustment, ceiling beat, creature seed, Drenna departure breadcrumb
- [ ] Ch04 (NEW): Zethael wayhouse, Drenna departure, episode close
EOF

echo ""
echo "Structure created. Now you need to:"
echo ""
echo "1. Copy CLAUDE.md to the project root"
echo "2. Copy .claude/ skill files into .claude/"
echo "3. Copy your Story Bible to bible/story-bible.md"
echo "4. Copy your Anomaly Bible to bible/anomaly-bible.md"  
echo "5. Copy your Season 1 Outline to bible/season-1-outline.md"
echo "6. Convert your HTML chapters to .md and place in episodes/ep01/"
echo "7. Extract character sheets from the Story Bible into characters/"
echo "8. Copy reference docs (Tabata DNA, Eduardo DNA, World Bible v10) to reference/"
echo "9. Copy the revision analysis to drafts/revision-analysis.md"
echo "10. Run: git init && git add . && git commit -m 'Initial setup'"
echo ""
echo "Then open Claude Code: cd sorathel && claude"
echo "First command: Read the CLAUDE.md and tell me what you see."
echo ""
echo "Done."
