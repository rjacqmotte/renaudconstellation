# Renaud's Portfolio

V190925-12:06  
Comme je suis francophone, le fichier fr_README.md est susceptible d'être le plus à jour.

## Description
A Codeacademia project. It's a Fullstack student portfolio. I copied the structure (not the code) of Ram Maheshwari's portfolio site for training, using CSS, HTML et JS.

## Fonctionnalités

### Barre de navigation verticale à points
Pour aider l'utilisateur à voir où il en est dans la navigation de la page. Chaque point représente un h2. Le h2 le plus proche du haut de la fenêtre active le point correspondant pour le mettre en valeur avec un script JS.
Le script calcule à chaque événement de scroll les distances de chaque h2 par rapport au haut de la fenêtre avec "getBoundingClientRect()". Le h2 le plus proche du haut de la fenêtre a son point correspondant mis en valeur.
Les points sont ajoutés manuellement de façon statique.

Améliorations possibles :
- [ ] 1 : rendre la mise en page et le nombre de points dynamiques. Le script pourrait calculer tout seul le nombre de h2 et afficher automatiquement les points.
- [ ] 2 : rendre la barre latérale interactive pour permettre à l'utilisateur de naviguer dans la page.

### Barre d'icônes verticale de réseaux sociaux
À venir.

## Choses apprises

### Structure CSS : BEM et SMACSS
Comme je ne sais jamais trop comment structurer une feuille CSS correctement, j'ai fait quelques recherches. J'ai choisi d'utiliser BEM combiné à SMACSS (en discutant avec l'IA sur les bonnes pratiques utilisées).

#### SMACSS
SMACSS permet de définir des catégories importantes de types de CSS et de bien les conscientiser et les séparer.
1. Base
2. Layout
3. Modules => utilisation de BEM
4. States

À cela, j'ai ajouté :
0. Variables
5. Utilities

J'ai utilisé (ou du moins essayé) les spécifications de SMACSS pour nommer les classes, sauf pour les modules où j'ai utilisé BEM.

Il est conseillé de faire une page CSS par catégorie. Comme c'est un petit site, j'ai tout mis dans une seule.

#### BEM
Pour Block-Element-Modifier. C'est une méthode pour nommer clairement les classes. Il n'utilise pas d'ID d'ailleurs... Je vous laisse faire une recherche pour avoir plus de détails.
Je l'ai utilisé uniquement pour les modules SMACSS.

#### Retours sur la structuration du CSS
C'est peut-être un peu compliqué et confus... Je vais repasser là-dessus en fin de projet pour être sûr d'être cohérent. C'est important que je fasse un retour ici en fin de projet pour savoir si je continue comme cela.

### Grid template
Je voulais essayer le grid pour le découvrir une première fois. Utilisation de grid-template-areas pour structurer toute la page. Même si ce n'est pas spécialement nécessaire dans cette situation, cela m'a permis de faire une révision.

J'ai utilisé grid également au niveau des éléments des list items dans la section "my projects". J'espère parvenir à gérer élégamment l'aspect responsive de cette façon.

### Flex
Je suis débutant et étudiant. Pour moi, c'est toujours important de découvrir la puissance du Flex. Je l'utilise un peu partout, c'est vraiment pratique.

### Design et mise en page
Dans un premier temps, j'ai travaillé en noir, blanc et gris. La police et les couleurs étant basiques pour créer le layout de base... c'est plutôt moche. Mais c'est pratique pour la lisibilité et la structure de la mise en page le temps que je finisse le template. Je repasserai dessus dans un deuxième temps. Je prêterai attention à l'accessibilité par la même occasion.

### Accessibilité
Dans un premier temps, je m'efforce d'utiliser les balises HTML les plus appropriées. Je demande à l'IA si j'hésite. Je parcourrai la checklist du WCAG par après.

### Icônes
Tout bête et très satisfaisant, j'ai découvert comment utiliser et intégrer des icônes :)  
Voir dans la section "social media banner".

