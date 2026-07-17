import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = {
  'ai-research': { en: 'AI & Research', fr: 'IA & Recherche' },
  'linux-hardware': { en: 'Linux & Hardware', fr: 'Linux & Hardware' },
  'selfhosted-infra': { en: 'Self-hosted & Infra', fr: 'Auto-hébergement & Infra' },
  'web-apps': { en: 'Web Apps', fr: 'Applications Web' },
} as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['ai-research', 'linux-hardware', 'selfhosted-infra', 'web-apps']),
    featured: z.boolean().default(false),
    repo: z.string().url(),
    install: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    tech: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

export const collections = { projects };
