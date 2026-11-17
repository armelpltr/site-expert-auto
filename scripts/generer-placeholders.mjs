// Génère des visuels placeholder (atelier, expertise, portrait) sans marque
// ni logo. À remplacer par de vraies photos ou des photos libres de droit.
//
// Usage : node scripts/generer-placeholders.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dossier = path.join(racine, 'src/assets');
await mkdir(dossier, { recursive: true });

const rendre = (w, h, contenu, nom) =>
  sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${contenu}</svg>`))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(dossier, nom));

// Silhouette de voiture générique (aucune marque), repère 1000 × 400.
const voiture = (carrosserie, vitre = '#9fb3c8') => `
  <path d="M60 300 L60 230 C60 205 80 190 110 185 L250 170 L360 90 C380 75 405 68 430 68 L640 68 C670 68 695 78 715 95 L810 175 L900 190 C930 195 945 215 945 240 L945 300 Z" fill="${carrosserie}"/>
  <path d="M380 105 L430 90 L560 90 L560 175 L290 175 Z" fill="${vitre}"/>
  <path d="M585 90 L645 90 C665 90 680 97 695 110 L760 175 L585 175 Z" fill="${vitre}"/>
  <rect x="60" y="245" width="885" height="12" fill="#000" opacity="0.15"/>
  <circle cx="250" cy="305" r="72" fill="#1f2328"/><circle cx="250" cy="305" r="34" fill="#9aa3ad"/>
  <circle cx="770" cy="305" r="72" fill="#1f2328"/><circle cx="770" cy="305" r="34" fill="#9aa3ad"/>
  <rect x="880" y="205" width="50" height="18" rx="6" fill="#f6c14b"/>
  <rect x="70" y="210" width="40" height="16" rx="6" fill="#d9534f"/>`;

// Atelier : pont élévateur, véhicule levé, outillage.
await rendre(
  2000,
  1250,
  `<defs><linearGradient id="mur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3647"/><stop offset="1" stop-color="#1c2532"/></linearGradient></defs>
   <rect width="2000" height="1250" fill="url(#mur)"/>
   <rect y="980" width="2000" height="270" fill="#3a4556"/>
   <rect x="0" y="975" width="2000" height="10" fill="#f59e0b" opacity="0.8"/>
   ${[0, 1, 2, 3, 4].map((i) => `<rect x="${120 + i * 380}" y="80" width="300" height="34" rx="6" fill="#e8eef6" opacity="0.85"/>`).join('')}
   <rect x="430" y="380" width="40" height="600" fill="#5b6b80"/><rect x="1530" y="380" width="40" height="600" fill="#5b6b80"/>
   <rect x="400" y="640" width="1200" height="26" fill="#f59e0b"/>
   <g transform="translate(500 330) scale(1)">${voiture('#c9d2dc')}</g>
   <rect x="1700" y="700" width="220" height="280" rx="10" fill="#b94a3b"/>
   ${[0, 1, 2, 3].map((i) => `<rect x="1712" y="${716 + i * 66}" width="196" height="54" rx="6" fill="#a23f32"/><rect x="1790" y="${736 + i * 66}" width="40" height="8" rx="4" fill="#e7c9c4"/>`).join('')}
   <rect x="80" y="760" width="260" height="220" rx="10" fill="#465569"/><rect x="100" y="780" width="220" height="12" fill="#8fa2b8"/>`,
  'atelier.jpg',
);

// Expertise : véhicule de profil et tablette de constat.
await rendre(
  1600,
  1200,
  `<rect width="1600" height="1200" fill="#e9edf2"/>
   <rect y="820" width="1600" height="380" fill="#cfd6df"/>
   <g transform="translate(140 470) scale(1.05)">${voiture('#1f3a5f', '#a9bccd')}</g>
   <g transform="translate(1040 140) rotate(6)">
     <rect width="380" height="500" rx="28" fill="#14213d"/>
     <rect x="24" y="30" width="332" height="420" rx="10" fill="#f8fafc"/>
     <rect x="54" y="70" width="200" height="18" rx="9" fill="#14213d"/>
     ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="54" y="${120 + i * 48}" width="22" height="22" rx="5" fill="${i < 4 ? '#f59e0b' : '#cbd5e1'}"/><rect x="90" y="${124 + i * 48}" width="${180 - (i % 3) * 30}" height="14" rx="7" fill="#94a3b8"/>`).join('')}
   </g>`,
  'expertise.jpg',
);

// Portrait placeholder.
await rendre(
  1000,
  1250,
  `<rect width="1000" height="1250" fill="#dfe5ec"/>
   <circle cx="500" cy="470" r="165" fill="#9aa9bb"/>
   <path d="M190 1250 C190 860 340 720 500 720 C660 720 810 860 810 1250 Z" fill="#9aa9bb"/>`,
  'portrait.jpg',
);

// Image Open Graph 1200 × 630.
await sharp(path.join(dossier, 'atelier.jpg')).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(racine, 'public/og-expert-auto.jpg'));

console.log('Placeholders générés.');
