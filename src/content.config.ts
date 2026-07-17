import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

export const collections = {
	work: defineCollection({
		loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
			// Case-study rail. `year` falls back to publishDate when omitted.
			role: z.string().optional(),
			tools: z.string().optional(),
			scope: z.string().optional(),
			timeline: z.string().optional(),
			year: z.string().optional(),
		}),
	}),
};
