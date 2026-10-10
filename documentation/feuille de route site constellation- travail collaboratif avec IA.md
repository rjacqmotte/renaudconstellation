# feuille de route site constellation- travail collaboratif avec IA

## 0. préliminaires: contexte et règles de travail

### 0.1 site pour un activité de constellation familiale

le but est de faire un page de présentation et de vente pour mon activité de constellation familiale.

un site existant de plusieurs page a été fait en collaboration avec l'ia. les dermier 3 ou 4 commit, l'ia a travaillé sur une api pour intégrer les évenement de ma page mobilizon. le parsing est délicat et le code devient complexe.nous en sommes là. point 1.

### 0.2 par défaut, chercher la simplicité

je ne suis pas dévelopeur. un page sobre, simple et techniquement facile à prendre en main est le plus adéquat.

j'ai tendence à compliquer pour faire simple.

Ici, le retour à la simpliciter doit toujours être nommé et privilégié.

### 0.3 html, css et js vanilla

#### architecture

le tout est hebergé via github page et le nom de domaine est lié via infomaniak. je push les modifications lors de commit pour modifier le site.

#### dileme plusieurs page ou single page? les deux!

 j'aurai voulu heberger sur codeberg ou un autre service ethique. (voir point 0.5). mais codeberg est pour moi trop compliqué. infomaniak offre le choix de la simplicité et du cout minimum, car dans le pack du nom de domaine (20€ par an) il est possible d'heberger un site one-page. ca me donne envie de simplifier le site existant pour mettre l'essentiel en une seule page. ca permet économie, simplicité technique extrème et c'est probablement suffisant pour un présence web de qualité. d'autant plus qu'alors, la page mobilizon permettrait d'acceuillir des aticles de blog si je veux donner plus de détails sur certaine aspect. => on va terminer le site en plusieurs page et à la fin en extraire un site single page

### 0.4 on s'appuie sur des services externes pour le back-end, pas de back-end dans le code

### 0.5 priorité au service open-source, européen et le plus respectueux de l'homme et des données privées - fediverse, collectif chaton, framasoft et ses copains d'abord

### 0.6 posture demandée de l'ia

- nommer la ou les solutions et ce que l'ia veut faire, attendre la confirmation humaine avant de coder;

- présenter les différentes possibilités et technologies possibles avec un description technique adaptée à un bricoleur du dimanche de l'informatique, signaler le niveau de simplicité et complexité 

- nous terminons un point avant de faire le suivant.

## 1. intégration ou non d'un calendrier mobilizon

### 1.1 différente possibilité d'intégrer les évenement mobilizon dans les sites

l'idée première est de pouvoir utiliser mobilizon pour créer les évènements. ça permet  de ne pas modifier en dur le site et d'avoir un page évènement  à partager. par contre, ça implique un difficulté double: gérer une page mobilizon, c'est un truc à faire en plus et gérer la complexité technique de lié les 2 sites. 

#### 1.1.1 analyse de l'ia (ia)

Mobilizon propose plusieurs façons de relier ses événements au site :

- **Lien vers Mobilizon** : la solution la plus simple à maintenir, mais les visiteurs quittent le site pour voir les dates.
- **Flux ICS** : Mobilizon reste la source des événements et le site les récupère automatiquement, sans serveur ni compte technique. Le flux est un format calendrier standard, mais il faut un lecteur pour en extraire les informations.
- **API GraphQL** : les événements sont fournis en données structurées, mais il faut écrire et maintenir une requête spécifique. C'est plus de complexité que nécessaire pour afficher quelques dates.
- **Calendrier intégré** : Mobilizon documente un calendrier complet basé sur le flux ICS. Il ajoute des bibliothèques et une interface plus élaborée que la simple liste souhaitée.
- **Dates écrites dans le HTML** : très simple côté technique, mais chaque nouvelle date demande une modification et une publication du site.

Le flux ICS répond actuellement correctement depuis le site. Les difficultés viennent surtout du parseur écrit spécialement pour ce projet : il gère plusieurs variantes de lignes, les descriptions, les échappements et le nettoyage des lieux, alors que l'agenda n'a pas besoin de toutes ces informations. Le flux actuel contient aussi des dates avec le fuseau `Europe/Brussels`, que le code maison ne traite pas explicitement.

