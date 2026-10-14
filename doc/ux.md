# UX de la page d'accueil

Ce document conserve les décisions UX et les points à travailler pour l'accueil, qui servira de modèle aux autres pages. Une décision ne signifie pas que sa mise en œuvre est terminée ; les pistes restent à valider avant toute modification du site.

## 1. Objectif

Une personne qui découvre le site doit comprendre rapidement **quelle activité est proposée, où elle se déroule et quel chemin suivre ensuite** : découvrir une offre, consulter les dates ou prendre contact.

## 2. Décisions validées

- **Information principale** : « Constellations familiales et d'entreprises à Bruxelles ». La phrase poétique est secondaire et peut être retirée si elle ajoute du bruit.
- **Premier choix** : familial ou entreprise, avec deux accès distincts dès le premier écran. Ne pas proposer individuel/groupe comme choix sur l'accueil ; les formats se découvrent sur les pages dédiées, selon les offres réellement disponibles.
- **Témoignages** : garder les textes fictifs pour travailler la maquette, puis les masquer sur le site publié tant qu'il n'y a pas de citations réelles, exactes et autorisées.

## 3. Parcours de référence

- Les deux domaines mènent à leurs pages détaillées, avec des liens qui annoncent clairement leur destination.
- Les prochaines dates de groupe constituent un accès distinct, sans concurrencer le choix familial/entreprise. Chaque événement mène à sa fiche Mobilizon ; un lien de secours reste disponible.
- Une brève présentation de Renaud et un lien vers « À propos » permettent de mieux connaître l'accompagnant.
- Le contact reste facile à trouver dans la navigation, l'interface mobile et le pied de page, sans devenir un passage obligatoire pour obtenir des informations publiables.

La position de la présentation personnelle et la répartition des informations pratiques restent à décider.

## 4. Questions encore ouvertes

- **Informations pratiques** : confirmer le retrait du bloc générique « En pratique » et le déplacement des prix, durées et modalités vers les pages des offres. Garder la localisation générale et les dates sur l'accueil. Vérifier que chaque information reste accessible, y compris la possibilité « Chez vous », qui n'est pas un simple doublon.
- **Présentation de Renaud** : avant ou après les dates ?
- **Contact** : quels canaux privilégier parmi téléphone, courriel, Signal et WhatsApp ?
- **Témoignages réels** : des citations autorisées sont-elles disponibles ? Sinon, masquer la section à la publication ; un éventuel contenu de remplacement reste à discuter.

## 5. Priorités de mise en page

1. **Clarifier la hiérarchie** : distinguer message principal, sections et détails. Réserver les cartes aux contenus qui bénéficient d'une séparation ou d'une comparaison ; alléger les sections éditoriales.
2. **Harmoniser les titres et les espaces** : un H1 pour la page, des H2 pour les sections et des H3 pour les sous-niveaux utiles. Réutiliser les styles communs et garder des distances cohérentes entre sections, titres et contenus.
3. **Éviter les répétitions inutiles** : chaque bloc doit avoir un rôle clair. Ne conserver un résumé pratique sur l'accueil que s'il aide réellement à choisir, sans recréer une série de cartes.
4. **Relire sur mobile et ordinateur** : vérifier la visibilité des deux accès, la lecture des dates et des titres longs, les liens et les moyens de contact avant d'étendre les conventions aux autres pages.

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

> **Remarque de migration :** l'ordre CSS actuel fait partie du comportement. Le rapatriement précède le tri ; le déplacement des règles et de leurs media queries doit préserver la cascade. Le bloc temporaire « à ranger » disparaîtra une fois le classement terminé. Cette organisation ne valide aucune nouvelle décision de contenu ou de design.

### Avancement au 14 octobre 2026

- Rapatriement effectué dans `new_style.css`, dans l'ordre historique : `style.css`, `pages.css`, `desktop.css`, puis les ajustements de l'accueil.
- Les sept pages chargent désormais `variables.css` et `new_style.css`. Les trois anciennes feuilles ont été supprimées après vérification de l'absence de références dans le site.
- Les ajustements auparavant réservés à l'accueil restent limités à cette page grâce à la classe `page-home` sur son élément `html`. Le préfixe `:where(.page-home)` n'ajoute aucune spécificité aux sélecteurs existants.
- Vérification de la conservation des déclarations et comparaison des styles calculés sur les sept pages à 390, 768 et 1440 px : aucun écart après stabilisation du chargement des événements.
- Classement global effectué dans les catégories 0 à 6 : les blocs de provenance et la zone « à ranger » sont remplacés par des sous-sections par composant ou par page, avec leurs media queries à proximité.
- Les états propres aux composants restent avec eux ; la catégorie 4 est réservée et vide pour le moment. Les variables primitives restent dans `variables.css`.
- Les 371 règles sont conservées avec leurs sélecteurs, déclarations et conditions responsive inchangés. Les doublons et les surcharges sont volontairement conservés ; leur simplification fera l'objet d'une étape distincte.
- Validation du classement : 70 comparaisons de styles calculés sur les sept pages à 390, 768, 960, 1024 et 1440 px, menu ouvert et fermé, sans écart. Le contenu de l'agenda est fixé dans le navigateur de test pour éviter les variations du chargement externe.
