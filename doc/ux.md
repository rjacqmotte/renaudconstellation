# UX de la page d'accueil

Ce document sert de base de travail pour améliorer la page d'accueil, puis guider la cohérence des autres pages. Il distingue les constats observables des propositions à discuter. Aucune proposition ci-dessous ne vaut décision de contenu sans validation.

## Journal — 14 octobre 2026

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

## 1. Objectifs de la page

La page doit permettre à une personne qui découvre l'activité de comprendre rapidement :

- ce que sont les accompagnements proposés et à qui ils s'adressent ;
- les formats disponibles, les prochaines dates et les informations pratiques utiles ;
- qui accompagne la personne et comment prendre contact ou poursuivre sa recherche.

Le parcours actuel présente le portrait et la promesse, les deux activités, des informations pratiques, les dates de groupe, des témoignages, puis une courte présentation de Renaud. Les contacts sont également accessibles dans la navigation mobile, une barre de contact mobile et le pied de page.

## 2. Analyse de la page actuelle

### Points d'appui

- La page donne rapidement le nom, la localisation générale et les deux domaines d'activité.
- Les deux offres principales ont chacune un texte et un lien vers une page détaillée.
- Les prochaines dates sont intégrées à la page et un lien Mobilizon sert de solution de repli.
- Le portrait et le texte « Depuis 2008 » apportent un début de présentation personnelle.
- Les informations de lieu, de durée et de prix sont visibles sans devoir ouvrir une autre page.

### Problèmes et risques UX

1. **La hiérarchie visuelle est concurrencée par l'accumulation de cadres.** Les offres, quatre informations pratiques, les témoignages et la présentation personnelle utilisent des fonds, bordures, ombres ou cartes. Les éléments n'ont donc pas tous le même poids fonctionnel, mais leur traitement se ressemble. Les cartes d'événements ajoutent encore des blocs à cette série.
2. **Certaines informations sont répétées.** Les formats individuel et groupe apparaissent dans les offres ou leurs liens, puis à nouveau dans « En pratique ». La répétition peut être utile pour les prix et durées, mais la page ne rend pas toujours cette différence de rôle évidente. L'option « Chez vous » apporte une information distincte et ne doit pas être supprimée par simple dédoublonnage.
3. **Le parcours du premier écran est incomplet.** Le titre annonce les deux domaines, mais le seul appel à l'action mène aux constellations familiales. Une personne intéressée par les constellations d'entreprise n'a donc pas de lien direct depuis le hero. Les dates de groupe constituent un parcours distinct plus bas sur la page ; les formats individuel et groupe ne sont pas des choix à proposer dans le hero.
4. **Le style des titres de section était inégal.** Les libellés de l'accueil étaient des paragraphes décoratifs, tandis que les pages intérieures utilisaient des titres de niveau 2 de tailles différentes. Une classe commune `.section-title` harmonise maintenant les titres de section à 20 px ; les trois libellés de l'accueil sont des `h2` sémantiques.
5. **L'espacement entre titres et contenus reste à surveiller.** La ligne décorative des anciens libellés a été retirée ; les espaces dépendent maintenant de la mise en page de chaque section. Vérifier leur cohérence lors de la prochaine relecture visuelle.
6. **Les témoignages visibles sont des textes fictifs de maquette.** Ils peuvent rester visibles dans la version de travail pour régler la mise en page. Le risque apparaît seulement s'ils sont publiés comme des paroles de clients : avant publication, cette section devra être masquée jusqu'à disposer de témoignages réels, autorisés et exacts.
7. **Le contact est disponible par de nombreux canaux, mais répété.** Téléphone, courriel, Signal et WhatsApp sont proposés dans plusieurs zones. Cette disponibilité est pratique, surtout sur mobile, mais le choix entre quatre canaux peut concurrencer l'action principale.
8. **Les sections principales ne sont pas toutes identifiables comme telles dans la structure HTML.** Plusieurs utilisent un paragraphe stylé à la place d'un titre de section. Les niveaux de titres devraient exprimer la structure du contenu, pas seulement son apparence.

