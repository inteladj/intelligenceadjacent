export interface TimelineItem {
  time: string;
  event: string;
  source: string;
}

const TIMELINE_HEADERS = ['Time (UTC)', 'Event', 'Who says so'];
const MARK = '<!--EPISODE_TIMELINE-->';

export function prepareEpisodeHtml(html: string): { parts: string[]; timelines: TimelineItem[][] } {
  const timelines: TimelineItem[][] = [];
  const replaced = html.replace(/<table\b[^>]*>[\s\S]*?<\/table>/g, (table) => {
    const timeline = readTimeline(table);
    if (timeline) {
      timelines.push(timeline);
      return MARK;
    }
    return annotateTable(table);
  });
  return { parts: replaced.split(MARK), timelines };
}

function readTimeline(table: string): TimelineItem[] | null {
  const head = table.match(/<thead\b[^>]*>([\s\S]*?)<\/thead>/);
  if (!head) return null;
  const headers = [...head[1].matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((match) => plain(match[1]));
  if (headers.length !== TIMELINE_HEADERS.length || headers.some((header, index) => header !== TIMELINE_HEADERS[index])) {
    return null;
  }
  const body = table.match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/)?.[1] ?? table;
  const items: TimelineItem[] = [];
  for (const row of body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)) {
    const cells = [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map((match) => match[1].trim());
    if (cells.length < 3) continue;
    items.push({ time: plain(cells[0]), event: cells[1], source: cells[2] });
  }
  return items.length > 0 ? items : null;
}

function annotateTable(table: string): string {
  const head = table.match(/<thead\b[^>]*>([\s\S]*?)<\/thead>/);
  const headers = head
    ? [...head[1].matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((match) => plain(match[1]))
    : [];
  const log = headers.length === 3 && headers[0] === 'Date' && headers[1] === 'Change' && headers[2] === 'Reason';
  const className = log ? 'notes-table notes-log' : 'notes-table';
  const withClass = table.replace(/<table\b([^>]*)>/, (_open, attrs: string) => {
    if (/\bclass=/.test(attrs)) return `<table${attrs.replace(/class=(["'])/, `class=$1${className} `)}>`;
    return `<table class="${className}"${attrs}>`;
  });
  if (headers.length === 0) return withClass;
  return withClass.replace(/<tr\b[^>]*>[\s\S]*?<\/tr>/g, (row) => {
    if (/<th\b/.test(row)) return row;
    let index = 0;
    return row.replace(/<td\b([^>]*)>/g, (_open, attrs: string) => {
      const label = headers[index] ?? '';
      index += 1;
      return `<td${attrs} data-label="${escapeAttr(label)}">`;
    });
  });
}

function plain(value: string): string {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
