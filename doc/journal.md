## Journal — 23 octobre 2026

### Migration des pages restantes

#### Réalisé

- **Les trois pages restantes migrent vers le design system** : `constellations-entreprises`, `comment-ca-se-passe` et `a-propos` reçoivent `class="page-home"` sur leur `<html>` pour activer les rôles `type-*`.
- **Rôles appliqués** : hero (H1 `type-page-title`, localisation `type-meta`, quote `type-lead`), titres de section `type-section-title`, textes `type-body`. Les boutons CTA d'entreprises pointent sur les classes du design system.
- **Migration de base** : cohérente, mais ces pages n'ont pas été peaufinées en détail comme constellations-familiales. Elles gagneront d'une relecture individuelle (comment-ca-se-passe a une sidebar par ancres et des sections numérotées propres à elle).

Validation : diagnostics sans erreur sur tout le site, `git diff --check` propre. Les cinq pages portent désormais `page-home`.

### Menu mobile remanié

#### Décisions retenues

- **Séparateurs retirés** (« Constellations », « Plus ») : la liste est courte, ils ne servaient plus.
- **Trois boutons de contact empilés** (Mail, Téléphone, WhatsApp) au lieu du seul bouton téléphone.
- **Lien « Prochaines dates (mobilizon.be) »** ajouté, avec une icône flèche sortante pour signaler qu'on quitte le site.
- **Boutons alignés sur le design system** : même forme, padding, rayon et couleurs que `.button--transparent` ; Mobilizon distingué sans bord. Le téléphone garde un style plein en desktop.

#### Réalisé

- **Panneau latéral droit** : le menu mobile ne descend plus du haut en plein écran ; il glisse depuis la droite sur ~360 px, pleine hauteur, avec le voile derrière. Plus net sur tablette, où le hamburger reste longtemps visible.
- **Espacement aéré** : plus de marge au-dessus et en dessous des liens de pages.
- **Desktop** : le menu horizontal ne montre que les liens et le bouton téléphone ; les contacts empilés et Mobilizon sont masqués. Le menu est centré sur le contenu.
- Le JavaScript n'a pas changé : il ne fait que basculer la classe `is-open`. Toute la transformation est dans le bloc CSS `.mobile-menu`.

Validation : diagnostics CSS/HTML sans erreur, `git diff --check` propre. Contrôle visuel mobile et desktop.

### Navigation et accessibilité (5.1)

#### Réalisé

- **Seuil du menu horizontal relevé de 768 px à 1100 px** : le contenu du menu mesure ~1109 px (menu 873 + logo 204 + gouttières), il débordait donc entre 768 et 1100 px. Le menu horizontal n'apparaît désormais qu'à partir de 1100 px, où il tient ; en dessous, le hamburger prend le relais. Vérifié à 1024, 1100 et 1200 px : plus de débordement.
- **Menu aligné sur le contenu sur grand écran** : le `<nav>` est un frère de `.site-header_inner`, il n'héritait pas de la contrainte de largeur et s'étalait sur tout l'écran. En desktop, il est désormais contraint à `max-width: 1024px`, centré et aligné à droite, face au logo dans le même cadre que le contenu. Le tiroir mobile est intact.
- **`aria-hidden` cohérent au chargement** : il était présent (`true`) alors que les liens étaient visibles sur desktop. Il est désormais initialisé selon la taille d'écran : `false` sur desktop, `true` en tiroir mobile fermé.
- **Seuil JS aligné** : `isDesktop()` passe de 768 à 1100 px, cohérent avec le seuil CSS.
- **Contrôle clavier** vérifié : ouverture/fermeture, Échap, trap focus et focus sur le premier lien fonctionnent avec le bon seuil ; les états `aria-expanded`/`aria-hidden` suivent correctement.
- Un menu hamburger soigné pour les écrans larges reste envisagé dans un deuxième temps.

Validation : diagnostics CSS/JavaScript sans erreur, `git diff --check` propre. Contrôles à 390, 1024, 1100, 1200, 1280 et 1920 px, menu ouvert et fermé.

### Page constellations-familiales : migration et peaufinage

#### Réalisé

- **`mobilizonParser.js` chargé** dans le `<head>` : il manquait, l'agenda était cassé (le loading restait bloqué). C'était la cause racine.
- **Sections migrées** : rôles `type-*` appliqués, `.card` sur les blocs concernés, pattern de section hérité de la Base, gap des sections rendu responsive (64 → 96 → 128 px selon la largeur).
- **Listes sobre** : « Tu te reconnais » et « À savoir » transformées en listes sans cartes, icônes 20 px en guise de puces. Nouveau composant partagé `.icon-list`.
- **Groupe à domicile** : titre sorti du cadre, `.card` appliqué, texte et lien alignés sur le design system.
- **CTA** : titre sorti du cadre foncé, boutons du design system avec variantes `.on-dark`, texte clair (contraste 10,65), boutons centrés.
- **Nettoyage** : règles de conteneur redondantes vidées (`.indiv-intro`, `.good-to-know`), styles morts retirés (`.indiv-intro_tarif*`), classes renommées (`indiv-pratique` → `good-to-know`).
- **Relecture UI-UX** desktop et mobile : hiérarchie claire, aucun débordement, contrastes suffisants. Restent du chantier en cours : placeholder d'image du hero vide, bouton Newsletter non fonctionnel, ordre des sections à valider.

