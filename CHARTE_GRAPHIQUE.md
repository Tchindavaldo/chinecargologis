# 🎨 CHARTE GRAPHIQUE MAERSKAIRCARGO

## Palette de Couleurs

### Couleurs Principales

#### Deep Navy (Brand Dark)
- **HEX**: `#0B132B`
- **RGB**: `rgb(11, 19, 43)`
- **Usage**: 
  - Texte principal du logo
  - Arrière-plans sombres
  - Headers et titres importants
  - Boutons primaires

#### Chine Cargo Light Blue (Brand Accent)
- **HEX**: `#42B0D5`
- **RGB**: `rgb(66, 176, 213)`
- **Usage**:
  - Partie accentuée du logo
  - Icônes et éléments interactifs
  - Liens et boutons secondaires
  - Highlights et call-to-actions

### Couleurs Secondaires

#### Lighter Navy (Brand Primary)
- **HEX**: `#1C2541`
- **RGB**: `rgb(28, 37, 65)`
- **Usage**:
  - Texte secondaire
  - Bordures et séparateurs
  - Arrière-plans alternatifs

#### Steel Blue (Brand Secondary)
- **HEX**: `#3A506B`
- **RGB**: `rgb(58, 80, 107)`
- **Usage**:
  - Éléments tertiaires
  - Dégradés
  - États hover

#### Off White (Brand Light)
- **HEX**: `#F8F9FA`
- **RGB**: `rgb(248, 249, 250)`
- **Usage**:
  - Arrière-plans clairs
  - Sections alternées
  - Cartes et conteneurs

---

## Typographie

### Police Principale
- **Famille**: Inter
- **Fallback**: sans-serif
- **Poids disponibles**: 
  - Regular (400)
  - Medium (500)
  - Semibold (600)
  - Bold (700)
  - Black (900)

### Hiérarchie des Titres
- **H1**: 2.5rem (40px) - Font Black
- **H2**: 2rem (32px) - Font Bold
- **H3**: 1.5rem (24px) - Font Semibold
- **Body**: 1rem (16px) - Font Regular

---

## Logo

### Composition
```
MAERSKAIRCARGO
└─ Texte en une ligne
   └─ Couleur: Brand Dark (#0B132B)
   └─ Police: Inter Black
   └─ Tracking: Tight

Global Logistics
└─ Sous-titre
   └─ Couleur: Gray 400
   └─ Police: Inter Bold
   └─ Taille: 10px
   └─ Tracking: Widest
   └─ Uppercase
```

### Icône Logo
- **Forme**: Navire (Ship icon)
- **Couleur fond**: Brand Dark (#0B132B) ou Brand Accent (#42B0D5) selon le contexte
- **Couleur icône**: Blanc (#FFFFFF)
- **Padding**: 8px
- **Border radius**: 8px

### Variations

#### Version Principale (Desktop)
```
[Icône Ship] MAERSKAIRCARGO
             Global Logistics
```

#### Version Mobile
```
[Icône Ship] MAERSKAIRCARGO
             Global Logistics
```
(Identique mais adapté à la taille d'écran)

---

## Espacements

### Padding Standards
- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)

### Margins Standards
- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)

---

## Composants UI

### Boutons

#### Bouton Primaire
```css
background: #0B132B (Brand Dark)
color: #FFFFFF
padding: 0.625rem 1.5rem
border-radius: 9999px (full)
font-weight: bold
hover: background #42B0D5 (Brand Accent)
```

#### Bouton Secondaire
```css
background: #42B0D5 (Brand Accent)
color: #FFFFFF
padding: 0.625rem 1.5rem
border-radius: 9999px (full)
font-weight: bold
hover: background #3A506B (Brand Secondary)
```

### Cartes
```css
background: #FFFFFF
border-radius: 1rem (16px)
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
padding: 2rem
hover: box-shadow 0 10px 15px rgba(0, 0, 0, 0.1)
```

### Inputs
```css
border: 1px solid #E5E7EB
border-radius: 0.5rem (8px)
padding: 0.75rem 1rem
focus: border-color #42B0D5 (Brand Accent)
focus: ring 2px #42B0D5 (Brand Accent) opacity 50%
```

---

## Ombres

### Shadow Levels
- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`
- **2xl**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

---

## Animations

### Transitions Standards
- **Duration**: 300ms
- **Easing**: ease-in-out

### Hover Effects
- **Scale**: 1.05
- **Shadow**: Augmentation d'un niveau
- **Color**: Transition vers Brand Accent

---

## Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large desktop */
```

---

## Accessibilité

### Contraste Minimum
- **Texte normal**: 4.5:1
- **Texte large**: 3:1
- **Éléments UI**: 3:1

### Focus States
- Tous les éléments interactifs doivent avoir un état focus visible
- Ring color: Brand Accent (#42B0D5)
- Ring width: 2px

---

## Exemples d'Application

### Header
- Background: Blanc (#FFFFFF)
- Logo: Brand Dark + Brand Accent
- Navigation: Brand Primary
- Active state: Brand Accent

### Footer
- Background: Brand Dark (#0B132B)
- Text: Gray 300
- Links hover: Brand Accent

### Hero Section
- Background: Gradient from Brand Dark to Brand Primary
- Text: Blanc
- CTA Button: Brand Accent

---

**Document créé le**: 2026-02-06
**Version**: 1.0.0
**Dernière mise à jour**: 2026-02-06
