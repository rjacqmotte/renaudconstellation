# UX de la page d'accueil

Ce document sert de base de travail pour améliorer la page d'accueil, puis guider la cohérence des autres pages. Il distingue les constats observables des propositions à discuter. Aucune proposition ci-dessous ne vaut décision de contenu sans validation.

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
3. **La promesse du premier écran est évocatrice, mais peu explicite.** Le titre principal ne nomme pas directement une séance ou un atelier. Le libellé au-dessus précise l'activité, mais le seul appel à l'action mène aux constellations familiales : les personnes intéressées par les entreprises, les séances individuelles ou les dates de groupe n'ont pas de choix direct à cet endroit.
4. **Le style des titres de section est inégal.** Les sections « Ce que je propose », « En pratique », « Ce qu'ils en disent » utilisent un petit libellé avec une ligne, tandis que l'agenda utilise un titre de niveau 2. Les petits libellés sont des paragraphes, pas des titres : ils ne structurent donc pas la navigation par titres pour les lecteurs d'écran et les personnes qui parcourent la page au clavier.
5. **L'espacement sous les petits titres n'est pas garanti par leur structure actuelle.** `.section-label` dessine une bordure et un padding intérieur, mais pas de marge après ; les sections concernées n'établissent pas toutes un espacement explicite entre ce libellé et leur contenu. Cela explique les cas de contenu visuellement trop proche et justifie une règle commune.
6. **Les témoignages visibles sont des textes fictifs de maquette.** Ils peuvent rester visibles dans la version de travail pour régler la mise en page. Le risque apparaît seulement s'ils sont publiés comme des paroles de clients : avant publication, cette section devra être masquée jusqu'à disposer de témoignages réels, autorisés et exacts.
7. **Le contact est disponible par de nombreux canaux, mais répété.** Téléphone, courriel, Signal et WhatsApp sont proposés dans plusieurs zones. Cette disponibilité est pratique, surtout sur mobile, mais le choix entre quatre canaux peut concurrencer l'action principale.
8. **Les sections principales ne sont pas toutes identifiables comme telles dans la structure HTML.** Plusieurs utilisent un paragraphe stylé à la place d'un titre de section. Les niveaux de titres devraient exprimer la structure du contenu, pas seulement son apparence.

## 3. Améliorations proposées

### Priorité 1 — fiabilité et compréhension

- Conserver les témoignages fictifs dans la version de travail comme repères de mise en page, puis masquer la section dans la version publiée jusqu'à disposer de citations réelles dont l'usage est autorisé.
- Rendre le titre principal plus explicite sur l'activité et le public concerné, tout en gardant éventuellement une formule plus personnelle en sous-titre.
- Faire du choix de l'accompagnement le parcours principal de la page : proposer des accès directs aux offres familiales, d'entreprise, individuelles et en groupe. Garder le contact visible comme possibilité secondaire, sans en faire le seul appel à l'action du hero.
- Donner une vraie structure de titres aux grandes sections, avec un ordre cohérent : un H1 pour la page, des H2 pour les sections principales, puis des H3 si un sous-niveau est nécessaire.

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

- Le parcours principal retenu est le choix de l'accompagnement (familial, entreprise, individuel ou groupe) ; la prise de contact reste une option secondaire et accessible.
- Quel degré d'explicitation souhaite-t-on dans le titre principal, et quelle place conserver à la formule actuelle ?
- Quelle information « En pratique » doit rester sur l'accueil, notamment pour l'option « Chez vous » ?
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

### 6.3 compréhension immédiate - fait!

**Question de l'utilisateur :** que veut dire « compréhension immédiate » dans le contexte de cette page ?

**Réponse de l'IA :** cela signifie qu'une personne qui découvre le site peut répondre sans effort, en arrivant sur la page : « Quelle activité est proposée ? Où ? Quel choix puis-je faire ensuite ? » Ce n'est pas une obligation d'expliquer toute la méthode dans le grand titre, ni de supprimer une phrase poétique.

Sur la page actuelle, « Mettre en lumière ce qui le demande, se libérer de ce qui encombre » exprime une intention, mais ne dit pas à lui seul ce qu'est le service. Le petit texte au-dessus précise les constellations familiales et d'entreprises à Bruxelles. On pourrait rendre cette information plus immédiatement visible dans le titre ou juste à côté, puis garder la phrase actuelle comme accroche personnelle. Exemple de formulation descriptive à discuter, pas encore retenue : « Constellations familiales et d'entreprise à Bruxelles ». Il faudrait ensuite rendre visibles les choix de format familial/individuel/groupe et l'accès aux accompagnements d'entreprise.

**Réponse de l'utilisateur :** Oui, en effet, dans le cadre d'une compréhension immédiate: "Constellations familiales et d'entreprises, Bruxelles" est le service clé. la phrase poétique est secondaire voir pas nécessaire. elle donne un info sur le comment, pas sur le quoi.

