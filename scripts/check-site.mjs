import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

const bannedWord = String.fromCharCode(70, 111, 114, 116, 114, 101, 117, 109);
const reporter = String.fromCharCode(0x00d6, 0x7a, 0x67, 0x00fc, 0x6e);
const reporterFamily = String.fromCharCode(0x4b, 0x00fc, 0x6c, 0x74, 0x65, 0x6b, 0x69, 0x6e);
const emDash = String.fromCharCode(0x2014);

const failures = [];

function fail(message) {
  failures.push(message);
}

function walk(dir, skip = new Set()) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full, skip));
    else files.push(full);
  }
  return files;
}

function textFiles(files) {
  return files.filter((file) =>
    /\.(md|astro|css|ts|js|mjs|json|yml|yaml|svg|html|txt|xml)$/i.test(file),
  );
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

const sourceFiles = textFiles(
  walk(root, new Set(['node_modules', 'dist', '.git', '.astro'])).filter(
    (file) => !file.endsWith('package-lock.json'),
  ),
);

for (const file of sourceFiles) {
  const text = read(file);
  const relative = path.relative(root, file);
  if (text.toLowerCase().includes(bannedWord.toLowerCase())) {
    fail(`${relative} contains the banned word`);
  }
  if (text.includes(reporter) || text.includes(reporterFamily)) {
    fail(`${relative} contains a real personal name`);
  }
  if (text.includes(emDash)) {
    fail(`${relative} contains an em dash`);
  }
}

const required = [
  'index.html',
  'episodes/index.html',
  'episodes/sshole-cve-2026-123158/index.html',
  'about/index.html',
  'support/index.html',
  'corrections/index.html',
  '404.html',
  'rss.xml',
  'CNAME',
  'mark.svg',
  'wordmark-lockup.svg',
  'favicon.svg',
  'favicon.ico',
  'og-image.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'site.webmanifest',
  'robots.txt',
];

for (const relative of required) {
  if (!fs.existsSync(path.join(dist, relative))) fail(`missing dist/${relative}`);
}

const sitemaps = fs.existsSync(dist)
  ? fs.readdirSync(dist).filter((name) => name.startsWith('sitemap') && name.endsWith('.xml'))
  : [];
if (sitemaps.length === 0) fail('missing sitemap xml in dist/');

const builtText = textFiles(walk(dist));
for (const file of builtText) {
  const text = read(file);
  const relative = path.relative(root, file);
  if (text.toLowerCase().includes(bannedWord.toLowerCase())) fail(`${relative} contains the banned word`);
  if (text.includes(reporter) || text.includes(reporterFamily)) {
    fail(`${relative} contains a real personal name`);
  }
  if (text.includes(emDash)) fail(`${relative} contains an em dash`);
  const scripts = [...text.matchAll(/<script\b[^>]*\ssrc=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const src of scripts) {
    if (/^https?:/i.test(src)) fail(`${relative} loads a third-party script: ${src}`);
  }
}

const home = fs.existsSync(path.join(dist, 'index.html')) ? read(path.join(dist, 'index.html')) : '';
if (!home.includes('tired of the hype')) fail('home page is missing the positioning line');
if (!home.includes('Security news, minus the hype.')) fail('home page is missing the tagline');
if (!home.includes('/wordmark-lockup.svg')) fail('home page is missing the wordmark');
if (!home.includes('SSHole')) fail('home page is missing the episode');

const episodePath = path.join(dist, 'episodes/sshole-cve-2026-123158/index.html');
const episodeHtml = fs.existsSync(episodePath) ? read(episodePath) : '';
for (const section of [
  'TL;DR',
  'Am I affected?',
  'What happened',
  'How to protect yourself',
  'Going deeper',
  'Free tools, trainings, and runbooks',
  'Sources',
  'Corrections log',
]) {
  if (!episodeHtml.includes(section)) fail(`episode page is missing section: ${section}`);
}
if (!episodeHtml.includes('https://www.openssh.org/releasenotes.html#10.6p2')) {
  fail('episode page is missing an OpenSSH source');
}
if (!episodeHtml.includes('Disclosure.')) fail('episode page is missing the AI disclosure');
if (episodeHtml.includes('Watch the video')) {
  fail('episode page shows Watch the video even though youtube is empty');
}

const support = fs.existsSync(path.join(dist, 'support/index.html'))
  ? read(path.join(dist, 'support/index.html'))
  : '';
if (!support.includes('https://buymeacoffee.com/inteladj')) fail('support page is missing the configured URL');
if (!support.toLowerCase().includes('not tax-deductible')) fail('support page is missing the tax-deductible line');
if (!support.toLowerCase().includes('voluntary')) fail('support page does not say support is voluntary');

const corrections = fs.existsSync(path.join(dist, 'corrections/index.html'))
  ? read(path.join(dist, 'corrections/index.html'))
  : '';
if (!corrections.includes('Page created')) fail('corrections page is missing the publication entry');

const cname = fs.existsSync(path.join(dist, 'CNAME')) ? read(path.join(dist, 'CNAME')).trim() : '';
if (cname !== 'intelligenceadjacent.com') fail(`CNAME is ${JSON.stringify(cname)}`);

const rss = fs.existsSync(path.join(dist, 'rss.xml')) ? read(path.join(dist, 'rss.xml')) : '';
if (!rss.includes('SSHole')) fail('RSS feed is missing the episode');

const about = fs.existsSync(path.join(dist, 'about/index.html')) ? read(path.join(dist, 'about/index.html')) : '';
if (!about.includes('hello@intelligenceadjacent.com')) fail('about page is missing the contact email');

if (failures.length > 0) {
  for (const message of failures) console.error(`check: ${message}`);
  process.exit(1);
}

console.log(`check: ${sourceFiles.length} source files and built site look clean`);
