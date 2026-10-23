# UX de la page d'accueil

Ce document conserve les décisions UX et les points à travailler pour l'accueil, qui servira de modèle aux autres pages. Une décision ne signifie pas que sa mise en œuvre est terminée ; les pistes restent à valider avant toute modification du site.

## 1. Objectif

Une personne qui découvre le site doit comprendre rapidement **quelle activité est proposée, où elle se déroule et quel chemin suivre ensuite** : découvrir une offre, consulter les dates ou prendre contact.

## 2. Décisions validées

- **Information principale** : « Constellations familiales et d'entreprises à Bruxelles ». La phrase poétique est secondaire et peut être retirée si elle ajoute du bruit.
- **Premier choix** : familial ou entreprise. Sur grand écran, le hero propose deux accès distincts ; sur les supports plus petits, ses CTA sont volontairement masqués pour alléger la page, car les deux offres et leurs liens apparaissent juste après. Ce masquage n'est pas un défaut à corriger.
- **Informations pratiques** : les formats, prix, durées et modalités sont rattachés aux pages Constellations familiales et Constellations d'entreprises. Ne pas réintroduire de bloc « En pratique » sur l'accueil ; y conserver la localisation générale et l'agenda de groupe.
- **Témoignages** : garder les textes fictifs pour travailler la maquette, puis les masquer sur le site publié tant qu'il n'y a pas de citations réelles, exactes et autorisées.

## 3. Parcours de référence

- Les deux domaines mènent à leurs pages détaillées, avec des liens qui annoncent clairement leur destination.
- Les prochaines dates de groupe constituent un accès distinct, sans concurrencer le choix familial/entreprise. Chaque événement mène à sa fiche Mobilizon ; un lien de secours reste disponible.
- Une brève présentation de Renaud et un lien vers « À propos » permettent de mieux connaître l'accompagnant.
- Le contact reste facile à trouver dans la navigation, l'interface mobile et le pied de page, sans devenir un passage obligatoire pour obtenir des informations publiables.

**Évolution envisagée, pas encore décidée** : les pages Individuel et Groupes pourraient disparaître au profit des deux pages de domaines. Leurs informations utiles, notamment l'option « Chez vous », devront alors être conservées et leurs liens réorientés. Ne pas supprimer ces pages dans le cadre du peaufinage de l'accueil.

La position de la présentation personnelle reste à décider.

## 4. Questions encore ouvertes

- **Textes des offres** : comment expliquer brièvement l'accompagnement avec des mots concrets, sans alourdir l'accueil ni promettre un résultat ? Les formulations proposées devront être validées.
- **Agenda** : quel libellé rend le passage vers les détails et l'inscription Mobilizon le plus clair ?
- **Présentation de Renaud** : avant ou après les dates ?
- **Contact** : quels canaux privilégier parmi téléphone, courriel, Signal et WhatsApp ?
- **Témoignages réels** : des citations autorisées sont-elles disponibles ? Sinon, masquer la section à la publication ; un éventuel contenu de remplacement reste à discuter.

## 5. Points prioritaires pour peaufiner l'accueil