## 3. Améliorations proposées

### Priorité 1 — fiabilité et compréhension

- Conserver les témoignages fictifs dans la version de travail comme repères de mise en page, puis masquer la section dans la version publiée jusqu'à disposer de citations réelles dont l'usage est autorisé.
- Nommer clairement le service et sa localisation dans le titre principal : constellations familiales et d'entreprise à Bruxelles. La formule d'approche peut rester secondaire ou être retirée si elle détourne l'attention.
- Faire du choix du domaine le parcours principal du hero : proposer deux accès distincts, vers les constellations familiales et les constellations d'entreprise. Les formats se découvrent ensuite sur les pages correspondantes ; les prochaines dates de groupe restent un parcours distinct sur l'accueil. Le contact reste accessible, mais secondaire.
- **Réalisé :** donner une vraie structure de titres aux grandes sections, avec un ordre cohérent : un H1 pour la page, des H2 pour les sections principales, puis des H3 si un sous-niveau est nécessaire. Les titres des cartes restent distincts.

### Priorité 2 — réduire la confusion visuelle

- Réserver le style de carte aux éléments qui bénéficient réellement d'une séparation, par exemple les événements à comparer. Présenter les sections éditoriales avec une mise en page plus ouverte et moins de fonds, ombres et bordures.
- Clarifier le rôle de « En pratique » : ne garder à cet endroit que les faits pratiques qui ne sont pas déjà clairement visibles ailleurs. Regrouper les prix, durées, lieux et modalités dans un format compact plutôt que quatre cartes de même importance.
- Définir un espacement commun entre le titre d'une section et son contenu, ainsi qu'entre les sections. La ligne décorative ne doit pas remplacer cet espacement.
- Harmoniser le traitement des titres de section, y compris celui de l'agenda, sans effacer la différence entre titre de section et sous-titre.

### Priorité 3 — parcours et confiance

- Vérifier que les dates arrivent assez tôt pour les personnes cherchant un atelier, et que les informations de prix, lieu et inscription restent directement repérables.
- Garder une présentation personnelle qui aide à établir la confiance, mais décider si elle sert mieux le parcours avant ou après les offres et les dates.
- Hiérarchiser les moyens de contact : mettre en avant le ou les canaux réellement souhaités et éviter que les répétitions rendent le choix plus difficile.
- Contrôler sur mobile que les actions principales, les cartes d'événements et les titres longs restent lisibles et faciles à toucher.

## 4. Critères UX pour les prochaines propositions

Chaque changement devrait répondre à un besoin identifiable et être évalué selon ces critères :

1. **Compréhension immédiate** — Une nouvelle personne peut-elle identifier l'activité, les publics concernés et la localisation sans interpréter une formule ambiguë ?
2. **Parcours utile** — Les chemins vers les offres, les dates et le contact sont-ils faciles à repérer et leurs libellés annoncent-ils clairement la destination ?
3. **Priorité visuelle** — Le regard distingue-t-il le message principal, les sections importantes et les détails ? Les encadrés sont-ils réservés aux contenus qui ont besoin d'être comparés ou isolés ?
4. **Information sans doublon** — Chaque information a-t-elle un rôle clair à l'endroit où elle apparaît ? Une répétition aide-t-elle vraiment la décision ou ajoute-t-elle du bruit ?
5. **Confiance et exactitude** — Les prix, dates, témoignages, qualifications et promesses sont-ils exacts, à jour et présentés sans exagération ? Un contenu fictif peut servir de repère dans la maquette, mais ne doit jamais être pris pour une preuve réelle ni rester visible sur le site publié.
6. **Espacement et regroupement** — Les titres sont-ils assez séparés du contenu précédent et suivant ? Les éléments liés sont-ils rapprochés, sans confondre deux sections distinctes ?
7. **Accessibilité** — Les titres suivent-ils un ordre logique ? Les liens sont-ils explicites, les images ont-elles un texte alternatif utile et les actions restent-elles utilisables au clavier et au toucher ?
8. **Responsive** — Le parcours reste-t-il clair sur petit écran comme sur grand écran, sans texte coupé, densité excessive ni action difficile à atteindre ?
9. **Simplicité de maintenance** — La solution reste-t-elle compréhensible en HTML/CSS/JavaScript vanilla et évite-t-elle une nouvelle dépendance ou une complexité qui ne sert pas le visiteur ?
10. **Cohérence utile** — Les conventions partagées entre pages aident-elles à reconnaître les titres, les liens et les informations pratiques, sans rendre tous les contenus visuellement identiques ?

