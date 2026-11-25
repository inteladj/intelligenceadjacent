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
  'episodes/optimizely-cve-2026-132224/index.html',
  'about/index.html',
  'support/index.html',
  'corrections/index.html',
  'privacy/index.html',
  'terms/index.html',
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
if (!home.includes('CVE-2026-132224')) fail('home page is missing the episode');
if (home.includes('First episode coming soon.')) fail('home page still shows the empty state');

const support = fs.existsSync(path.join(dist, 'support/index.html'))
  ? read(path.join(dist, 'support/index.html'))
  : '';
if (!support.includes('https://ko-fi.com/intelligenceadjacent')) fail('support page is missing the configured URL');
if (!support.toLowerCase().includes('not tax-deductible')) fail('support page is missing the tax-deductible line');
if (!support.toLowerCase().includes('voluntary')) fail('support page does not say support is voluntary');

const corrections = fs.existsSync(path.join(dist, 'corrections/index.html'))
  ? read(path.join(dist, 'corrections/index.html'))
  : '';
if (!corrections.includes('Page created')) fail('corrections page is missing the publication entry');
if (corrections.includes('</a>or')) fail('corrections page is missing a space after the email link');

const cname = fs.existsSync(path.join(dist, 'CNAME')) ? read(path.join(dist, 'CNAME')).trim() : '';
if (cname !== 'intelligenceadjacent.com') fail(`CNAME is ${JSON.stringify(cname)}`);

const rss = fs.existsSync(path.join(dist, 'rss.xml')) ? read(path.join(dist, 'rss.xml')) : '';
if (!rss.includes('Intelligence Adjacent')) fail('RSS feed is missing the channel title');
if (!rss.includes('CVE-2026-132224')) fail('RSS feed is missing the episode');

const episodesIndex = fs.existsSync(path.join(dist, 'episodes/index.html'))
  ? read(path.join(dist, 'episodes/index.html'))
  : '';
if (!episodesIndex.includes('CVE-2026-132224')) fail('episodes page is missing the episode');
if (episodesIndex.includes('First episode coming soon.')) fail('episodes page still shows the empty state');

const episodeHtml = fs.existsSync(path.join(dist, 'episodes/optimizely-cve-2026-132224/index.html'))
  ? read(path.join(dist, 'episodes/optimizely-cve-2026-132224/index.html'))
  : '';
if (!episodeHtml.includes('https://youtu.be/wXix8QF2TwI')) fail('episode page is missing the video URL');
if (!episodeHtml.includes('Watch the video')) fail('episode page is missing the video link');
if (!episodeHtml.includes('class="timeline"')) fail('episode page is missing the timeline');
if (!episodeHtml.includes('>07:51<') || !episodeHtml.includes('>22:24<')) fail('episode timeline is missing its UTC times');
if (episodeHtml.includes('<th>Time (UTC)</th>')) fail('episode timeline is still a scrolling table');
if (!episodeHtml.includes('data-label="Date"')) fail('episode notes tables are missing wrap labels');

const mockBits = ['SSHole', 'sshole-cve-2026-123158', 'CVE-2026-123158'];
for (const file of builtText) {
  const text = read(file);
  const relative = path.relative(root, file);
  for (const bit of mockBits) {
    if (text.includes(bit)) fail(`${relative} still mentions the mock episode (${bit})`);
  }
}

const about = fs.existsSync(path.join(dist, 'about/index.html')) ? read(path.join(dist, 'about/index.html')) : '';
if (!about.includes('hello@intelligenceadjacent.com')) fail('about page is missing the contact email');
if (!about.includes('href="/privacy/"')) fail('footer is missing the privacy link');
if (!about.includes('href="/terms/"')) fail('footer is missing the terms link');

const privacy = fs.existsSync(path.join(dist, 'privacy/index.html'))
  ? read(path.join(dist, 'privacy/index.html'))
  : '';
if (!privacy.includes('https://developers.google.com/terms/api-services-user-data-policy')) {
  fail('privacy page is missing the Google API Services User Data Policy link');
}
if (!privacy.includes('Limited Use')) fail('privacy page is missing the Limited Use requirements');
if (!privacy.includes('https://www.youtube.com/t/terms')) fail('privacy page is missing the YouTube Terms of Service');
if (!privacy.includes('https://policies.google.com/privacy')) fail('privacy page is missing the Google Privacy Policy');
if (!privacy.includes('https://myaccount.google.com/permissions')) {
  fail('privacy page is missing the Google account permissions link');
}

const terms = fs.existsSync(path.join(dist, 'terms/index.html'))
  ? read(path.join(dist, 'terms/index.html'))
  : '';
if (!terms.includes('/corrections/')) fail('terms page is missing the corrections link');
if (!terms.toLowerCase().includes('not legal advice')) fail('terms page is missing the advice limit');

if (failures.length > 0) {
  for (const message of failures) console.error(`check: ${message}`);
  process.exit(1);
}

console.log(`check: ${sourceFiles.length} source files and built site look clean`);
