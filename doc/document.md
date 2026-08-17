# Utiliser des icônes SVG en mode inline

## L'essence du SVG — ce qu'il faut vraiment comprendre

Un fichier `.svg` n'est **pas une image binaire** comme un `.jpg` ou un `.png`.  
C'est un **document texte** qui décrit des formes géométriques en XML.

Ouvre n'importe quel fichier `.svg` dans un éditeur : tu verras du code.  
Chaque forme est une instruction : "dessine un rectangle ici", "trace un chemin là".

```xml
<!-- Ceci est l'icône mail — c'est juste du texte décrivant deux formes -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <rect x="2" y="4" width="20" height="16" rx="2"/>   <!-- le rectangle de l'enveloppe -->
  <polyline points="2,4 12,13 22,4"/>                  <!-- le V du rabat -->
</svg>
```

**Ce que cela implique :**

- Il n'y a **pas de lien** entre un fichier `.svg` et une balise `<svg>` dans le HTML
- `xmlns` sur la balise `<svg>` n'est **pas un chemin de fichier** — c'est un identifiant d'espace de noms XML, toujours fixé à `http://www.w3.org/2000/svg`
- Chaque icône a ses **propres formes** (`<path>`, `<circle>`, `<polyline>`...) — elles ne se chargent pas automatiquement
- En mode inline, tu **copies littéralement** le code des formes depuis le fichier `.svg` vers ton HTML

Le navigateur lit les formes et les dessine directement — comme si tu lui donnais les instructions de dessin à la main.

---

## Principe

Coller le contenu du fichier `.svg` directement dans le HTML, à la place d'une balise `<img>`.  
Cela permet de contrôler la couleur, la taille et les animations entièrement en CSS.

---

## Structure de base

```html
<a href="mailto:toi@exemple.com" class="icone">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       width="32" height="32" aria-label="Envoyer un mail">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
</a>
```

**Attributs importants à conserver sur la balise `<svg>` :**

| Attribut | Rôle |
|---|---|
| `xmlns` | Obligatoire pour que le SVG soit valide en HTML |
| `viewBox` | Définit le système de coordonnées interne — ne pas modifier |
| `width` / `height` | Taille affichée (peut aussi être gérée en CSS) |
| `aria-label` | Accessibilité — décrit l'icône pour les lecteurs d'écran |

---

## Contrôler la couleur en CSS

Les SVG de ce projet utilisent `currentColor`.  
Cela signifie que la couleur de l'icône suit la propriété CSS `color` de son parent.

```css
.icone {
  color: #333;       /* couleur au repos */
}

.icone:hover {
  color: #0077ff;    /* couleur au survol */
}
```

Pas besoin de toucher au SVG lui-même — tout se gère depuis le CSS.

---

## Workflow pour un nouveau projet

1. Créer ou récupérer un fichier `.svg` (depuis ce projet, Heroicons, Lucide, etc.)
2. Ouvrir le fichier, copier tout le contenu de la balise `<svg>...</svg>`
3. Coller dans le HTML à l'endroit voulu
4. Ajouter `width`, `height` et `aria-label` sur la balise `<svg>`
5. Styliser via `color` en CSS sur le parent

---

## Ce qu'il ne faut pas faire

- Ne pas mettre `fill="black"` ou `stroke="#000"` en dur dans le SVG : ça écrase `currentColor`
- Ne pas supprimer le `viewBox` : l'icône se déformerait
- Ne pas oublier l'`aria-label` si l'icône n'a pas de texte visible à côté

---

## Ressources pour trouver des icônes SVG gratuites

- [Heroicons](https://heroicons.com) — style simple, outline ou solid
- [Lucide](https://lucide.dev) — fork de Feather Icons, très propre
- [Phosphor Icons](https://phosphoricons.com) — grande variété de styles