Pour simplifier tout en gardant le flux automatique, une possibilité est de remplacer le parseur maison par une bibliothèque iCalendar connue, par exemple `ical.js`, chargée localement dans le site. Elle s'occuperait des règles du format, notamment des lignes repliées. Attention : la version standard de `ical.js` ne contient pas la base des fuseaux horaires. Comme le flux Mobilizon indique `TZID=Europe/Brussels` sans fournir sa propre définition de ce fuseau, il faudrait aussi ajouter le fichier de fuseaux horaires de la bibliothèque pour convertir les heures correctement. Le code du site ne garderait ensuite que cinq champs : `DTSTART`, `DTEND`, `SUMMARY`, `LOCATION` et `URL`. Il ne lirait ni ne décoderait `DESCRIPTION`, et n'en afficherait pas le contenu.

Une dépendance est du code écrit et maintenu par un autre projet, que notre site utilise. Ici, les fichiers de la bibliothèque seraient copiés dans le dépôt et chargés par le navigateur, sans serveur ni installation à faire pour chaque visiteur. En les gardant localement à une version précise, ils ne changeraient pas tout seuls et le site ne dépendrait pas de la disponibilité d'un CDN. `ical.js` est sous licence MPL-2.0 ; il faudrait conserver les informations de licence avec les fichiers distribués.

Cette dépendance ne devrait donc pas casser soudainement toute seule. Les risques sont plutôt qu'un changement futur du flux ICS de Mobilizon modifie les données attendues, qu'un bogue de la bibliothèque soit découvert, ou que la base de fuseaux horaires devienne obsolète. Dans ces cas, il faudrait vérifier puis mettre à jour les fichiers manuellement. Si le chargement ou la lecture échoue, l'agenda peut afficher son lien de repli vers Mobilizon au lieu des dates. Il faudra aussi tester que les heures affichées restent correctes, notamment lors des changements d'heure été/hiver.

La bibliothèque et sa base de fuseaux horaires éviteraient de maintenir nous-mêmes un parseur complet, mais ajouteraient deux fichiers à conserver et à mettre à jour. Ce n'est donc pas automatiquement plus simple. Avant de coder, il faudra comparer cette option avec un parseur maison réduit aux seuls champs du flux actuel. Dans les deux cas, on supprimera le traitement du descriptif et l'affichage gardera uniquement la liste des événements à venir, triés par date, avec un lien de repli vers Mobilizon si le flux est indisponible ou vide.

#### 1.1.2 premier choix
garder le flux ics, simplifier le parseur et laisser d'abord le calendrier dans la page groupe. info à afficher (l'ordre et la mise en page peut varier): date, heure début, heure fin, titre, lieu, !!! pas de descriptif.

### 1.1.3 choix parseur maison ou parseur d'une bibliothèque? (ia)

Le besoin est limité : un seul flux public Mobilizon, une liste des prochains événements et cinq informations à afficher. Il n'est pas nécessaire de gérer toutes les possibilités du format ICS ni de construire un calendrier complet.

- **Parseur maison minimaliste** — pas de fichier ni de licence supplémentaire, et le code peut être limité aux événements, aux lignes repliées et aux champs `DTSTART`, `DTEND`, `SUMMARY`, `LOCATION` et `URL`. On peut supprimer entièrement la lecture du descriptif et réduire fortement le nettoyage des lieux. En revanche, un parseur maison reste sensible aux variations du flux. Il faut traiter explicitement `TZID=Europe/Brussels` pour ne pas afficher une heure décalée selon le fuseau du navigateur, et prévoir un repli si le flux adopte un format inattendu.
- **Bibliothèque iCalendar** — plus fiable pour lire les variantes du format standard et moins de règles de parsing à écrire soi-même. Pour `ical.js`, il faut toutefois ajouter les données de fuseau horaire en plus de la bibliothèque, conserver les licences et mettre ces fichiers à jour manuellement. Cela ajoute une dépendance sans supprimer les éventuels ajustements nécessaires aux lieux fournis par Mobilizon.

