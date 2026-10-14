# Feuille de route du site de constellations

## 1. Objectif et cadre de travail

Présenter mon activité de constellations familiales et d'entreprises, permettre de découvrir les séances et faciliter la prise de contact ou l'inscription aux ateliers.

- **Privilégier la simplicité** : un site sobre, facile à comprendre et à entretenir pour un non-développeur. Nommer les possibilités de simplification avant d'ajouter de la complexité.
- **Technique** : HTML, CSS et JavaScript vanilla, sans serveur applicatif. Utiliser des services externes pour les fonctions qui en ont besoin.
- **Publication actuelle** : GitHub Pages, domaine géré chez Infomaniak ; les modifications sont publiées par un push Git.
- **Services privilégiés** : open source, européens et respectueux des personnes et des données privées ; priorité au Fediverse, aux CHATONS et à Framasoft.
- **Collaboration avec l'IA** : expliquer les solutions et leur complexité dans un langage accessible, annoncer les changements et attendre ma confirmation avant de coder. Terminer un point avant de passer au suivant.
- **Trajectoire** : terminer le site multipage, puis en extraire une version une page, avec un hébergement envisagé chez Infomaniak. Mobilizon pourrait accueillir des contenus complémentaires.

## 2. Agenda Mobilizon : terminé

### Décisions retenues

- Créer les événements sur Mobilizon et afficher automatiquement les prochaines dates, triées chronologiquement, sur l'accueil et la page Groupes via le flux ICS.
- Garder un parseur maison minimaliste, sans bibliothèque supplémentaire ni API GraphQL.
- Afficher uniquement la date, les heures de début et de fin, le titre et le lieu, avec un lien vers l'événement. Ne pas lire ni afficher le descriptif.
- Si un champ obligatoire manque, garder l'événement et afficher un avertissement avec un lien vers sa fiche. Si son URL manque, utiliser le profil Mobilizon.
- Si le flux est vide ou inaccessible, afficher un lien de secours vers Mobilizon.
- Ne pas réintroduire de nettoyage complexe des adresses ni chercher à gérer toutes les variantes du format ICS.

### Vérification et limites à conserver

Le parseur est séparé de l'affichage dans [JS/mobilizonParser.js](../JS/mobilizonParser.js). Le TDD est limité au parseur, avec les tests intégrés à Node.js, sans framework. Node.js sert aux tests locaux, pas au fonctionnement du site publié.

Commande de test :

```sh
TZ=Europe/Brussels node --test tests/mobilizonParser.test.js
```

Les cinq tests ont été validés, ainsi que l'affichage du flux réel et d'un événement incomplet dans le navigateur. Le tri, le filtrage et le rendu restent vérifiés manuellement.

- **Fuseau horaire** : le site suppose que le visiteur est dans le même fuseau que l'organisateur, Europe/Brussels. Le parseur ne traite pas explicitement `TZID` ; un affichage fiable depuis d'autres fuseaux demanderait une évolution et des tests dédiés.
- **Événements sans heure** : le filtre peut conserver un événement passé lorsque seule sa date est disponible. À corriger si ce cas se présente.
- **Maintenance** : si le flux change, ajouter d'abord un exemple réel aux tests. Réévaluer le choix du parseur seulement si les variantes à gérer rendent le code trop complexe. Si une autre source est ajoutée, vérifier aussi la sécurité de ses liens d'événement.

## 3. Accueil : travail en cours

Faire de l'accueil le modèle visuel des autres pages, avec un design system minimaliste et réutilisable.

- Clarifier la hiérarchie : titres de page, de section et de contenu ; réduire les encadrés qui concurrencent les informations importantes.
- Harmoniser les espacements entre sections, titres et contenus, notamment autour des titres accompagnés d'une ligne orange.
- Réutiliser les styles communs de typographie et de boutons plutôt que multiplier les styles particuliers.
- Relire le parcours et la mise en page sur mobile et ordinateur, agenda compris.
- Garder les faux témoignages comme éléments de maquette pour évaluer leur place dans la page.

## 4. Étapes suivantes

1. **Page Groupes** : clarifier les niveaux H1 à H3, réduire les encadrés et reprendre les styles de section validés sur l'accueil.
2. **Autres pages** : appliquer la même hiérarchie, les mêmes espacements et les mêmes composants, sans créer un système plus compliqué que nécessaire.
3. **Newsletter** : prévoir une inscription avec Brevo pour annoncer les prochains ateliers. Choisir entre un simple lien et un formulaire intégré ; emplacement envisagé après l'agenda, éventuellement dans le pied de page. Ces choix restent à confirmer.
4. **Photos** : compresser les images en conservant une qualité adaptée au site.
5. **Version une page** : une fois le site multipage terminé, sélectionner l'essentiel et vérifier les conditions d'hébergement chez Infomaniak.

**Priorité actuelle : terminer la mise en page et l'UX de l'accueil avant de poursuivre les autres étapes.**
