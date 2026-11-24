import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config';
import { getEpisodes } from '../lib/episodes';
import { episodePath } from '../lib/format';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('Set site in astro.config.mjs before building the RSS feed.');
  }

  const episodes = await getEpisodes();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    trailingSlash: true,
    customData: '<language>en-us</language>',
    items: episodes.map((episode) => ({
      title: episode.data.title,
      pubDate: episode.data.date,
      description: episode.data.summary,
      link: episodePath(episode.data.slug),
      categories: episode.data.tags,
    })),
  });
}
