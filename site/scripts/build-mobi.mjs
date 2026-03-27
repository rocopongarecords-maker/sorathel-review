/**
 * Generates .mobi files for each chapter.
 * Steps: Markdown → EPUB (via epub-gen-memory) → MOBI (via Calibre ebook-convert)
 * Run after build-chapters.mjs: node scripts/build-mobi.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import epubGen from 'epub-gen-memory';
const epub = epubGen.default;

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..', '..');
const outputDir = join(__dirname, '..', 'public', 'downloads');

// Ensure output directory exists
mkdirSync(outputDir, { recursive: true });

// Load manifest
const manifest = JSON.parse(
  readFileSync(join(__dirname, '..', 'src', 'chapters.json'), 'utf-8')
);

// Check if ebook-convert is available
let hasEbookConvert = false;
try {
  execSync('ebook-convert --version', { stdio: 'pipe' });
  hasEbookConvert = true;
} catch {
  console.warn('Warning: ebook-convert (Calibre) not found. Will generate EPUB only.');
}

function mdToHtml(md) {
  const blocks = md.split(/\n\n+/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (trimmed === '---') return '<hr />';
      let html = trimmed.replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\n/g, ' ');
      return `<p>${html}</p>`;
    })
    .join('\n');
}

function stripFrontmatter(md) {
  const lines = md.split('\n');
  let contentStart = 0;
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i].trim();
    if (
      line.startsWith('#') ||
      line.startsWith('*Version') ||
      line.startsWith('*Created') ||
      line === '---' ||
      line === ''
    ) {
      contentStart = i + 1;
    } else {
      break;
    }
  }
  return lines.slice(contentStart).join('\n');
}

for (const ch of manifest.chapters) {
  const epTitle =
    manifest.episodeTitles[String(ch.episode)] || '';
  const title = `Episode ${ch.episode}: ${epTitle} — Chapter ${ch.chapter} (${ch.character})`;

  // Read and process the markdown
  const mdRaw = readFileSync(join(projectRoot, ch.file), 'utf-8');
  const mdClean = stripFrontmatter(mdRaw);
  const htmlContent = mdToHtml(mdClean);

  // Generate EPUB
  const epubBuffer = await epub(
    {
      title,
      author: 'Sorathel',
      publisher: 'Review Draft',
      css: `
        body { font-family: Georgia, serif; line-height: 1.6; }
        p { margin-bottom: 1em; text-indent: 1.5em; }
        hr { border: none; text-align: center; margin: 2em 0; }
        hr::after { content: '* * *'; letter-spacing: 0.5em; }
      `,
    },
    [
      {
        title: `Chapter ${ch.chapter} — ${ch.character}`,
        content: htmlContent,
      },
    ]
  );

  const epubPath = join(outputDir, `${ch.slug}.epub`);
  writeFileSync(epubPath, epubBuffer);
  console.log(`  EPUB: ${ch.slug}.epub`);

  // Convert to MOBI if Calibre is available
  if (hasEbookConvert) {
    const mobiPath = join(outputDir, `${ch.slug}.mobi`);
    try {
      execSync(`ebook-convert "${epubPath}" "${mobiPath}" --no-inline-toc`, {
        stdio: 'pipe',
      });
      console.log(`  MOBI: ${ch.slug}.mobi`);
    } catch (err) {
      console.error(`  Failed to convert ${ch.slug} to MOBI:`, err.message);
    }
  }
}

console.log(`\nDone. Generated files in ${outputDir}`);