**Choix recommandé pour ce site : commencer par un parseur maison minimaliste**, car la source est unique et les besoins d'affichage sont réduits. Ce choix n'est valable que si le code reste volontairement limité au flux observé : pas de descriptif, pas de nettoyage générique des adresses, et prise en compte explicite du fuseau de Bruxelles. Avant de remplacer l'ancien code, tester plusieurs événements réels, dont des dates de part et d'autre des changements d'heure, ainsi qu'un flux vide ou invalide. Si ces tests imposent de gérer de nombreuses variantes ICS ou rendent le code compliqué, préférer alors la bibliothèque plutôt que d'étendre sans fin le parseur maison.

#### 1.1.4 TDD sur JS vanilla?

Oui, le TDD est faisable en JavaScript vanilla : il ne nécessite ni framework d'application ni bibliothèque de test. Il est particulièrement utile ici, car une erreur de lecture d'une date peut rester discrète et réapparaître lors d'un changement dans le flux.

Pour garder cela simple, les tests porteraient d'abord sur la fonction pure qui lit le texte ICS, séparée du chargement réseau et de l'affichage HTML. On peut utiliser le module de test intégré à Node.js (`node:test`) et des exemples ICS enregistrés comme données de test. Aucun mock n'est nécessaire pour vérifier le parseur. Node.js ne servirait qu'à lancer les tests sur l'ordinateur ; le site publié sur GitHub Pages resterait du HTML, du CSS et du JavaScript vanilla, sans Node côté visiteurs.

Les tests essentiels couvriraient les champs conservés, plusieurs événements triés par date, les heures `Europe/Brussels` avant et après les changements d'heure, les propriétés absentes ou repliées sur plusieurs lignes, ainsi qu'un flux vide ou invalide. Un contrôle manuel dans le navigateur vérifierait ensuite le chargement réel du flux et l'affichage du lien de repli en cas d'erreur.

Le dépôt ne semble pas encore avoir de dispositif de test dédié. Il faudrait donc isoler le parseur dans un fichier JavaScript testable et ajouter un petit fichier de tests. Le Node.js 20 disponible dans l'environnement peut exécuter ces tests avec une commande simple, sans installer de framework. **Recommandation : utiliser le TDD pour le parseur uniquement**, sans créer une infrastructure de test pour tout le site. Cela ajoute un petit effort initial, mais rend les changements de dates et de format vérifiables et donc plus faciles à maintenir.

#### 1.1.5 TDD sur parseur uniquement : OUI
je valide la propisation de l'ia du 1.1.4.

#### 1.1.6 étapes pour développer un parseur simple en TDD

1. **Fixer le comportement attendu** : décider précisément quelles dates afficher, comment interpréter `Europe/Brussels` quelle que soit l'heure locale du visiteur, et quoi faire si un champ manque ou si le flux est invalide. Ne traiter que les événements et les champs nécessaires à l'agenda.
2. **Préparer de petits exemples ICS** : couvrir un événement normal, plusieurs événements, une heure de début et de fin, un champ facultatif absent, une ligne repliée, un flux vide et des dates avant/après le changement d'heure. Ne pas conserver les descriptions dans les exemples puisqu'elles ne seront pas utilisées.
3. **Mettre en place les tests sans framework** : utiliser `node:test`, intégré à Node.js, et vérifier que la commande de test fonctionne. Extraire le parseur dans un fichier JavaScript séparé afin que le navigateur et les tests puissent appeler la même fonction.
4. **Écrire les tests avant le parseur** : commencer par les résultats attendus sur les exemples ICS ; constater leur échec, puis écrire juste assez de code pour les faire réussir. Ajouter les cas un par un, sans mock réseau pour tester la lecture du texte.
5. **Brancher le parseur à l'agenda** : remplacer l'ancien traitement dans `script.js`, ne plus lire ni afficher `DESCRIPTION`, garder la récupération du flux, l'ordre chronologique et le lien de repli vers Mobilizon.
6. **Vérifier le résultat complet** : relancer les tests, puis ouvrir la page Groupes dans un navigateur pour contrôler l'agenda avec le flux réel et son comportement lorsque les événements sont absents ou que la récupération échoue. Corriger toute différence puis relancer les tests.

