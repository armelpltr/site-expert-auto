import { site } from '@/config/site';

/** Données structurées pour le SEO local. */
export function entrepriseJsonLd(base: URL | undefined) {
  const c = site.contact;
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': new URL('/#entreprise', base).href,
    name: site.enseigne,
    description: site.description,
    url: new URL('/', base).href,
    telephone: c.telephone,
    email: c.email,
    image: new URL('/og-expert-auto.jpg', base).href,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.adresse,
      postalCode: c.codePostal,
      addressLocality: site.ville,
      addressCountry: 'FR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: c.latitude, longitude: c.longitude },
    areaServed: site.zone.villes.map((v) => ({ '@type': 'City', name: v })),
    openingHoursSpecification: site.horaires.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.ouvre,
      closes: h.ferme,
    })),
    founder: { '@type': 'Person', name: site.nom, jobTitle: site.metier },
    ...(c.googleBusinessProfile ? { sameAs: [c.googleBusinessProfile] } : {}),
  };
}

export function serviceJsonLd(opts: { nom: string; description: string; url: string }, base: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.nom,
    description: opts.description,
    url: opts.url,
    serviceType: 'Expertise automobile',
    provider: { '@id': new URL('/#entreprise', base).href },
    areaServed: site.zone.villes.map((v) => ({ '@type': 'City', name: v })),
  };
}

export function faqJsonLd(questions: { q: string; r: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, r }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r } })),
  };
}
