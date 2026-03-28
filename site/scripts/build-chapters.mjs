/**
 * Reads the version registry and generates a chapters manifest.
 * Run before Astro build: node scripts/build-chapters.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..', '..');

const registry = readFileSync(join(projectRoot, 'bible', 'version-registry.md'), 'utf-8');

// Parse the "Episode Prose — Latest Versions" table
const lines = registry.split('\n');
const chapters = [];

let inTable = false;
for (const line of lines) {
  if (line.includes('Episode Prose — Latest Versions')) {
    inTable = true;
    continue;
  }
  if (inTable && line.startsWith('|') && !line.includes('---') && !line.includes('Chapter')) {
    // Parse table row: | Ch01 — Caeleth | `episodes/...` | `drafts/...` | status |
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length >= 4) {
      const label = cells[0]; // e.g. "Ch01 — Caeleth" or "Ep2 Ch01 — Vaelen"
      const latestDraft = cells[2]; // e.g. "`drafts/ch01-caeleth-v2.md`"

      // Extract the file path from backticks
      const fileMatch = latestDraft.match(/`([^`]+)`/);
      if (!fileMatch) continue;
      const filePath = fileMatch[1];

      // Parse episode and chapter info from the label
      let episode = 1;
      let chapterNum = 0;
      let character = '';

      // Label format: 'Ep1 Ch01 "The Ridge" — Caeleth'
      const epMatch = label.match(/Ep(\d+)\s+Ch(\d+)/i);

      if (epMatch) {
        episode = parseInt(epMatch[1]);
        chapterNum = parseInt(epMatch[2]);
      }

      const charMatch = label.match(/—\s*(\w+)/);
      if (charMatch) {
        character = charMatch[1];
      }

      const titleMatch = label.match(/"([^"]+)"/);
      const title = titleMatch ? titleMatch[1] : '';

      // Build the slug
      const slug = `ep${episode}-ch${String(chapterNum).padStart(2, '0')}`;

      chapters.push({
        slug,
        episode,
        chapter: chapterNum,
        character,
        title,
        label,
        file: filePath,
        fullPath: join(projectRoot, filePath),
      });
    }
  }
  // Stop at next section
  if (inTable && line.startsWith('---')) {
    break;
  }
}

// Episode titles
const episodeTitles = {
  1: 'The Deployment',
  2: 'The Base',
  3: 'The Signal',
  4: 'The Cascade',
  5: 'The Dread',
  6: 'The Mobilization',
  7: 'The Elite',
  8: 'The Silence',
  9: 'The Door',
};

const manifest = { episodeTitles, chapters };

writeFileSync(
  join(__dirname, '..', 'src', 'chapters.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`Built manifest: ${chapters.length} chapters`);
chapters.forEach(ch => console.log(`  ${ch.slug} — ${ch.character} (${ch.file})`));