## 5. Décisions à prendre ensemble

- **Décidé :** le premier choix sur l'accueil est le domaine, familial ou entreprise. Les formats individuel/groupe ne sont pas proposés comme choix sur cette page.
- **Décidé :** le titre principal nomme les constellations familiales et d'entreprise à Bruxelles. La formule d'approche est secondaire et peut être retirée si elle encombre le premier écran.
- **À confirmer :** retirer le bloc générique « En pratique » et placer les détails propres à chaque offre sur sa page ; garder sur l'accueil la localisation générale et les dates de groupe.
- La présentation de Renaud doit-elle précéder les dates ou les suivre ?
- Quels moyens de contact souhaite-t-on réellement mettre en avant ?
- Des témoignages authentiques et autorisés sont-ils disponibles ? En leur absence, quelle information vérifiable pourrait occuper cette place ?

## Portée

Cette analyse porte sur le contenu et la structure visibles dans `index.html` et leurs styles associés. Elle ne remplace pas un test auprès de visiteurs, une vérification complète d'accessibilité ni un contrôle visuel dans plusieurs tailles d'écran. Les propositions devront être validées avec les priorités réelles de l'activité avant toute modification de la page.

## 6. réponse de l'utilisateur humain

### 6.1 faux témoignage - fait!

**Réponse de l'utilisateur :** conserver les faux témoignages comme repères visuels pendant le remodelage UX, puis les cacher sur le site publié jusqu'à l'obtention de vrais témoignages. Ils servent uniquement de maquette.

**Réponse de l'IA :** d'accord. Ils peuvent rester dans la version de travail pour tester la forme et la densité de la section. Le critère est de ne pas les confondre avec de vrais témoignages et de les masquer avant toute publication. Je corrige donc les recommandations précédentes : il ne faut pas les supprimer pendant le travail de mise en page.

**Réponse de l'utilisateur :** ok, on est au clair la dessus.

### 6.2 quel parcours est prioritaire - fait!

**Réponse de l'utilisateur :** sur la première page, le choix de l'accompagnement (familial, entreprise, groupe ou individuel) semble plus important que la prise de contact.

**Réponse de l'IA :** je suis d'accord. La page d'accueil doit d'abord aider la personne à reconnaître la forme d'accompagnement qui l'intéresse et à accéder à sa page ou à ses dates. La prise de contact reste facile à trouver, mais elle ne doit pas être le seul chemin proposé.

Une nuance à garder : « familial » et « entreprise » décrivent le domaine de la constellation, tandis que « individuel » et « groupe » décrivent souvent le format. Ces quatre portes peuvent se recouper. La page devra donc les nommer clairement sans laisser penser qu'il s'agit forcément de quatre offres exclusives. Par exemple, un accès peut mener aux constellations familiales, puis permettre de choisir entre séance individuelle et atelier en groupe ; un autre mène aux constellations d'entreprise. Les dates de groupe peuvent aussi être un accès direct pour les personnes qui savent déjà qu'elles cherchent un atelier.

**Réponse de l'utilisateur :** ici, entreprise/familiales est le premiers vrai choix, ensuite pour chacun groupe/indiviuel le choix se pose. même si pour l'instant, je prévois pas de groupe dédiée aux entreprises.
**remarque :** le produit constellations d'entreprise est encore en développement pour l'instant. je cherche surtout des personnes pour pratiquer et tester mon offre à petit prix (c'est juste informatif, ne fait rien de plus avec cette info, il n'y a aucune demande)

