import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '@/config/site';

export type Prestation = CollectionEntry<'prestations'>;

/** Prestations visibles selon le positionnement déclaré dans la configuration. */
export async function prestationsVisibles(): Promise<Prestation[]> {
  const p = site.positionnement;
  const toutes = await getCollection('prestations', ({ data }) => {
    if (data.affichage === 'assure') return p.expertAssure;
    if (data.affichage === 'judiciaire') return p.expertJudiciaire;
    return true;
  });
  return toutes.sort((a, b) => a.data.ordre - b.data.ordre);
}

/** Phrase de positionnement adaptée (expert d'assuré, missionné, ou les deux). */
export function phrasePositionnement() {
  const { expertAssure, missionneAssureurs } = site.positionnement;
  if (expertAssure && missionneAssureurs)
    return 'J’interviens pour les particuliers comme pour les compagnies d’assurance, en toute indépendance.';
  if (missionneAssureurs) return 'J’interviens sur mission des compagnies d’assurance, en toute indépendance.';
  return 'J’interviens à vos côtés, et non pour le compte de votre assureur : mon rôle est de défendre vos intérêts.';
}
