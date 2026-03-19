# YouthIn - Guide de Démarrage Rapide

## Installation

```bash
# Cloner le projet
git clone <repo-url>
cd youthin-cameroon

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

Le site sera disponible à `http://localhost:3000`

---

## Pages Principales

| Page | URL | Description |
|------|-----|-------------|
| **Accueil** | `/` | Landing page avec 5 piliers |
| **Concours** | `/concours` | Détails du concours 2026 |
| **Tontine Smart** | `/tontine` | Système de tontine |
| **Mentors** | `/mentors` | Marketplace de mentors |
| **Communauté** | `/communaute` | Villages et réseau |
| **À Propos** | `/apropos` | Mission et équipe |
| **Soumettre** | `/soumettre` | Formulaire soumission projet (10,000 FCFA) |
| **Voter** | `/voter` | Vote sur projets (75 FCFA/vote) |
| **Télécharger** | `/telecharger` | App store badges |
| **Dashboard** | `/dashboard` | Espace utilisateur |
| **Blog** | `/blog` | Articles et news |
| **Contact** | `/contact` | Formulaire contact |
| **Stats** | `/stats` | Statistiques en direct |

---

## Variables d'Environnement Requises

Crée un fichier `.env.local` avec:

```env
# MTN Mobile Money
NEXT_PUBLIC_MTN_API_URL=https://api.mtn.cm
MTN_PRIMARY_KEY=your_mtn_primary_key
MTN_SECONDARY_KEY=your_mtn_secondary_key

# Orange Money
NEXT_PUBLIC_ORANGE_API_URL=https://api.orange.cm
ORANGE_CLIENT_ID=your_orange_client_id
ORANGE_CLIENT_SECRET=your_orange_client_secret

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

Sans ces variables, le site fonctionne en **mode démo** avec 90% de réussite pour tester les paiements.

---

## Commandes Principales

```bash
# Développement
pnpm dev          # Démarre le serveur dev avec HMR

# Build
pnpm build        # Build pour production
pnpm start        # Démarre le serveur prod

# Lint
pnpm lint         # Vérifie le code
```

---

## Architecture

```
youthin-cameroon/
├── app/                      # Pages et routes Next.js
│   ├── page.tsx             # Accueil
│   ├── soumettre/           # Soumission projet
│   ├── voter/               # Système de vote
│   ├── dashboard/           # Espace utilisateur
│   └── ...autres pages
│
├── components/              # Composants réutilisables
│   ├── ui/                 # Shadcn/UI components
│   ├── header.tsx          # Navigation
│   ├── footer.tsx          # Pied de page
│   ├── project-submission-form.tsx
│   ├── vote-payment-modal.tsx
│   └── ...autres
│
├── lib/                     # Utilitaires & services
│   ├── payment-service.ts   # MTN/Orange payments
│   ├── payment-validation.ts # Validation
│   └── utils.ts
│
├── public/                  # Assets statiques
│   ├── hero-1.jpg
│   ├── illustration-*.jpg
│   └── ...images
│
└── app/globals.css         # Styles globaux + animations
```

---

## Fonctionnalités Principales

### 1. Soumission de Projet
- Formulaire multi-étapes
- Upload d'images (1-5)
- Paiement de 10,000 FCFA (MTN/Orange Money)
- Validation en temps réel
- Sauvegarde automatique

### 2. Système de Vote
- Vote sur projets (75 FCFA/vote)
- 1 vote par utilisateur/24h
- Filtrage par catégorie
- Recherche en temps réel
- Classement par nombre de votes

### 3. Paiement Mobile
- **MTN Mobile Money**
  - USSD: *156#
  - Webservice API intégré
  
- **Orange Money**
  - USSD: *611#
  - REST API intégré

### 4. Dashboard Utilisateur
- Historique des soumissions
- Historique des votes
- Statistiques personnelles
- YouthIn Index (Bronze → Elite)

---

## Personnalisation

### Couleurs
Modifiez dans `/app/globals.css`:
```css
:root {
  --accent: #DCF763;        /* Jaune électrique */
  --background: #2C2C2C;    /* Noir charbon */
  --foreground: #FFFFFF;    /* Blanc */
}
```

### Textes & Contenu
Recherchez et remplacez directement dans les fichiers `.tsx`

### Animations
Modifiez les keyframes dans `/app/globals.css`

---

## Déploiement

### Sur Vercel (Recommandé)

```bash
# 1. Push sur GitHub
git push

# 2. Connecter à Vercel
# https://vercel.com/new

# 3. Configurer les env vars dans Vercel Settings
# Ajouter MTN_PRIMARY_KEY, MTN_SECONDARY_KEY, etc.

# 4. Déployer automatiquement
# Chaque push déclenche un déploiement
```

### Autre Plateforme
```bash
pnpm build
pnpm start
```

---

## Aide & Support

### Documentation
- `/FEATURES_COMPLETE.md` - Liste complète des features
- `/INTEGRATION_GUIDE.md` - Guide d'intégration APIs
- `/DEPLOYMENT.md` - Guide de déploiement
- `/STYLE_GUIDE.md` - Guide de design
- `/AUDIT_RESULTS.md` - Résultats de l'audit

### Contribuer
1. Créez une branche `feature/...`
2. Commitez vos changements
3. Push et créez un Pull Request
4. Attendez la review

---

## FAQ

**Q: Comment tester les paiements?**
A: Sans env vars, utilisez le mode démo avec 90% de réussite pour tester l'UX.

**Q: Puis-je changer les montants (10,000 FCFA et 75 FCFA)?**
A: Oui, modifiez dans les fichiers `.tsx` correspondants (cherchez les constantes de montant).

**Q: Où voir les données des paiements?**
A: Connectez une base de données (voir `/INTEGRATION_GUIDE.md`).

**Q: Comment ajouter une nouvelle page?**
A: Créez un dossier dans `/app`, mettez un `page.tsx` dedans.

**Q: Puis-je utiliser un autre système de paiement?**
A: Oui, copiez la structure de `payment-service.ts` et adaptez-la.

---

## Licence & Crédits

Construit avec ❤️ pour les entrepreneurs camerounais.

- Framework: Next.js 16
- UI: Shadcn/UI + Tailwind CSS v4
- Payments: MTN & Orange Money APIs
- Icons: Lucide React

**Made with YouthIn Platform** 🚀