Validation : diagnostics CSS/HTML sans erreur, `git diff --check` propre. 86 suppressions contre 36 ajouts : le design system a permis de retirer beaucoup de code dupliqué.

### Migration des pages : constellations-familiales

#### Décisions retenues

- **Méthode d'extension du scope** : la page rejoint le design system via `class="page-home"` sur son `<html>`, qui active les rôles `:where(.page-home)`. La page passe en mode chantier : erreurs et casse momentanées acceptées.
- **Section formules laissée en l'état** : elle sera refaite plus tard ; ses casses (titres 16 px, fond gray-50) ne sont pas corrigées.

#### Réalisé

- Rôles appliqués : H1 `type-page-title`, quote hero `type-lead`, titres de section `type-section-title`, corps `type-body`, méta `type-meta`.
- Citations des situations alignées sur l'italic gris (cohérent avec `type-lead`).
- Bloc « Comment ça se passe » adopté `.card` (fond, ombre, rayon unifiés), bordure orange retirée.
- Flex redondants des sections retirés (hérités de la règle Base).

Validation : diagnostics CSS/HTML sans erreur, `git diff --check` propre. Casse restante concentrée dans la section formules, volontairement reportée.

### Composants et structure (5.5, suite)

#### Réalisé

- **Composant `.card`** créé (catégorie 3) : fond, ombre, rayon unifié à 8 px et padding en un seul endroit. Appliqué aux services et « À propos » ; la bordure orange gauche des services est retirée.
- **Fallback d'agenda compact** : le CSS définissait `.group-agenda_placeholder` mais le HTML utilise `.group-agenda_fallback`, sans style — le SVG s'étirait en pleine largeur (bloc de 885 px de haut). Le style est créé pour la bonne classe : icône 32 px, texte sobre centré, hauteur réduite à 138 px. La classe morte `.group-agenda_placeholder` est supprimée.
- **Pattern de section factorisé** : règle en Base `.l-main-container > section:not(.page-hero)` applique `display: flex; flex-direction: column; gap` (écart titre/contenu via `--layout-section-content-gap`). Le hero est exclu (son propre pattern en deux colonnes). Les déclarations redondantes de `.services`, `.keys-info` et `.testimonials` sont retirées. Vérifié : sections en colonne 16 px, hero intact en grid (desktop) et colonne (mobile).

### Rôles typographiques (5.5)

#### Décisions retenues

- **Système de rôles `type-*`** défini : chaque rôle a une signature unique réutilisée partout. L'orange est réservé aux seules actions cliquables ; `type-meta` (ex-`type-label`) reste gris et discret.
- **`type-label` renommé `type-meta`** : le nom décrit le rôle (méta discrète), pas la balise. Valable aussi dans le menu mobile.
- **Nouveau rôle `type-subtitle`** : titre secondaire (H3 fort) distinct de `type-meta` (méta discret) et de `type-lead` (accroche italique).
- **Italique unifié** : `type-lead` (serif italic gris) pour la tagline hero et les citations ; la tagline « À propos » devient un corps gris simple, sans italique détourné.
- **Corps à 16 px foncé** : les descriptions passent de 14 px gris à 16 px foncé.
- **Police du corps** : sans-serif neutre `'Segoe UI', 'Helvetica Neue', Arial`, qui tranche nettement avec les titres Georgia. Titres Georgia inchangés.
- **Pattern titre/sous-titre** : H3 en `type-meta` (méta discret) suivi d'un `type-subtitle` (titre fort), identique dans les cartes services et « À propos ».

#### Réalisé

