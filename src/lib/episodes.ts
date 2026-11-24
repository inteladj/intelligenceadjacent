import { getCollection, type CollectionEntry } from 'astro:content';

export type Episode = CollectionEntry<'episodes'>;

export async function getEpisodes(): Promise<Episode[]> {
  const episodes = await getCollection('episodes', ({ data }) => data.draft !== true);
  const slugs = new Set<string>();
  for (const episode of episodes) {
    const { slug } = episode.data;
    if (slugs.has(slug)) {
      throw new Error(`Duplicate episode slug "${slug}".`);
    }
    slugs.add(slug);
  }
  return episodes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function allTags(episodes: Episode[]): string[] {
  return [...new Set(episodes.flatMap((episode) => episode.data.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}
