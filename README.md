# Renaud's Portfolio

V190925-12:06  
As a French speaker, the fr_README.md file is likely to be the most up-to-date.

## Description
A Codeacademia project. This is a fullstack student portfolio. I copied the structure (not the code) of Ram Maheshwari's portfolio site for training, using CSS, HTML, and JS.

## Features

### Vertical Dot Navigation Bar
Helps the user see their position in the page navigation. Each dot represents an h2. The h2 closest to the top of the window activates the corresponding dot, highlighting it with a JS script.
The script calculates, on each scroll event, the distance of each h2 from the top of the window using "getBoundingClientRect()". The h2 closest to the top has its corresponding dot highlighted.
The dots are added manually, statically.

Possible improvements:
- [ ] 1: Make the layout and number of dots dynamic. The script could automatically count the h2 elements and display the dots.
- [ ] 2: Make the sidebar interactive to allow the user to navigate through the page.

### Vertical Social Media Icon Bar
Coming soon.

## Things Learned

### CSS Structure: BEM and SMACSS
Since I never really know how to structure a CSS file properly, I did some research. I chose to use BEM combined with SMACSS (discussing best practices with AI).

#### SMACSS
SMACSS helps define important CSS categories and separate them clearly.
1. Base
2. Layout
3. Modules (using BEM)
4. States

Additionally, I added:
0. Variables
5. Utilities

I used (or at least tried to use) SMACSS specifications for naming classes, except for modules where I used BEM.

It's recommended to create one CSS file per category. Since this is a small site, I put everything in one file.

#### BEM
Stands for Block-Element-Modifier. It's a method for clearly naming classes. It doesn't use IDs... I encourage you to look it up for more details.
I used it only for SMACSS modules.

#### Feedback on CSS Structure
It might be a bit complicated and confusing... I'll review this at the end of the project to ensure consistency. It's important to provide feedback here at the end to decide if I continue this way.

### Grid Template
I wanted to try CSS Grid for the first time. I used grid-template-areas to structure the whole page. Even if it's not strictly necessary in this situation, it allowed me to review the concept.

I also used grid for the list items in the "my projects" section. I hope to manage the responsive aspect elegantly this way.

### Flex
I'm a beginner and a student. For me, it's always important to discover the power of Flexbox. I use it everywhere; it's really convenient.

### Design and Layout
At first, I worked with black, white, and gray. The font and colors are basic to create the initial layout... it's not very pretty, but it's practical for readability and structuring the layout while I finish the template. I'll revisit it later. I'll also pay attention to accessibility.

### Accessibility
Initially, I strive to use the most appropriate HTML tags. I ask AI if I'm unsure. I'll go through the WCAG checklist afterwards.

### Icons
Simple but very satisfying, I discovered how to use and integrate icons :)  
See the "social media banner" section.

### Responsive
At first, I designed for desktop screens. I'm confused about which methods to use. I partially read "Refactoring UI" and it recommends different things than what I've implemented.
1. Use rem for margins, padding, and font sizes.
2. Use vw or % for layout spaces... I'll see if I keep this.
3. Use grid and flex, which naturally handle responsiveness.
I'll see later if I make changes. I'm curious to dive back into "Refactoring UI" to apply a good workflow.
Feedback to be given!!!

#### Feedback on Responsive
=> Later, remember to give feedback on the method used after reading "Refactoring UI".

### Dot Point Navigation Script
This took me a lot of time, but I learned a lot. I was able to practice and really understand how to select and modify nodes in the DOM. Essential...

## How to use
To be defined

## Technologies
CSS, HTML, JS

## Collaborators
As an exercise, I copied the structure of Ram Maheshwari's portfolio site: https://www.rammaheshwari.com/

## Licenses
To be defined