### Responsive
#### questionnements
Dans un premier temps, je fais le design pour un écran d'ordinateur. Je suis confus sur les méthodes à utiliser. En effet, j'ai lu en partie "Refactoring UI" et il conseille d'autres choses que celles que j'ai mises en place.
1. Travail avec rem pour les marges, le padding et la taille des polices.
2. Utilisation de vw ou de % pour les espaces de type layout... Je verrai si je conserve cela.
3. Utilisation de grid et flex qui naturellement gèrent le responsive.
Mais je verrai après si je ferai des modifications. Je reste très curieux de me replonger dans "Refactoring UI" pour mettre en pratique une bonne méthode de travail.
Retours à donner !!!
4. je vais utiliser les media queries directement au seins de ma strucuture css esxistante: 1. base, 2. layout, 3. modules

#### décisions pour le responsive
1. je vais travbailler en mobile first. je vais donc réécrire les pages dans ce sens.
2. j'ai défini (surtout l'ia m'a donné) des dimension clés pour les éléments tels que h1, h2, h3, p.
    ```
        /* BASE (mobile) */
    h1 { font-size: 1.75rem; line-height: 1.2; } /* 28px */
    h2 { font-size: 1.5rem; line-height: 1.3; }  /* 24px */
    h3 { font-size: 1.25rem; line-height: 1.4; } /* 20px */
    p, label { font-size: 1rem; line-height: 1.5; } /* 16px */

    /* Small devices (≥321px) */
    @media (min-width: 321px) {
    h1 { font-size: 2rem; }      /* 32px */
    h2 { font-size: 1.75rem; }   /* 28px */
    h3 { font-size: 1.375rem; }  /* 22px */
    }

    /* Tablets (≥768px) */
    @media (min-width: 768px) {
    h1 { font-size: 2.5rem; }    /* 40px */
    h2 { font-size: 2rem; }      /* 32px */
    h3 { font-size: 1.5rem; }    /* 24px */
    p { font-size: 1.125rem; }   /* 18px */
    }

    /* Desktop (≥1024px) */
    @media (min-width: 1024px) {
    h1 { font-size: 3rem; }      /* 48px */
    h2 { font-size: 2.25rem; }   /* 36px */
    h3 { font-size: 1.75rem; }   /* 28px */
    }

    /* Large desktop (≥1440px) */
    @media (min-width: 1440px) {
    h1 { font-size: 3.5rem; }    /* 56px - votre 4rem actuel réduit */
    h2 { font-size: 2.5rem; }    /* 40px */
    h3 { font-size: 1.875rem; }  /* 30px */
    }
    ```
3. je vais travailler avec 4 ou 5 breaking point. je choisi ceux proposer par google chrome (320px, 425px ??? , 768px, 1024px, 1440px). si mon site présente des breaking point "naturelle" entre ces points là, j'en prendrai soins égelement, dans un deuxième temps.



#### Retours sur le responsive
=> Plus tard, penser à donner un retour sur la méthode utilisée après la lecture de "Refactoring UI".

### Script de navigation dot point
Là, ça m'a pris beaucoup de temps, mais j'ai beaucoup appris. J'ai pu pratiquer et bien comprendre comment sélectionner et modifier les nodes dans le DOM. Essentiel...

### Variables CSS
j'ai essayé différente façon d'utiliser les variables css. mettre les media querries dedans ou non? 
je me rends compte que l'on peut aller fort loin avec les variables css, mais que c'est aussi plus approprié quand on crée des design system ou si l'on fait des gros sites.
j'ai testé différentes choses ici, ce n'est pas parfaitement cohérent, mais je choisi d'arrêter là pour l'instant.

#### conclusions
je préfère utiliser les media querries dans les css et non dans les varialbes, cela crée bcp de confusion.
j'aime utiliser des valeurs clées pour les espaces, les tailles, les couleurs. Cela limite et facilite les choix et assurer plus de cohérence.  

## How to use
À définir

## Technologies
CSS, HTML, JS

## Collaborateurs
Exercice : J'ai copié la structure du site portfolio de Ram Maheshwari https://www.rammaheshwari.com/

## Licences
À définir
