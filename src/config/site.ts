/**
 * Contenu centralisé du site. Tout ce qui est entre crochets est un
 * placeholder à confirmer avec l'expert avant la mise en ligne.
 */
export const site = {
  nom: '[Prénom Nom]',
  enseigne: '[Nom du cabinet] Expertise Automobile',
  metier: 'Expert automobile indépendant',
  ville: '[VILLE]',
  departement: '[Département]',
  description:
    "Expert automobile indépendant à [VILLE] : expertise après sinistre, contre-expertise, litige garage, vice caché, expertise avant achat. Devis gratuit.",

  /**
   * Positionnement, à confirmer avec le client :
   * - expertAssure : défend le particulier face à son assureur (expertise d'assuré) ;
   * - missionneAssureurs : intervient aussi sur mission des compagnies d'assurance.
   * Les textes et prestations affichés s'adaptent à ces deux options.
   */
  positionnement: {
    expertAssure: true,
    missionneAssureurs: false,
    /** Inscription sur une liste d'experts judiciaires (cour d'appel). */
    expertJudiciaire: false,
  },

  contact: {
    telephone: '06 12 34 56 78',
    email: 'contact@exemple-expert-auto.fr',
    adresse: '[Adresse du bureau, ou « Interventions sur site uniquement »]',
    codePostal: '[00000]',
    latitude: 45.1885,
    longitude: 5.7245,
    /** Lien vers la fiche Google Business Profile (à créer si besoin). */
    googleBusinessProfile: '',
  },

  /** Obligations réglementaires : à afficher de manière visible. */
  reglementaire: {
    numeroListeNationale: '[N° d’inscription sur la liste nationale des experts en automobile]',
    qualificationVE: '[VE / VGE : oui ou non]',
    assuranceRcPro: '[Assureur RC pro, n° de contrat]',
    siret: '[SIRET]',
  },

  experience: {
    annees: '[15]',
    expertisesRealisees: '[2 000]',
    delaiIntervention: '[48 h]',
  },

  horaires: [
    { jours: 'Lundi – Vendredi', heures: '[8 h – 19 h]', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], ouvre: '08:00', ferme: '19:00' },
    { jours: 'Samedi', heures: '[9 h – 12 h, sur rendez-vous]', schema: ['Saturday'], ouvre: '09:00', ferme: '12:00' },
  ],

  /** Zone d'intervention : villes listées pour le SEO local. */
  zone: {
    rayon: '[50 km autour de VILLE]',
    villes: ['[VILLE]', '[Ville 2]', '[Ville 3]', '[Ville 4]', '[Ville 5]', '[Ville 6]', '[Ville 7]', '[Ville 8]', '[Ville 9]', '[Ville 10]', '[Ville 11]', '[Ville 12]'],
    deplacementHorsZone: '[Au-delà, déplacement possible sur devis.]',
  },

  /** Forfaits indicatifs : montants à confirmer. */
  tarifs: [
    { nom: 'Expertise après sinistre', prix: '[à partir de 250 € TTC]', detail: 'Examen du véhicule, chiffrage, rapport, présence à l’expertise contradictoire si besoin.' },
    { nom: 'Expertise avant achat', prix: '[à partir de 180 € TTC]', detail: 'Inspection complète du véhicule d’occasion et rapport détaillé avant signature.' },
    { nom: 'Litige garage / vice caché', prix: '[sur devis]', detail: 'Analyse du dossier, examen du véhicule, réunion contradictoire, rapport technique.' },
    { nom: 'Estimation de valeur (VEI)', prix: '[à partir de 150 € TTC]', detail: 'Détermination de la valeur de remplacement à dire d’expert.' },
  ],
  fraisDeplacement: '[Déplacement inclus dans un rayon de 30 km, puis 0,60 €/km.]',

  formulaire: {
    service: 'netlify' as 'netlify' | 'formspree',
    formspreeId: '',
  },

  legal: {
    editeur: '[Prénom Nom], expert en automobile',
    statut: '[Entreprise individuelle / EURL / SASU]',
    capital: '',
    rcs: '[RCS / RNE]',
    tvaIntra: '[N° TVA intracommunautaire]',
    directeurPublication: '[Prénom Nom]',
    hebergeur: '[Netlify, Inc. – 512 2nd Street, Suite 200, San Francisco, CA 94107, USA] ou [Vercel Inc.]',
    mediateur: '[Médiateur de la consommation : nom, site]',
    misAJour: '18 novembre 2026',
  },
} as const;

export const navigation = [
  { href: '/prestations', label: 'Prestations' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/qui-suis-je', label: 'Qui suis-je' },
  { href: '/zone-intervention', label: 'Zone' },
  { href: '/faq', label: 'FAQ' },
] as const;

export const telLien = `tel:${site.contact.telephone.replace(/[^\d+]/g, '')}`;