**Réponse de l'IA :** oui, cette hiérarchie est plus juste pour présenter l'offre : le premier choix est le domaine, familial ou entreprise ; le format vient ensuite quand il existe pour ce domaine. Sur l'accueil, il vaut donc mieux présenter d'abord deux entrées distinctes, puis ne montrer que les formats réellement proposés dans chacune. Pour les constellations familiales, les accès individuel et groupe peuvent être détaillés. Pour les constellations d'entreprise, ne pas afficher un choix « individuel / groupe » comme s'il s'agissait de deux offres disponibles si ce n'est pas le cas. Cela évite de promettre une formule inexistante. La prise de contact reste un accès secondaire pour les questions ou demandes particulières.

**Réponse de l'utilisateur :** oui, pas de choix de groupe/individuel sur la page d'accuei! je valide uniquement familiales/entreprise.

**Décision retenue :** le hero de l'accueil propose uniquement les deux domaines, familial et entreprise. Les propositions antérieures d'accès individuel/groupe sur l'accueil sont remplacées par cette décision ; les formats se découvrent sur les pages dédiées.

### 6.3 compréhension immédiate - fait!

**Question de l'utilisateur :** que veut dire « compréhension immédiate » dans le contexte de cette page ?

**Réponse de l'IA :** cela signifie qu'une personne qui découvre le site peut répondre sans effort, en arrivant sur la page : « Quelle activité est proposée ? Où ? Quel choix puis-je faire ensuite ? » Ce n'est pas une obligation d'expliquer toute la méthode dans le grand titre, ni de supprimer une phrase poétique.

Sur la page actuelle, « Mettre en lumière ce qui le demande, se libérer de ce qui encombre » exprime une intention, mais ne dit pas à lui seul ce qu'est le service. Le petit texte au-dessus précise les constellations familiales et d'entreprises à Bruxelles. On pourrait rendre cette information plus immédiatement visible dans le titre ou juste à côté, puis garder la phrase actuelle comme accroche personnelle. Exemple de formulation descriptive à discuter, pas encore retenue : « Constellations familiales et d'entreprise à Bruxelles ». Il faudrait ensuite rendre visibles les choix de format familial/individuel/groupe et l'accès aux accompagnements d'entreprise.

**Réponse de l'utilisateur :** Oui, en effet, dans le cadre d'une compréhension immédiate: "Constellations familiales et d'entreprises, Bruxelles" est le service clé. la phrase poétique est secondaire voir pas nécessaire. elle donne un info sur le comment, pas sur le quoi.

**Réponse de l'IA :** je suis d'accord avec cette distinction entre le « quoi » et le « comment ». Le titre principal devrait nommer clairement le service et le lieu, par exemple « Constellations familiales et d'entreprise à Bruxelles ». La phrase poétique peut devenir un texte secondaire si elle reste importante pour exprimer votre approche, ou être retirée si elle encombre le message. Elle ne doit pas obliger la personne à deviner ce que vous proposez.

**Réponse de l'utilisateur :** je valide, le texte poétique est secondaire et pas néecessaire. on peut l'enlever si ca fait du bruit. constellations familiales et d'entreprises, Bruxelles est l'info principale.

**Décision retenue :** l'information principale du hero est « Constellations familiales et d'entreprises, Bruxelles ». La formule poétique est secondaire et peut être retirée. Le hero doit ensuite donner accès aux deux domaines, sans introduire de choix individuel/groupe.

### 6.4 parcours utiles

Un moyen de contact reste facile à trouver dans l'en-tête, le pied de page et l'interface mobile. C'est une porte disponible à tout moment, pas l'étape obligatoire après chaque lecture.