**Réponse de l'IA :** je suis d'accord avec cette distinction entre le « quoi » et le « comment ». Le titre principal devrait nommer clairement le service et le lieu, par exemple « Constellations familiales et d'entreprise à Bruxelles ». La phrase poétique peut devenir un texte secondaire si elle reste importante pour exprimer votre approche, ou être retirée si elle encombre le message. Elle ne doit pas obliger la personne à deviner ce que vous proposez.

**Réponse de l'utilisateur :** je valide, le texte poétique est secondaire et pas néecessaire. on peut l'enlever si ca fait du bruit. constellations familiales et d'entreprises, Bruxelles est l'info principale.

### 6.4 parcours utiles

**Question de l'utilisateur :** que signifie « parcours utile » pour ce site ?

**Réponse de l'IA :** un parcours est le chemin qu'une personne suit pour atteindre son objectif sur le site. Les visiteurs n'arrivent pas tous avec la même question ; un parcours utile leur évite de chercher dans des pages sans rapport ou de devoir contacter Renaud avant d'avoir trouvé les informations de base.

Exemples adaptés au site :

- Une personne qui cherche une séance individuelle repère cet accompagnement sur l'accueil, ouvre la page « Séance individuelle », puis trouve les modalités et le moyen de prendre contact.
- Une personne qui veut participer à un atelier en groupe voit les prochaines dates, ouvre les détails de l'atelier sur Mobilizon et peut poursuivre vers les informations d'inscription.
- Une personne qui cherche un accompagnement pour son entreprise choisit « Constellations d'entreprises », lit la page dédiée, puis contacte Renaud si son besoin correspond.
- Une personne qui découvre les constellations mais ne sait pas encore quel format choisir trouve une explication du déroulement avant de décider de contacter Renaud.

Concrètement, cela suggère de présenter tôt des liens qui nomment clairement leur destination, comme « Découvrir les séances individuelles », « Voir les dates des ateliers en groupe » ou « Comprendre les constellations d'entreprise », plutôt que de proposer partout le même « Plus d'infos ». Ce sont des exemples à ajuster au contenu réellement disponible sur chaque page. Le contact reste possible tout au long du parcours, mais n'oblige pas les visiteurs à interrompre leur recherche pour poser une question dont la réponse existe déjà sur le site.

**Réponse de l'utilisateur :** merci, c'est plus clair. je penses que les parcours utiles sont les suivants:
- j'ai besoin de familiales ou entreprise? =>
    - découvrir les constellations familiales;
    - découvrir les constellations d'entreprise;
- besoin de connaitre la date des prochaines groupes? =>
    - date et titre des évènements, lien vers la page d'un évènement particulier;
- besoin d'avoir les info pratique? liste des info pratique sur la page
- besoin d'eb savoir plus sur renaud? présentation brève de renaud =>
    - lien vers la page à propos et contact.
- besoin de me contacter? bouton de contact en smartphone et contact en footer et header.
j'ai bien compris? que suggères tu comme parcours efficace en tant que UX designer?

**Réponse de l'IA :** oui, vous avez bien compris. Vous avez repéré cinq intentions différentes : choisir le domaine, trouver une date de groupe, consulter les informations pratiques, en savoir plus sur vous et vous contacter. Un parcours utile est un chemin direct pour chacune de ces intentions ; il ne faut pas imposer le même chemin à tout le monde ni faire du contact un passage obligé.

Je suggère cette organisation pour la page d'accueil :

1. **Comprendre et choisir** — Le premier écran annonce « Constellations familiales et d'entreprise à Bruxelles », puis donne deux accès distincts : découvrir les constellations familiales et découvrir les constellations d'entreprise. Les choix de format apparaissent ensuite uniquement là où ils correspondent à une offre existante.
2. **Trouver un atelier** — Une section « Prochaines dates de groupe » présente pour chaque événement au minimum son titre et sa date, avec un lien direct vers sa page Mobilizon. Cette section doit être facile à repérer depuis le début de la page, sans prendre le dessus sur le choix familial/entreprise.
3. **Vérifier les informations pratiques** — Afficher clairement lieu, durée, prix et modalités. Comme ces éléments peuvent différer selon l'accompagnement, les associer au bon format ou à la bonne section plutôt que de les rassembler dans des cartes qui laisseraient croire que toutes les conditions sont identiques.
4. **Découvrir Renaud** — Garder une courte présentation sur l'accueil, puis proposer un lien explicite vers la page « À propos ». Cette présentation soutient la confiance, mais ne doit pas repousser les offres et les dates loin sous la page.
5. **Contacter** — Garder un moyen de contact facile à trouver dans l'en-tête et le pied de page, ainsi que dans l'interface mobile. C'est une porte disponible à tout moment, pas l'étape obligatoire après chaque lecture.

