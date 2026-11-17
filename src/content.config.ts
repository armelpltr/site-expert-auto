import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const prestations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prestations' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string().max(200),
    /** Nom d'une icône Lucide déclarée dans src/components/IconePrestation.astro. */
    icone: z.enum(['car-crash', 'scale', 'wrench', 'search-check', 'gauge', 'gavel']),
    /**
     * Pour qui la prestation est affichée :
     * - assure : seulement si l'expert défend les assurés ;
     * - judiciaire : seulement si l'expert est inscrit comme expert judiciaire ;
     * - tous : toujours affichée.
     */
    affichage: z.enum(['tous', 'assure', 'judiciaire']).default('tous'),
    ordre: z.number().default(100),
  }),
});

export const collections = { prestations };
