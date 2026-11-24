export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function episodePath(slug: string): string {
  return `/episodes/${slug}/`;
}

export function readingMinutes(markdown: string | undefined): number | null {
  if (!markdown) return null;
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return null;
  return Math.max(1, Math.round(words / 220));
}

export function youtubeHref(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith('[')) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.href;
  } catch {
    return null;
  }
}

export function statusClass(status: string): string {
  const value = status.toLowerCase();
  if (value.includes('exploit') || value.includes('active') || value.includes('unpatched')) {
    return 'badge badge-warn';
  }
  return 'badge';
}