- Variable `--type-size-subtitle` et classe `type-subtitle` ajoutées dans `css/new_style.css`.
- `type-label` renommé `type-meta` dans le CSS, le HTML (6 occurrences) et `JS/script.js`.
- Réassignations : titres de cartes et « Bonjour, je m'appelle Renaud » en `type-subtitle` ; type de service en `type-meta` gris (orange retiré) ; citations et tagline hero en `type-lead` ; descriptions en 16 px foncé.
- `--font-family-text` passé à la pile sans-serif neutre dans `css/variables.css`.
- Espacements titre/sous-titre augmentés (cartes services 8→12 px, intro « À propos » 4→8 px).
- Suppression de « Watermael-Boitsfort » du hero (utilisait encore l'ancien label).

Validation : diagnostics CSS/HTML/JavaScript sans erreur, cinq tests du parseur réussis, `git diff --check` propre. Contrôle visuel : hiérarchie nette et cohérente entre sections.

### Contraste et lisibilité (5.2)

#### Décisions retenues

- **Texte discret assombri** : `--color-text-muted` passe de `gray-600` à `gray-700`. Une seule variable, tout le texte atténué de la page est corrigé.
- **Fond « À propos » harmonisé** : `.about-me` passe de `--color-bg-elevated` (`gray-50`, presque blanc) à `--color-bg-surface` (`gray-100`), le même fond que les autres cartes. La variable partagée `bg-elevated` n'est pas touchée (utilisée ailleurs).
- Les couleurs restent stockées dans `variables.css` : primitives en haut, alias sémantiques en bas. Aucune nouvelle couleur ajoutée, on ne réassigne que des rôles.

#### Réalisé

- Une ligne dans `css/variables.css` (`--color-text-muted`), une ligne dans `css/new_style.css` (fond de `.about-me`).
- Contrastes mesurés au navigateur avant / après :

| Élément | Avant | Après |
|---|---|---|
| Titres de section, tagline hero, auteur témoignage | 3,07 | 4,85 |
| Descriptions de services, texte muted | 3,55 | 5,60 |
| Texte « À propos » | 4,14 | 5,60 |

- Tous dépassent désormais l'objectif 4,5:1. La quote du hero (`page-hero_tagline`) bénéficie du même assombrissement.

Validation : diagnostics CSS sans erreur, `git diff --check` propre. Attention : le navigateur de test garde `variables.css` en cache, un rechargement forcé est nécessaire pour voir le changement.

### Agenda (5.4)

#### Décisions retenues

- **Adresse complète conservée** sur le site : elle reste visible sans devoir aller sur Mobilizon. Pas d'extraction partielle du lieu depuis le flux ICS, le parseur n'est pas modifié.
- **Hiérarchie de l'événement** : le titre de l'atelier est désormais l'information marquante, l'adresse devient discrète.
- **Lien dans le titre seul** : la destination « détails et inscription sur Mobilizon » reste annoncée par le titre, sans libellé supplémentaire.

#### Réalisé

- Inversion des rôles titre / adresse dans `JS/script.js`. Le titre reçoit le style gras en majuscules et la couleur primaire forte ; l'adresse reçoit le corps en gris atténué.
- Le lien du titre (`agenda-title`) garde son soulignement fin au repos, plus marqué au survol, désormais assorti à sa couleur primaire ; le focus clavier reste visible.
- Structure de chaque événement passée en grille à deux colonnes : date et horaire alignés à gauche, titre et adresse alignés à droite. Colonne de gauche à `max-content`, droite à `1fr`, alignement par ligne de base. Remplace les anciennes lignes flex `agenda-primary`/`agenda-secondary`.
- Aucun cadre ni bordure ajouté aux événements ; espacement interne resserré, les 48 px entre événements sont conservés.
- Aucune touche au parseur ICS ni au contenu. L'agenda se comporte pareil sur l'accueil et la page Groupes.

Validation : diagnostics CSS/JavaScript sans erreur, cinq tests du parseur réussis, `git diff --check` propre. Contrôle visuel à 390, 768 et 1024 px : la grille tient sans débordement. Le flux Mobilizon est bloqué par CORS en local ; la vérification s'est faite avec un contenu de test fixe.

## Journal — 14 octobre 2026

### Avancement au 14 octobre 2026

- Rapatriement effectué dans `new_style.css`, dans l'ordre historique : `style.css`, `pages.css`, `desktop.css`, puis les ajustements de l'accueil.
- Les sept pages chargent désormais `variables.css` et `new_style.css`. Les trois anciennes feuilles ont été supprimées après vérification de l'absence de références dans le site.
- Les ajustements auparavant réservés à l'accueil restent limités à cette page grâce à la classe `page-home` sur son élément `html`. Le préfixe `:where(.page-home)` n'ajoute aucune spécificité aux sélecteurs existants.
- Vérification de la conservation des déclarations et comparaison des styles calculés sur les sept pages à 390, 768 et 1440 px : aucun écart après stabilisation du chargement des événements.
- Classement global effectué dans les catégories 0 à 6 : les blocs de provenance et la zone « à ranger » sont remplacés par des sous-sections par composant ou par page, avec leurs media queries à proximité.
- Les états propres aux composants restent avec eux ; la catégorie 4 est réservée et vide pour le moment. Les variables primitives restent dans `variables.css`.
- Les 371 règles sont conservées avec leurs sélecteurs, déclarations et conditions responsive inchangés. Les doublons et les surcharges sont volontairement conservés ; leur simplification fera l'objet d'une étape distincte.
- Validation du classement : 70 comparaisons de styles calculés sur les sept pages à 390, 768, 960, 1024 et 1440 px, menu ouvert et fermé, sans écart. Le contenu de l'agenda est fixé dans le navigateur de test pour éviter les variations du chargement externe.

### Réalisé

- Simplification des règles typographiques partagées : les éléments d'agenda reçoivent les classes `type-*` adaptées, tandis que leurs classes de rôle conservent les styles propres au composant.
- Réagencement de `css/new_style.css` : la section « Typographie - sans couleurs » contient les variables, classes et adaptations responsive typographiques ; les règles de mise en page et de composants sont rangées sous « Le reste pour l'instant ».
- Ajout de quatre utilitaires de couleur de texte dans `css/new_style.css` : texte par défaut, atténué, primaire (`--color-primary-600`) et primaire renforcé (`--color-primary-700`).
- Les couleurs des cartes de services, des informations pratiques et de l'agenda ont été déplacées vers ces classes ; elles sont appliquées au HTML de l'accueil et aux éléments Mobilizon générés par JavaScript.
- Les couleurs de survol restent définies avec les composants. La couleur de `.page-hero_location` reste dans la feuille partagée, car cette classe est utilisée par plusieurs pages intérieures.
- La section témoignages adopte une structure dédiée (`.testimonial`, `.testimonial_quote-wrapper`, `.testimonial_quote`, `.testimonial_author`). Le style de citation a été extrait dans `css/new_style.css` et reste distinct de `.page-hero_quote` ; un espacement supérieur est ajouté avant l'auteur. Les citations présentes restent des contenus de maquette.

Validation : diagnostics CSS/HTML/JavaScript sans erreur. `git diff --check` signale une ligne vide finale dans `css/new_style.css`. Aucun contrôle visuel navigateur n'a été effectué.

## Journal — 13 octobre 2026

### Réalisé

- Une feuille temporaire `css/new_style.css` définit un système typographique pour le header, le hero, les fiches Services, « En pratique » et l'agenda. Elle réutilise les variables de `css/variables.css` via des alias sémantiques et ne redéfinit pas les couleurs.
- La feuille est chargée uniquement par `index.html` ; des classes de rôle typographique (`type-page-title`, `type-section-title`, `type-item-title`, `type-body`, `type-label`, `type-action`, etc.) ont été ajoutées au HTML sans changer son contenu ni sa hiérarchie.
- Des alias d'espacement nomment les gouttières, les écarts entre sections et dans les galeries, ainsi que les espacements internes des cartes. Les deux galeries partagent le même écart ; les espacements responsive et les paddings propres aux cartes sont conservés autant que possible.
- Les espaces entre les éléments du hero et entre les titres de section et leur contenu sont harmonisés. La mise en page flex de « Services » et « En pratique » reste définie dans `css/style.css` ; la feuille temporaire ne la redéfinit pas.
- L'agenda garde ses classes techniques générées par JavaScript. Les événements sont espacés de 48 px et la liste a une marge verticale de 32 px. Le titre d'événement reste un lien Mobilizon, avec la même couleur que son texte, un soulignement fin au repos et plus marqué au survol ; son focus clavier est visible.
- Aucun JavaScript n'a été modifié.

Validation : diagnostics CSS/HTML sans erreur, `git diff --check` propre. Le contrôle navigateur à 390 px et 1280 px ne montre pas de débordement horizontal ; les galeries ont le même espacement aux deux tailles. Le lien d'événement a été vérifié au repos et au survol.

## Journal — 12 octobre 2026

### Décisions retenues

- Le hero annonce clairement les constellations familiales et d'entreprise à Bruxelles ; la phrase d'approche reste secondaire.
- Le premier choix est familial ou entreprise. Les formats individuel/groupe se découvrent sur les pages dédiées ; les dates de groupe constituent un parcours séparé sur l'accueil.

### Réalisé

- Le hero a été harmonisé avec les pages intérieures, avec deux liens doux vers les offres. Ils ne s'affichent que lorsque le hero est en deux colonnes.
- Le responsive garde le hero en une colonne jusqu'à 959 px, avec une image au ratio maîtrisé ; l'affichage en deux colonnes commence à 960 px.
- Les titres qui ouvrent les sections partagent maintenant la classe `.section-title` à 20 px sur les sept pages. Les anciens petits libellés de l'accueil sont de vrais `h2` ; les titres de cartes gardent leur style distinct.
- Les choix validés et les changements réalisés ont été reportés dans ce document pour guider la suite du travail.

### À valider

- Déplacer le bloc « En pratique » vers les pages des offres, en gardant sur l'accueil la localisation et les dates de groupe.
- Masquer les faux témoignages sur le site publié jusqu'à disposer de témoignages réels et autorisés.