On s'arrête à cette intégration sur la page Groupes ; l'ajout de l'agenda sur la page d'accueil est traité séparément au point 1.3.

#### 1.1.7 journal d'avancement
##### 1. comportement attendu
date de l'évenement, heure de début et heure de fin: ex: 2 octobre 2026, de 10h à 15h30. on par sur le principe que le visiteur on le même fuseau horaire que moi. dans le site et dans les titres, il y a de toute façon une réfférence au lieux. si un champ manque, écrire une message d'erreur type: lieux impossible à afficher, consulter la page évenement ici pour avoir toutes les informations (avec un lien vers la page évenement de mobilizon). les champs nécessaire sont : date, heure début et heure de fin, lieux, titre de l'évènement.

##### 2. champs manquants (comportement confirmé)
La carte de l'événement reste affichée avec les informations disponibles. Chaque champ obligatoire absent est remplacé par un avertissement explicite et un lien vers la page de l'événement Mobilizon. Si l'URL de l'événement manque, utiliser le lien du profil Mobilizon comme solution de repli.

##### 3. premiers tests TDD
Un premier fichier de tests couvre les champs affichés, l'absence de descriptif, les heures avant/après le changement d'heure, les lignes repliées, les champs absents et le flux vide ou invalide. Le premier lancement confirme le rouge attendu : quatre tests échouent avec le parseur vide, et le test du flux vide passe.

##### 4. parseur minimal et intégration sur la page Groupes
Le parseur a été isolé dans `JS/mobilizonParser.js` et ne lit que les champs utiles. Le chargement et l'affichage du descriptif ainsi que le nettoyage complexe des adresses ont été retirés. Les cartes affichent la date, les heures, le titre et le lieu ; si un champ obligatoire manque, la carte reste visible et un avertissement avec lien Mobilizon est affiché.

Validation : les cinq tests Node.js passent avec le fuseau de test `Europe/Brussels`. Le vrai flux Mobilizon renvoie deux événements correctement affichés dans le navigateur local. Un événement incomplet simulé dans le navigateur conserve sa carte et affiche les avertissements attendus, liés à sa page Mobilizon. Aucun descriptif n'est affiché. Les scripts passent `node --check`, et les diagnostics VS Code ne signalent pas d'erreur. Le contrôle navigateur est manuel ; le site de production n'a pas été modifié.

##### 5. commentaires pour faciliter la maintenance
Des commentaires en français ont été ajoutés aux étapes moins évidentes du parseur et de l'affichage : format des lignes ICS, fuseau horaire convenu, champs retenus, affichage des événements incomplets et comportement de secours. Ils expliquent les décisions importantes sans répéter ce que le code indique déjà. Les tests restent exécutables avec `TZ=Europe/Brussels node --test tests/mobilizonParser.test.js`.


### 1.2 la voie de la simplicité - juste un calendrier en dure direct en html

le plus simpe et peut être de juste écrire les dates à même le code et modifier via commt successif.

### 1.3 mise en place du calendrier à la première page et à la page de groupe

## 2. mise en page de la feuille groupe

### 2.1 Hiérarchie

sur la page de groupe, de nombreux encadré sont utilisé. ca nuit à la hierarchie visuelle. je dois déterminer des niveau de hierarchie de H1 à H3. h1 le plus important.

### 2.2 cohérence avec la page d'acceuil

il faut mettre des petits titre et la ligne orange pour séparer les sections sur la page groupe, comme la page d'accueil;

## 3. intégration d'une inscription à un newletter avec Brevo

### 3.1 simple lien ou champs direct dans le site

### 3.2 ou placer l'inscription à la newletter?

après l'agenda pour proposer de s'abboner et recevoir les dates des nouveaux groupes, certainement.

en pied de page ou en page d'acceuil (après l'agenda à nouveau... si agenda placer en page d'accueil, c'est la plus cohérent)

la newletter est en effet essentiellement là pour annoncer et partager les nouveau groupes

## 4. soigné la hierarchie sur toutes la page

## 5. rendre toutes la page cohérente visuellement

## 5bis. compresser les photos

## 6. créer un site one page

### 6.1 définir l'essentiel à mettre sur le one page

...

### 
