/**
 * Site-wide settings. Change the support URL here and nowhere else.
 * Episode videos use the `youtube` field in each episode's frontmatter.
 */
export const site = {
  name: 'Intelligence Adjacent',
  url: 'https://intelligenceadjacent.com',
  email: 'hello@intelligenceadjacent.com',
  tagline: 'Security news, minus the hype.',
  description:
    "Security news, explained by someone who's tired of the hype. What happened, whether it matters to you, and exactly what to do about it.",
  youtube: 'https://www.youtube.com/@IntelligenceAdjacent',
  supportUrl: 'https://buymeacoffee.com/inteladj',
  supportLabel: 'Buy me a coffee',
} as const;