Les liens doivent annoncer leur destination : par exemple « Découvrir les constellations familiales », « Découvrir les constellations d'entreprise », « Voir les prochaines dates » et « En savoir plus sur Renaud ». Pour les ateliers, le lien d'un événement mène directement à ses détails sur Mobilizon ; pour les informations déjà présentes sur le site, éviter d'obliger la personne à quitter la page ou à vous écrire.

En bref, l'accueil met d'abord en avant le choix **familial ou entreprise**, puis donne un accès distinct aux dates de groupe. Les formats et leurs informations pratiques se trouvent sur les pages correspondantes. La présentation de Renaud et le contact restent faciles à trouver, sans devenir le parcours principal.

**Réponse de l'utilisateur :** je pense maintenant que on pourrait enlever les infos pratiques et les mettre aus pages constellations familiales ou constellations d'entreprises. qu'en penses tu? cela serait plus claire? est ce vraiment une info importante juste ici?

**Réponse de l'IA :** oui, je pense que retirer le bloc général « En pratique » peut rendre l'accueil plus clair. Les prix, durées, formats et modalités sont plus utiles près de l'offre qu'ils décrivent ; les placer sur les pages dédiées évite de répéter les mêmes informations et permet de préciser les différences entre accompagnements.

Je ne retirerais toutefois pas tout repère pratique de l'accueil. Il faut que la personne comprenne immédiatement où l'activité est proposée, et la localisation générale peut rester dans le titre ou le court texte d'introduction. Les dates de groupe ont aussi leur place sur l'accueil puisqu'elles constituent un parcours important : on y garde le titre et la date de chaque événement, avec un lien vers ses détails Mobilizon. Les précisions propres à chaque formule (prix, durée, lieu exact et modalités) peuvent ensuite se trouver sur la page correspondante.

Ainsi, l'accueil reste centré sur les deux choix principaux, les prochaines dates et une brève présentation, tandis que chaque page d'offre rassemble les informations nécessaires pour décider. Le critère est de ne pas obliger la personne à contacter Renaud pour connaître un prix ou une modalité qui peut être publiée. Si une information pratique change fortement le choix entre deux accompagnements, on peut en montrer un résumé sur l'accueil, sans recréer un bloc de plusieurs cartes.

## 7. Première passe proposée (pas encore appliquée)

Les points ci-dessous synthétisent les décisions prises et les pistes encore à valider. Ils ne signifient pas que les modifications HTML/CSS ont été faites.

1. **Clarifier le premier écran.** Faire du titre « Constellations familiales et d'entreprises à Bruxelles » l'information principale. Garder la phrase d'approche en soutien si elle ne concurrence pas le titre.
2. **Donner les deux accès principaux.** Proposer deux liens explicites : « Découvrir les constellations familiales » et « Découvrir les constellations d'entreprise ». Ne pas proposer les formats individuel/groupe dans le hero.
3. **Garder un accès direct aux dates de groupe.** Afficher le titre et la date de chaque événement, avec un lien direct vers sa page Mobilizon. Ce parcours vient après ou à côté des deux domaines, sans les concurrencer.
4. **Revoir les informations pratiques.** Piste à valider : déplacer prix, durée et modalités vers les pages des offres, en gardant la localisation générale sur l'accueil. Vérifier que les informations déplacées sont bien présentes sur les pages correspondantes.
5. **Garder la présentation et le contact accessibles.** Conserver une brève présentation de Renaud avec un lien vers « À propos ». Le contact reste disponible dans l'en-tête, le pied de page et l'interface mobile, sans devenir le parcours principal.
6. **Protéger les témoignages de maquette.** Les garder pour travailler la mise en page, puis les masquer sur le site publié tant qu'il n'y a pas de témoignages réels, exacts et autorisés.
7. **Relire sur mobile et ordinateur.** Vérifier la hiérarchie, la lisibilité des deux accès et des dates, l'espacement, l'accessibilité des liens et la cohérence des informations pratiques.

Après validation de ces pistes, comparer la page aux parcours décrits ici avant d'étendre les mêmes règles aux autres pages.
