## Journal — 23 octobre 2026

### Décisions retenues

- **Adresse complète conservée** sur le site : elle reste visible sans devoir aller sur Mobilizon. Pas d'extraction partielle du lieu depuis le flux ICS, le parseur n'est pas modifié.
- **Hiérarchie de l'événement** : le titre de l'atelier est désormais l'information marquante, l'adresse devient discrète.
- **Lien dans le titre seul** : la destination « détails et inscription sur Mobilizon » reste annoncée par le titre, sans libellé supplémentaire.

### Réalisé

- Inversion des rôles titre / adresse dans `JS/script.js`. Le titre reçoit le style `type-label` (majuscules, gras) et la couleur primaire forte ; l'adresse reçoit `type-body` en gris atténué.
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