Synthèse croisée avec [l'analyse UI-UX du 14 octobre](analyse%20ux-ui-14oct.md). Les mesures ci-dessous proviennent de cette relecture, avant la réorganisation du CSS ; elles ne constituent pas une nouvelle vérification de l'état actuel. Les recommandations de remettre des informations pratiques sur l'accueil ou de réafficher les CTA du hero sur petit écran ne sont pas retenues, conformément aux décisions ci-dessus.

### 5.1 Navigation et accessibilité - fait!

- **Seuil du menu horizontal relevé à 1100 px** : le menu n'apparaît en horizontal que là où il tient (~1109 px de contenu) ; le hamburger prend le relais en dessous. Plus de débordement à 768 et 1024 px.
- **Menu aligné sur le contenu** sur grand écran : contraint à `max-width: 1024px`, centré, face au logo dans le même cadre que le contenu.
- **`aria-hidden` cohérent au chargement** : initialisé selon la taille d'écran (`false` sur desktop, `true` en tiroir fermé) ; le seuil JS `isDesktop()` est aligné à 1100 px.
- **Contrôle clavier** vérifié : ouverture/fermeture, Échap, trap focus et focus sur le premier lien fonctionnent ; `aria-expanded`/`aria-hidden` suivent correctement.

### 5.2 Contraste et lisibilité - fait!

- **Texte discret assombri** : `--color-text-muted` passe de `gray-600` à `gray-700`. Les titres de section, tagline hero, descriptions de services, lieu et auteur de témoignage passent de 3,07-3,55:1 à 4,85-5,60:1, au-dessus de l'objectif 4,5:1. Une seule variable, tout le texte atténué est corrigé.
- **Fond « À propos » harmonisé** : `.about-me` adopte `--color-bg-surface` (`gray-100`), comme les autres cartes, au lieu de `gray-50` qui attirait trop l'œil.
- **Stockage des couleurs** : dans `variables.css`, primitives en haut et alias sémantiques en bas ; on réassigne des rôles sans ajouter de nouvelle teinte.
- Les descriptions à 14 px pourraient passer à 16 px : proposition à tester selon la densité et la lisibilité, pas une décision acquise.

### 5.3 Compréhension des offres

- Rendre les descriptions plus concrètes pour une personne qui ne connaît pas les constellations ; éviter de s'appuyer uniquement sur « dynamiques cachées » ou « tensions systémiques ».
- Raccourcir et équilibrer les titres des deux offres : celui des entreprises était nettement plus long.
- Revoir la portée de « Soigner les blessures émotionnelles », qui exprime une promesse forte ; envisager une formulation centrée sur l'accompagnement ou l'exploration, à valider.
- Garder les deux liens d'offres faciles à repérer après le hero sur petit écran, sans réintroduire les CTA masqués ni les choix individuel/groupe.

### 5.4 Agenda et accès à l'inscription - fait!

- **Hiérarchie validée** : le titre de l'atelier est l'information marquante (style gras en majuscules, couleur primaire forte), l'adresse est discrète (texte simple gris). Chaque événement est une grille à deux colonnes : date et horaire alignés à gauche, titre et adresse alignés à droite.
- **Adresse complète conservée** sur le site, sans extraction partielle du flux ICS ; le parseur n'est pas modifié. Le lieu reste discret par son style, pas par un raccourcissement.
- **Lien dans le titre seul** : il annonce la fiche Mobilizon (détails et inscription), sans libellé supplémentaire ; son soulignement reste repérable. Le bouton transparent vers l'ensemble des événements demeure une action secondaire.
- Aucun cadre ni bordure autour des événements ; l'espacement interne est resserré.

### 5.5 Hiérarchie, rythme et confiance - fait!

- Distinguer message principal, sections et détails ; limiter les fonds, bordures et ombres qui donnent le même poids à tous les blocs.
- Harmoniser les espaces entre sections, titres et contenus. Garder un H1 pour la page, des H2 pour les sections et des H3 pour les sous-niveaux utiles, avec les styles communs.
- Conserver la simplicité des citations et tester des longueurs raisonnables sur mobile, sans ajouter de cartes décoratives.
- Évaluer la place de la présentation de Renaud et le poids de son fond presque blanc, qui attirait fortement l'œil. Son déplacement reste une proposition, pas une décision.
- Préserver les points d'appui : photo réelle, typographie à empattements, boutons transparents et barre de contact mobile. Pas de refonte générale nécessaire.

**Ordre de travail proposé** : navigation et accessibilité, contraste, textes et agenda, puis ajustements de rythme. Valider chaque point avant de l'appliquer et avant d'étendre les conventions aux autres pages.

## 6. Critères de validation

- **Compréhension et parcours** : activité, public et lieu identifiables ; liens explicites vers les offres, les dates et le contact.
- **Lisibilité** : hiérarchie nette, contrastes suffisants, espacements réguliers et regroupements compréhensibles.
- **Information et confiance** : faits exacts et à jour, promesses sans exagération, détails pratiques disponibles sans devoir contacter Renaud ; aucun témoignage fictif publié comme preuve réelle.
- **Accessibilité et responsive** : titres logiques, textes alternatifs utiles, navigation au clavier et actions faciles à toucher ; aucun contenu coupé ou débordant sur petit ou grand écran.
- **Simplicité et cohérence** : HTML/CSS/JavaScript vanilla compréhensible, styles partagés entre pages, aucune dépendance ou complexité sans bénéfice concret.

Cette base de travail ne remplace pas des tests auprès de visiteurs ni un audit complet d'accessibilité. Les propositions de contenu doivent être validées avant leur application.

## 7. Organisation du CSS

### Étapes retenues

1. Rapatrier les styles de `style.css`, `pages.css` et `desktop.css` dans `new_style.css`, en préservant leur ordre de cascade et le rendu actuel.
2. Classer les règles dans les catégories ci-dessous, puis résoudre les doublons sans modifier involontairement le rendu.
3. Continuer à définir le design system, en s'appuyant sur les décisions UX validées dans ce document.
4. En fin de projet, séparer éventuellement les styles en fichiers par catégorie si cela facilite leur maintenance.

### Catégories retenues

| Nº | Catégorie | Rôle |
|---|---|---|
| 0 | Variables | Valeurs partagées, en distinguant les primitives (échelles, palettes) et les variables sémantiques (rôles typographiques, couleurs d'usage, rythme). |
| 1 | Base | Styles par défaut des éléments HTML : corps de page, titres, paragraphes, liens ; sans classe de composant. |
| 2 | Structure / Layout | Ossature générale : conteneur principal, largeur du site, placement de l'en-tête et du pied de page. |
| 3 | Composants / Modules | Ensembles autonomes et réutilisables : boutons, navigation, cartes, témoignages, agenda, hero partagé ; styles typographiques `.type-*`. |
| 4 | États | États transversaux : ouvert, actif, masqué, chargement. Les états propres à un composant restent avec celui-ci. |
| 5 | Pages | Compositions et exceptions réellement propres à une page, classées par page puis par section. |
| 6 | Utilitaires | Classes à responsabilité unique et explicite, préfixées `.u-*` : couleur de texte, alignement, masquage accessible, etc. |

### Repères de classement

- Une règle flex ou grid n'appartient pas automatiquement au layout : la structure interne d'un composant reste avec celui-ci.
- Un composant peut être réutilisable même s'il n'est présent que sur une page aujourd'hui.
- Les variantes, les états propres à un composant (par exemple `.mobile-menu.is-open`), les `:hover` et les `:focus-visible` restent près de ses règles.
- Le responsive n'est pas une catégorie : les media queries seront placées près des règles concernées, en conservant une approche mobile-first.
- La catégorie Pages ne sert pas de rangement par défaut pour les règles encore non classées.

### Système de rôles typographiques

Référence pour la refonte des autres pages. Chaque rôle `type-*` a une signature unique ; les classes utilitaires `u-text-*` fixent la couleur. La couleur **orange est réservée aux seules actions cliquables** ; tout le reste est foncé ou gris.

| Rôle | Classe | Signature | Usage |
|---|---|---|---|
| Titre de page | `type-page-title` | serif 3xl regular foncé | H1 |
| Titre de section | `type-section-title` | serif xl regular **gris** | H2 de section |
| Sous-titre | `type-subtitle` | serif xl medium foncé | H3 fort, titre de carte, « Bonjour... » |
| Titre d'item | `type-item-title` | serif lg medium foncé | date d'agenda |
| Méta discret | `type-meta` | sans xs semibold MAJ **gris** | méta, label, catégorie, séparateur |
| Accroche italique | `type-lead` | serif lg italic **gris** | tagline hero, citations |
| Corps | `type-body` | sans 16 regular foncé | descriptions, paragraphes |
| Action | `type-action` | sans sm semibold **orange** | liens « → », CTA |

**Patterns retenus :**

- **Titre de carte** : H3 en `type-meta` (méta discret) suivi d'un `type-subtitle` (titre fort). Identique dans les cartes services et « À propos ».
- **Polices** : titres en Georgia (serif), corps en sans-serif neutre `'Segoe UI', 'Helvetica Neue', Arial`. Définies par `--font-family-header` et `--font-family-text` dans `variables.css`.

### Composant carte

Bloc réutilisable `.card` (catégorie 3, Composants) qui porte le socle commun des cartes : fond, ombre, rayon et padding unifiés.

```css
.card {
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-4);
  box-shadow: var(--shadow-1);
  padding: var(--space-5);
}
```

- **Usage** : la classe `.card` se combine avec la classe propre au composant (`.services_item`, `.about-me`…), qui ne garde que son contenu interne (flex, écarts, variantes).
- **Rayon unifié** à `radius-4` (8 px) sur toutes les cartes ; la bordure orange gauche des services est retirée.
- Les changements de fond, d'ombre ou de rayon des cartes se font désormais **à un seul endroit**.

### Composant liste à icônes

Bloc réutilisable `.icon-list` (catégorie 3) : liste sobre dont chaque item est précédé d'une icône en guise de puce.

```css
.icon-list { /* liste verticale, léger retrait à gauche */ }
.icon-list_item { /* icône + texte alignés, icône 20 px orange */ }
```

- **Usage** : `icon-list` sur le `ul`, `icon-list_item` sur chaque `li` contenant un `<svg>` suivi du texte.
- Partagé par les sections « Tu te reconnais » (citations en `type-lead`) et « À savoir » (texte normal). Le texte garde son propre rôle selon le contexte.
- **Variante `.icon-list--dots`** : remplace les icônes SVG par de simples puces rondes (via `::before`), pour les listes sans icône dédiée — par exemple les remerciements de la page À propos.

### Boutons sur fond foncé

Les boutons du design system ont des variantes pour les fonds foncés via la classe de contexte `.on-dark` sur le conteneur.

- `.on-dark .button--primary` : fond orange plein, texte clair.
- `.on-dark .button--transparent` : transparent, bordure et texte clairs.
- Même forme et police que les boutons standards ; seules les couleurs changent. Utilisé par le CTA à fond foncé.

### Pattern de section

Toutes les sections de contenu partagent la même ossature : colonne verticale avec un écart entre le titre et le contenu. Ce socle est défini **une seule fois en Base** :

```css
.l-main-container > section:not(.page-hero) {
  display: flex;
  flex-direction: column;
  gap: var(--layout-section-content-gap, var(--space-4));
}
```

- **Ne pas répéter** `display: flex; flex-direction: column; gap` sur chaque section : c'est hérité de cette règle.
- Le hero est exclu (`.page-hero`) car il a son propre pattern (deux colonnes sur grand écran).
- L'écart titre/contenu reste pilotable via la variable sémantique `--layout-section-content-gap`.

### Menu mobile : panneau latéral

Le menu mobile est un **panneau qui glisse depuis la droite** (et non plus une nappe plein écran). Sa structure, pour t'y retrouver en cas de pépin :

- **HTML** : un `<nav class="mobile-menu">` contient la liste des liens, puis un bloc `.mobile-menu_cta` avec le téléphone, les contacts empilés (`.mobile-menu_contacts`) et le lien Mobilizon (`.mobile-menu_btn--external`).
- **CSS** : tout est dans le bloc `.mobile-menu` (catégorie 3). Le panneau est `position: fixed` à droite, largeur ~360 px, et glisse via `transform: translateX(...)` entre les états fermé et `.is-open`.
- **JS** : ne fait que basculer la classe `is-open` (plus Échap et trap focus). Aucun changement à y faire pour ajuster l'apparence.
- **Pour ajuster** la largeur, l'animation ou les espacements : modifier uniquement le bloc `.mobile-menu` / `.mobile-menu.is-open` dans le CSS. Rien d'autre ne dépend de ces valeurs.

> **Remarque de migration :** l'ordre CSS actuel fait partie du comportement. Le rapatriement précède le tri ; le déplacement des règles et de leurs media queries doit préserver la cascade. Le bloc temporaire « à ranger » disparaîtra une fois le classement terminé. Cette organisation ne valide aucune nouvelle décision de contenu ou de design.