Les liens doivent annoncer leur destination : par exemple « Découvrir les constellations familiales », « Découvrir les constellations d'entreprise », « Voir les prochaines dates » et « En savoir plus sur Renaud ». Pour les ateliers, le lien d'un événement mène directement à ses détails sur Mobilizon ; pour les informations déjà présentes sur le site, éviter d'obliger la personne à quitter la page ou à vous écrire.

En bref, je garderais l'ordre de priorité suivant : **choix familial ou entreprise**, puis **formats et dates pertinents**, ensuite **informations pratiques et présentation**, avec le **contact toujours accessible**. L'ordre exact des sections pourra être confirmé en regardant la page sur mobile et sur ordinateur ; le principe important est que les deux offres principales soient visibles avant les contenus secondaires.

**Réponse de l'utilisateur :** je pense maintenant que on pourrait enlever les infos pratiques et les mettre aus pages constellations familiales ou constellations d'entreprises. qu'en penses tu? cela serait plus claire? est ce vraiment une info importante juste ici?

**Réponse de l'IA :** oui, je pense que retirer le bloc général « En pratique » peut rendre l'accueil plus clair. Les prix, durées, formats et modalités sont plus utiles près de l'offre qu'ils décrivent ; les placer sur les pages dédiées évite de répéter les mêmes informations et permet de préciser les différences entre accompagnements.

Je ne retirerais toutefois pas tout repère pratique de l'accueil. Il faut que la personne comprenne immédiatement où l'activité est proposée, et la localisation générale peut rester dans le titre ou le court texte d'introduction. Les dates de groupe ont aussi leur place sur l'accueil puisqu'elles constituent un parcours important : on y garde le titre et la date de chaque événement, avec un lien vers ses détails Mobilizon. Les précisions propres à chaque formule (prix, durée, lieu exact et modalités) peuvent ensuite se trouver sur la page correspondante.

Ainsi, l'accueil reste centré sur les deux choix principaux, les prochaines dates et une brève présentation, tandis que chaque page d'offre rassemble les informations nécessaires pour décider. Le critère est de ne pas obliger la personne à contacter Renaud pour connaître un prix ou une modalité qui peut être publiée. Si une information pratique change fortement le choix entre deux accompagnements, on peut en montrer un résumé sur l'accueil, sans recréer un bloc de plusieurs cartes.

## 7. étapes des premières modifications pour en réponse à 6.1 à 6.4

Les étapes ci-dessous traduisent les décisions prises aux points 6.1 à 6.4. Elles décrivent l'ordre proposé pour la première passe sur la page d'accueil ; elles ne modifient pas encore le HTML ni le CSS.

1. **Clarifier le premier écran.** Remplacer le message principal par une formulation qui nomme directement le service et le lieu : « Constellations familiales et d'entreprise à Bruxelles ». La phrase poétique est secondaire ; la retirer si elle détourne l'attention de cette information. Faire du choix d'accompagnement l'action principale, pas de la prise de contact.
2. **Présenter les deux domaines comme les deux choix principaux.** Donner deux accès visibles et distincts : constellations familiales et constellations d'entreprise. Ne pas proposer sur la page d'accueil un choix individuel/groupe ; ces formats se découvrent ensuite sur la page concernée, lorsqu'ils sont proposés. Les liens doivent annoncer clairement leur destination.
3. **Retirer le bloc générique « En pratique ».** Déplacer les détails propres à chaque offre (prix, durée, modalités et lieu précis) vers sa page dédiée. Garder sur l'accueil la localisation générale nécessaire à la compréhension immédiate. Éviter que la personne doive contacter Renaud pour obtenir une information pratique qui peut être publiée.
4. **Garder un accès direct aux prochaines dates de groupe.** Présenter le titre et la date des événements, avec un lien vers la page Mobilizon de chacun. Placer cette section assez tôt pour être trouvée facilement, mais après ou à côté des deux choix principaux afin que l'ordre de priorité reste lisible.
5. **Rendre la présentation et le contact secondaires, mais faciles à trouver.** Conserver une brève présentation de Renaud avec un lien explicite vers la page « À propos ». Garder les accès de contact disponibles dans l'en-tête, le pied de page et l'interface mobile, sans en faire l'unique parcours proposé.
6. **Conserver les témoignages fictifs uniquement pour la maquette.** Les garder le temps de régler la forme et la place de cette section. Comme le site est publié directement depuis le dépôt, les masquer avant tout push vers la version publique ; ne pas les présenter comme des témoignages réels.
7. **Faire une relecture visuelle et de structure.** Sur mobile puis sur ordinateur, vérifier que les deux choix principaux sont faciles à repérer, que les dates et liens sont lisibles, et que le retrait des cartes « En pratique » allège bien la page. Vérifier aussi la hiérarchie des titres, l'espacement régulier entre chaque titre et son contenu, et l'absence de répétitions inutiles.

Après cette première passe, comparer la page au parcours décrit ici avant d'étendre les mêmes règles aux autres pages. Les informations déplacées devront être présentes sur les pages familiales et entreprise correspondantes ; leur mise à jour fait partie du suivi de cette modification.
