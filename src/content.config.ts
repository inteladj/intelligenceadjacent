import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens.');

const episodes = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/episodes',
    generateId: ({ data }) => String(data.slug ?? ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug,
    summary: z.string(),
    youtube: z
      .string()
      .default('')
      .refine((value) => value.trim() === '' || /^https?:\/\/\S+$/.test(value.trim()), {
        message: 'youtube must be empty or an http(s) URL',
      }),
    tags: z.array(slug).default([]),
    cve: z.array(z.string()).default([]),
    severity: z.string().optional(),
    status: z.string().optional(),
    episode: z.string().optional(),
    updated: z.coerce.date().optional(),
    pillar: z.string().optional(),
    draft: z.boolean().default(false),
    corrections: z
      .array(
        z.object({
          date: z.coerce.date(),
          change: z.string(),
          reason: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { episodes };
