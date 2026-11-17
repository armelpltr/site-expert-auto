# Site vitrine : expert automobile indépendant

Site statique construit avec **Astro** et **Tailwind CSS**, pensé pour être trouvé localement et générer des
demandes d'expertise. Mobile first, barre « Appeler / Devis » fixe sur mobile, SEO local, aucun traceur.

> Tous les textes entre crochets `[…]` sont des **placeholders** à confirmer avec l'expert.
> Les visuels fournis sont des illustrations provisoires, sans marque ni logo.

## Sommaire

- [Lancer le site en local](#lancer-le-site-en-local)
- [Modifier les informations](#modifier-les-informations)
- [Positionnement : expert d'assuré, missionné, judiciaire](#positionnement--expert-dassuré-missionné-judiciaire)
- [Modifier les prestations](#modifier-les-prestations)
- [Modifier les tarifs](#modifier-les-tarifs)
- [Photos](#photos)
- [Formulaire de demande d'expertise](#formulaire-de-demande-dexpertise)
- [Déployer](#déployer)
- [Après la mise en ligne : SEO local](#après-la-mise-en-ligne--seo-local)
- [Checklist des informations à obtenir du client](#checklist-des-informations-à-obtenir-du-client)

## Lancer le site en local

Prérequis : Node.js 22 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Commande          | Rôle                                         |
| ----------------- | -------------------------------------------- |
| `npm run build`   | Génère le site statique dans `dist/`         |
| `npm run preview` | Sert `dist/` en local pour vérifier le build |
| `npm run check`   | Vérifie les types et le schéma du contenu    |

## Modifier les informations

Tout est centralisé dans [`src/config/site.ts`](src/config/site.ts) :

| Bloc             | Contenu                                                                            |
| ---------------- | ---------------------------------------------------------------------------------- |
| en-tête          | nom, enseigne, ville, département, description (balise meta de l'accueil)          |
| `positionnement` | expert d'assuré, missionné par les assurances, expert judiciaire (voir ci-dessous)  |
| `contact`        | téléphone, e-mail, adresse, coordonnées GPS, lien Google Business Profile           |
| `reglementaire`  | **n° d'inscription sur la liste nationale**, qualification VE, RC pro, SIRET        |
| `experience`     | années d'expérience, nombre d'expertises, délai d'intervention                      |
| `horaires`       | affichés sur le site et repris dans les données structurées                         |
| `zone`           | rayon et **liste des villes** desservies (page Zone et SEO local)                   |
| `tarifs`         | forfaits indicatifs et frais de déplacement                                         |
| `legal`          | statut, RCS, TVA, hébergeur, médiateur de la consommation                           |

Le n° d'inscription sur la liste nationale s'affiche dans la barre du haut (ordinateur), dans le bandeau
de l'accueil, sur « Qui suis-je », dans le pied de page et dans les mentions légales.

L'URL définitive du site se règle dans [`astro.config.mjs`](astro.config.mjs) (`SITE_URL`).

## Positionnement : expert d'assuré, missionné, judiciaire

À confirmer avec le client, puis régler dans `positionnement` :

```ts
positionnement: {
  expertAssure: true,        // défend le particulier face à son assureur
  missionneAssureurs: false, // intervient sur mission des compagnies d'assurance
  expertJudiciaire: false,   // inscrit sur la liste d'une cour d'appel
},
```

Effets :

- l'accroche de l'accueil, l'argument « Indépendance » et la phrase de présentation s'adaptent ;
- la prestation « Expertise après sinistre et contre-expertise » n'apparaît que si `expertAssure` est vrai ;
- la prestation « Expertise judiciaire » n'apparaît que si `expertJudiciaire` est vrai.

Chaque prestation choisit sa règle d'affichage avec le champ `affichage` (`tous`, `assure`, `judiciaire`).

## Modifier les prestations

Chaque prestation est un fichier Markdown de `src/content/prestations/` :

```markdown
---
titre: "Expertise avant achat d'un véhicule d'occasion"
resume: "Phrase affichée sur la carte et dans Google (200 caractères max.)."
icone: search-check   # car-crash, scale, wrench, search-check, gauge, gavel
affichage: tous       # tous, assure, judiciaire
ordre: 4              # position dans la liste
---

Texte de la page de détail, en Markdown (intertitres avec `##`, listes avec `-`).
```

Le nom du fichier devient l'adresse : `expertise-avant-achat.md` → `/prestations/expertise-avant-achat`.
Ajouter un fichier crée la carte, la page, l'entrée dans le formulaire de contact et le sitemap.

Les sections « Bon à savoir » et la FAQ (`src/pages/faq.astro`) contiennent des **placeholders
juridiques** : ne rien publier sans validation de l'expert.

## Modifier les tarifs

Dans `src/config/site.ts`, bloc `tarifs` (nom, prix, détail) et `fraisDeplacement`. La mention
« devis gratuit » est affichée sur la page Tarifs, l'accueil et le formulaire.

## Photos

Remplacer les fichiers de `src/assets/` en gardant le même nom :

- `atelier.jpg` : fond du bandeau de l'accueil (paysage, 2 000 px de large) ;
- `expertise.jpg` : photo d'expertise sur « Qui suis-je » ;
- `portrait.jpg` : portrait de l'expert (format 4:5) ;
- `public/og-expert-auto.jpg` : aperçu sur les réseaux sociaux (1200 × 630 px).

Photos libres de droit : [Unsplash](https://unsplash.com) ou [Pexels](https://www.pexels.com)
(recherches « car inspection », « mechanic workshop », « car damage »). Vérifier qu'aucun logo de marque
automobile ni d'assureur n'est reconnaissable (flouter si besoin). Les images sont converties
automatiquement en AVIF / WebP à plusieurs tailles.

## Formulaire de demande d'expertise

Champs : nom, téléphone, e-mail, immatriculation, type de demande, assureur, date du sinistre,
prestation envisagée (préremplie depuis une fiche prestation), photos (5 max., 8 Mo au total) et message.

- **Netlify Forms** (par défaut) : gère l'envoi de photos. Les demandes arrivent dans l'onglet **Forms** ;
  activer la notification e-mail vers l'expert. Limite Netlify : 8 Mo par envoi.
- **Formspree** : `formulaire.service: 'formspree'` et `formspreeId`. Attention, l'envoi de fichiers
  nécessite une offre payante Formspree.

## Déployer

### GitHub Pages (aperçu en ligne, actif)

Chaque push sur `main` publie le site sur **https://armelpltr.github.io/site-expert-auto/** via
`.github/workflows/pages.yml`. Le workflow construit le site avec `SITE_URL` et `BASE_PATH`, puis
`scripts/prefixer-base.mjs` ajoute le sous-dossier `/site-expert-auto/` aux liens internes et aux URL absolues.

Limite : GitHub Pages est un hébergement statique, **le formulaire Netlify Forms n'y fonctionne pas**.
Pour un formulaire fonctionnel sur Pages, passer sur Formspree (`formulaire.service: 'formspree'`).

Rien n'est déployé. Les configurations sont prêtes :

- **Netlify** (recommandé) : importer le dépôt sur app.netlify.com ; réglages lus dans `netlify.toml`.
- **Vercel** : importer le dépôt ; réglages lus dans `vercel.json`. Passer le formulaire sur Formspree.

Brancher ensuite le nom de domaine et mettre à jour `SITE_URL`.

## Après la mise en ligne : SEO local

1. Créer ou revendiquer la fiche **Google Business Profile** (catégorie « Expert automobile »), avec les
   mêmes nom, adresse, téléphone et horaires que sur le site, puis renseigner son lien dans
   `contact.googleBusinessProfile` (il apparaît alors en pied de page et dans les données structurées).
2. Déclarer le site et `sitemap-index.xml` dans Google Search Console.
3. Demander des avis Google aux clients satisfaits (pas de faux avis sur le site).

Déjà intégré : balises meta et Open Graph par page, `sitemap-index.xml`, `robots.txt`, JSON-LD
`LocalBusiness` / `ProfessionalService` (`areaServed`, horaires, téléphone, coordonnées GPS), `Service` par
prestation et `FAQPage`.

## Checklist des informations à obtenir du client

### Statut et réglementation

- [ ] Positionnement : expert d'assuré, missionné par les assurances, ou les deux ?
- [ ] Inscription comme expert judiciaire (oui / non, cour d'appel)
- [ ] **N° d'inscription sur la liste nationale des experts en automobile**
- [ ] Qualification VE (véhicules endommagés) : oui / non
- [ ] Assurance RC professionnelle : assureur et n° de contrat
- [ ] Forme juridique, SIRET, RCS / RNE, n° de TVA, capital éventuel
- [ ] Médiateur de la consommation choisi

### Activité

- [ ] Nom commercial (enseigne) et éventuel logo
- [ ] Liste des prestations réellement proposées et textes « Bon à savoir »
- [ ] Réponses validées pour la FAQ (aucune affirmation juridique sans validation)
- [ ] Tarifs indicatifs, frais de déplacement, moyens de paiement
- [ ] Délai d'intervention et délai de remise du rapport
- [ ] Années d'expérience, nombre d'expertises, parcours et diplômes

### Contact et zone

- [ ] Téléphone, e-mail, adresse du bureau (ou interventions sur site uniquement)
- [ ] Horaires
- [ ] Ville principale, département, rayon et liste des communes desservies
- [ ] Coordonnées GPS du point central de la zone
- [ ] Fiche Google Business Profile existante ?

### Visuels

- [ ] Portrait professionnel
- [ ] Photos réelles d'expertise ou d'atelier (sans logo reconnaissable)

### Avant la mise en ligne

- [ ] Plus aucun `[…]` dans le site : `grep -rn "\[" src/config src/pages src/content`
- [ ] `SITE_URL` renseignée, formulaire testé une fois déployé (avec une photo)
