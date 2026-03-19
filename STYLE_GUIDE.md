# Style Guide YouthIn Cameroun

## 🎨 Palette de Couleurs

### Primaire
- **Jaune Électrique** : `#DCF763` - CTA principale, accents, highlights
- **Noir Charbon** : `#2C2C2C` - Fond principal

### Neutres
- **Blanc** : `#FFFFFF` - Texte sur fond sombre, texte principal
- **Gris clair** : `#404040` - Éléments secondaires
- **Gris moyen** : `#8B8B8B` - Texte muted
- **Noir profond** : `#1F1F1F` - Cartes, encadrants

### Secondaires
- **Vert** : Succès, statuts positifs
- **Rouge** : Erreurs, destructive actions
- **Orange** : Warnings, alertes

## 🔤 Typographie

### Familles
- **Sans-serif** : Geist (Google Font) - Tous les textes
- **Monospace** : Geist Mono - Code

### Hiérarchie
- **H1** : 48px-60px - Titres de page
- **H2** : 36px-40px - Titres de section
- **H3** : 24px - Sous-titres
- **Body** : 16px - Texte normal
- **Small** : 14px - Textes fins
- **Tiny** : 12px - Labels

### Poids
- **Regular** : 400 - Texte normal
- **Semibold** : 600 - Accents, labels
- **Bold** : 700 - Titres, emphase

## Spacing (Tailwind Scale)

Basé sur 4px:
- `p-4` : 16px
- `p-6` : 24px
- `p-8` : 32px
- `gap-4` : 16px
- `gap-6` : 24px
- `gap-8` : 32px

## 🖼️ Composants

### Buttons

#### Primary (CTA)
```
bg-accent text-primary-foreground hover:bg-accent/90
px-8 py-6 text-lg font-semibold rounded-lg
```

#### Secondary (Outline)
```
border-accent text-accent hover:bg-accent/10
px-8 py-6 text-lg font-semibold rounded-lg
```

### Cards
```
bg-card border border-border rounded-2xl p-8
hover:border-accent transition
```

### Badges
```
bg-accent/20 text-accent px-3 py-1 rounded-full text-sm
```

### Inputs
```
px-4 py-3 rounded-lg bg-background border border-border
text-foreground placeholder:text-muted-foreground
focus:outline-none focus:border-accent
```

## 🎬 Animations

### Fade In
```css
animation: fadeIn 0.6s ease-in-out;
```

### Slide Up
```css
animation: slideUp 0.8s ease-out;
```

### Glow
```css
animation: glow 2s ease-in-out infinite;
box-shadow: 0 0 20px rgba(220, 247, 99, 0.2);
```

### Hover Effects
```
transition duration-300
hover:border-accent
hover:text-accent
hover:bg-accent/10
```

## 📱 Breakpoints

- **Mobile First** : `< 768px`
- **Tablet** : `md` (768px+)
- **Desktop** : `lg` (1024px+)

Utiliser :
- `hidden md:block` - Caché sur mobile, visible sur tablet+
- `md:grid-cols-2` - 1 colonne mobile, 2 colonnes tablet+

## 🔍 Structure HTML

### Semantic Elements
```tsx
<header>Navigation</header>
<main>Contenu principal</main>
<article>Contenu article</article>
<section>Sections de contenu</section>
<footer>Pied de page</footer>
```

### Accessibility
- Alt text sur toutes les images
- Screen reader text : `sr-only`
- Labels sur les inputs
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels où nécessaire

## 🎨 Design Patterns

### Hero Section
- Titre grand (48px+)
- Sous-titre medium (20px)
- CTA principal + secondaire
- Image ou gradient background

### Feature Grid
- Cards avec icônes
- Titre + description
- Hover state avec underline/glow

### Stats Section
- Grandes nombres (accent color)
- Label dessous
- Layout grid 2x2 ou 1x4

### Testimonial Cards
- Avatar + nom + titre
- Stars de rating
- Quote italique
- Info supplémentaire en bas

## 📋 Checklist Design

- [ ] Utiliser les couleurs du système
- [ ] Espacement cohérent (multiples de 4px)
- [ ] Typographie hiérarchisée
- [ ] Mobile-first responsive
- [ ] Texte avec suffisante de contraste
- [ ] Animations fluides (< 300ms)
- [ ] Hover states clairs
- [ ] Alt text sur images
- [ ] Focus states visibles
- [ ] Pas de emojis en tant qu'icons
- [ ] Max 2 familles de police
- [ ] Max 5 couleurs principales

## 🌙 Dark Mode

Site en dark mode par défaut :
- `bg-background` : `#2C2C2C`
- `text-foreground` : `#FFFFFF`
- Autres variables CSS en dark mode

Pas de light mode en première phase.

## 📐 Grilles

### Container Max
```
max-w-7xl mx-auto
```

### Grid Layouts
```
grid md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4
```

### Gaps
```
gap-4 md:gap-6 lg:gap-8
```

## 🎯 Focus & Accessibility

### Focus Rings
```
outline-ring/50
focus:border-accent
```

### Skip Links
```tsx
<a href="#main" className="sr-only">
  Aller au contenu principal
</a>
```

---

**Version** : 1.0  
**Dernière mise à jour** : March 2026  
**Mainteneur** : YouthIn Team
