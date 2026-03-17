# SORATHEL → CLAUDE CODE: Step-by-Step Migration
### Mac · Terminal-comfortable · February 2026

---

## PHASE 1: INSTALL CLAUDE CODE (5 minutes)

### Step 1: Check Node.js
```bash
node --version
```
You need v18 or higher. If you don't have it or it's old:
```bash
brew install node
```
(If you don't have Homebrew: https://brew.sh)

### Step 2: Install Claude Code
Anthropic now recommends the native installer over npm:
```bash
curl -fsSL https://claude.ai/install.sh | bash
```
Then reload your shell:
```bash
source ~/.zshrc
```

### Step 3: Verify
```bash
claude --version
```
You should see a version number. If "command not found," try:
```bash
export PATH="$HOME/.claude/bin:$HOME/.local/bin:$PATH"
source ~/.zshrc
```

### Step 4: Authenticate
```bash
claude
```
First run will prompt you to log in with your Anthropic account. You need a paid subscription (Pro or Max). Follow the browser prompt. Once authenticated, type `/quit` to exit — we'll set up the project first.

---

## PHASE 2: CREATE THE PROJECT (10 minutes)

### Step 5: Choose your project location
```bash
mkdir -p ~/projects/sorathel
cd ~/projects/sorathel
```
(Or wherever you keep projects. This is your permanent home for the novel.)

### Step 6: Run the setup script
First, download the setup.sh I gave you (it's in your Claude.ai downloads). Move it to the project folder:
```bash
mv ~/Downloads/setup.sh ~/projects/sorathel/
bash setup.sh
```
This creates all the directories:
```
sorathel/
├── bible/
├── characters/
├── characters/minor/
├── episodes/ep01/ through ep08/
├── reference/
├── drafts/
├── output/
└── changelog.md
```

### Step 7: Install the Claude Code config files
The `claude-config.tar.gz` I gave you contains the `.claude/` folder with skills and rules. Extract it:
```bash
mv ~/Downloads/claude-config.tar.gz ~/projects/sorathel/
mkdir -p .claude
cd .claude
tar xzf ../claude-config.tar.gz
cd ..
rm claude-config.tar.gz
```
Verify:
```bash
ls -la .claude/skills/
```
You should see: `continuity-checker/`, `prose-writer/`, `story-bible-updater/`

### Step 8: Install the CLAUDE.md
```bash
mv ~/Downloads/CLAUDE.md ~/projects/sorathel/CLAUDE.md
```

---

## PHASE 3: MOVE YOUR FILES IN (15 minutes)

This is the part where you take everything from Claude.ai downloads and organize it. I'll tell you exactly what goes where.

### Step 9: Find your files
Your files from our Claude.ai sessions should be in your Downloads or wherever you saved them. You need:

| File | What it is |
|------|-----------|
| `Sorathel_Story_Bible_Running.md` | Running Story Bible |
| `Sorathel_Anomaly_Bible_v2.md` | Anomaly Bible |
| `Sorathel_Season_1_Overview.md` | Season 1 outline |
| Chapter 1 HTML (Caeleth) | You may need to find this — it wasn't in the last upload |
| `Sorathel_Chapter_2_betav1.html` | Chapter 2 (Drenna) |
| `Sorathel_Chapter_3_Draft.html` | Chapter 3 (Vaelen) |
| `Chapters_1-3_Comprehensive_Revision.md` | Revision analysis |
| `Sorathel_Claude_Code_Setup_Guide.md` | This guide (for reference) |

You may also have from earlier sessions:
| File | What it is |
|------|-----------|
| `Drenna_Complete_Arc.md` | Drenna's full arc document |
| `Tabata_Amaral_Summary_for_Drenna.md` | Tabata emotional DNA |
| `Eduardo_RealValor_Summary_for_Vardo.md` | Eduardo emotional DNA |
| `Sorathel_WorldBible_v10.docx` | Legacy World Bible |
| `Sorathel_Season_1_Outline_v2.md` | The outline with Zethael integrated |

### Step 10: Move the bible files
```bash
cp ~/Downloads/Sorathel_Story_Bible_Running.md bible/story-bible.md
cp ~/Downloads/Sorathel_Anomaly_Bible_v2.md bible/anomaly-bible.md
```

For the Season 1 outline — use the v2 with Zethael if you have it, otherwise use the Overview:
```bash
# If you have the v2 outline with Zethael threads:
cp ~/Downloads/Sorathel_Season_1_Outline_v2.md bible/season-1-outline.md

# If you only have the Overview:
cp ~/Downloads/Sorathel_Season_1_Overview.md bible/season-1-outline.md
```

### Step 11: Convert chapters from HTML to Markdown
The chapters are in HTML with styling. For Claude Code, we want clean markdown. You can do this manually or let Claude Code do it in the first session. For now, just put the HTML files in:

```bash
cp ~/Downloads/Sorathel_Chapter_2_betav1.html episodes/ep01/ch02-drenna.html
cp ~/Downloads/Sorathel_Chapter_3_Draft.html episodes/ep01/ch03-vaelen.html
```

For Chapter 1, if you have it:
```bash
cp ~/Downloads/[whatever-ch1-is-called].html episodes/ep01/ch01-caeleth.html
```

(Don't worry about the HTML→MD conversion yet. We'll have Claude Code do it in the first session.)

### Step 12: Move the revision analysis
```bash
cp ~/Downloads/Chapters_1-3_Comprehensive_Revision.md drafts/revision-analysis.md
```

### Step 13: Move reference documents
```bash
# Only copy the ones you have — skip any you don't
cp ~/Downloads/Drenna_Complete_Arc.md reference/ 2>/dev/null
cp ~/Downloads/Tabata_Amaral_Summary_for_Drenna.md reference/ 2>/dev/null
cp ~/Downloads/Eduardo_RealValor_Summary_for_Vardo.md reference/ 2>/dev/null
cp ~/Downloads/Sorathel_Claude_Code_Setup_Guide.md reference/ 2>/dev/null
```

If you have the World Bible v10 (.docx):
```bash
cp ~/Downloads/Sorathel_WorldBible_v10.docx reference/ 2>/dev/null
```

---

## PHASE 4: SET UP GIT (3 minutes)

### Step 14: Initialize version control
```bash
cd ~/projects/sorathel
git init
```

### Step 15: Create a .gitignore
```bash
cat > .gitignore << 'EOF'
.DS_Store
*.swp
*~
.claude-conversation/
EOF
```

### Step 16: First commit
```bash
git add .
git commit -m "Initial setup: chapters 1-3, story bible, outlines, claude code config"
```

From now on, commit after every significant change:
```bash
git add . && git commit -m "describe what changed"
```

---

## PHASE 5: FIRST CLAUDE CODE SESSION (the fun part)

### Step 17: Launch Claude Code in the project
```bash
cd ~/projects/sorathel
claude
```

Claude Code reads your CLAUDE.md automatically. It now knows about Sorathel.

### Step 18: Orientation — have Claude read the project
Type this as your first message:

```
Read the CLAUDE.md, then list all files in the project. 
Tell me what you see and what's missing.
```

Claude will scan the project and tell you what's in place and what's not.

### Step 19: Convert HTML chapters to Markdown
If your chapters are still HTML, ask Claude:

```
Convert episodes/ep01/ch02-drenna.html to clean markdown. 
Strip all HTML/CSS, keep only the prose. 
Save as episodes/ep01/ch02-drenna.md
```

Repeat for each chapter.

### Step 20: Extract character sheets
Ask Claude:

```
Read bible/story-bible.md. Extract character information for 
each main character (Vaelen, Drenna, Caeleth, Jorath, Sorvyn, 
Zethael) and create individual character sheets in characters/. 
Follow the format described in the CLAUDE.md.
```

### Step 21: Start the revision work
Now you're ready. Ask Claude:

```
Read drafts/revision-analysis.md. Then read episodes/ep01/ch01-caeleth.md 
and characters/caeleth.md. We're revising Chapter 1. 
Walk me through the changes before you start writing.
```

---

## DAILY WORKFLOW (once everything is set up)

### Starting a writing session:
```bash
cd ~/projects/sorathel
claude
```

### Typical commands:

**To revise a chapter:**
```
Read the revision analysis in drafts/revision-analysis.md, then 
revise episodes/ep01/ch02-drenna.md. Focus on the Tabata 
interiority changes first.
```

**To write a new chapter:**
```
I want to write Episode 1, Chapter 4. Read the episode outline, 
the Story Bible, and the character sheets for Zethael and Drenna. 
Then interview me about what should happen before you start writing.
```

**To check continuity:**
```
Check all chapters in episodes/ep01/ against bible/story-bible.md. 
Report any contradictions.
```

**To update the Story Bible after a chapter:**
```
I just finished revising ch01-caeleth.md. Update bible/story-bible.md 
with any new canon details from the chapter.
```

### After every session:
```bash
# Exit Claude Code first (Ctrl+C or /quit)
git add .
git commit -m "Ch01 revision: added Caeleth beloved beats, Mirathyn joke"
```

### Review in a fresh session:
```bash
# Start a new Claude Code session for review
claude

> Read episodes/ep01/ch01-caeleth.md and check it against 
  .claude/rules/writing-rules.md. What violations do you find? 
  What's working? Be harsh.
```

---

## USEFUL CLAUDE CODE COMMANDS

| Command | What it does |
|---------|-------------|
| `/quit` | Exit Claude Code |
| `/clear` | Clear conversation, start fresh |
| `/compact` | Summarize current conversation (frees context) |
| `/config` | Change settings |
| `/help` | Show all commands |
| `Esc` | Stop Claude mid-action |

### Tips:
- **One chapter per session.** Don't try to revise all three in one go. Quality degrades in long sessions.
- **Use `/compact` if a session gets long.** It summarizes the conversation so far, freeing up context for more work.
- **Commit before starting each session.** That way you can always `git checkout` if something goes wrong.
- **The Writer/Reviewer split is real.** After writing, exit and start a fresh session to review. Claude can't effectively critique its own work in the same conversation.

---

## TROUBLESHOOTING

**"Claude doesn't seem to know about Sorathel"**
→ Make sure you're in the right directory (`cd ~/projects/sorathel`) and CLAUDE.md is in the project root.

**"Claude is loading too many files"**
→ Tell it: "Only load the files I mention. Don't read everything at once."

**"Claude forgot what we discussed"**
→ Sessions don't persist between launches. Use `/compact` during long sessions. For cross-session continuity, that's what the Story Bible and changelog are for.

**"The revision doesn't match the voice"**
→ Ask Claude to read a voice sample first: "Read the first 500 words of ch01-caeleth.md and match this voice exactly."

**"I want to undo what Claude just did"**
→ `git checkout -- path/to/file` restores the last committed version.
→ `git diff` shows what changed since last commit.

---

## THAT'S IT

You now have:
1. Claude Code installed and authenticated
2. A properly organized novel project
3. Skills that teach Claude HOW to write Sorathel
4. Rules that prevent the mistakes we've already caught
5. Git tracking every change
6. A revision analysis ready to execute

Your first real task: **revise Chapter 1.**
