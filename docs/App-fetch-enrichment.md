# Enrichissement des Pokémon après l’appel à PokeAPI (`App.tsx`)

Ce document décrit pas à pas ce qui se passe autour du traitement de la réponse JSON dans `src/App.tsx`, lors de l’appel à `GET https://pokeapi.co/api/v2/pokemon?limit=200`.

## Contexte : où se situe ce code ?

1. Au montage du composant `App`, `useEffect` (avec un tableau de dépendances vide `[]`) s’exécute **une seule fois**.
2. Un `fetch` demande la liste des Pokémon (200 entrées max).
3. `.then(res => res.json())` convertit la réponse HTTP en objet JavaScript.
4. Le **deuxième** `.then(data => { ... })` reçoit cet objet `data` : forme standard de [PokeAPI pour la liste de ressources](https://pokeapi.co/docs/v2#resource-listspagination-section) — en particulier `data.results` est un **tableau** d’objets `{ name, url }`.

## Étape par étape : `data.results.map((poke, index) => ({ ... }))`

### Étape A — `data.results`

- C’est le tableau renvoyé par l’API pour chaque Pokémon “léger” dans la liste.
- Chaque élément `poke` contient au minimum :
  - `name` : nom du Pokémon ;
  - `url` : lien vers la ressource détaillée (non utilisé ici pour construire les images).

### Étape B — `.map((poke, index) => ...)`

- **`map`** parcourt **chaque** élément de `results` et produit un **nouveau tableau** de même longueur.
- **`poke`** : l’objet courant (`name`, `url`, …).
- **`index`** : position dans le tableau — **0** pour le premier, **1** pour le second, etc.

### Étape C — L’objet retourné pour chaque ligne

Pour chaque `poke`, la fonction retourne un **nouvel objet** :

```ts
{
  ...poke,
  id: index + 1,
  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
}
```

1. **`...poke`** (spread)  
   Copie toutes les propriétés de l’objet API dans le nouvel objet. Les propriétés ajoutées après peuvent compléter ou écraser en cas de même nom de clé (ici pas de collision avec `id` / `image`).

2. **`id: index + 1`**  
   Identifiant numérique dérivé de la **position dans la liste** : premier élément → `id = 1`, etc.  
   Avec cette liste ordonnée (`limit=200` depuis le début), cela correspond en pratique aux IDs nationaux 1–200 utilisés pour les sprites.

3. **`image`**  
   URL construite vers une image **official artwork** sur le dépôt GitHub des sprites PokeAPI. Le segment `${index + 1}` aligne le fichier image avec la position dans la liste (comme pour `id`).  
   La réponse `results` de la liste **ne contient pas** l’URL d’image — d’où l’enrichissement manuel.

### Étape D — Stockage dans l’état React

Le tableau `enriched` est passé à `setPokemons(enriched)`. Le state `pokemons` contient alors, pour chaque entrée, les champs API **plus** `id` et `image`, utilisés dans le JSX (`poke.image`, etc.).

## Synthèse

Le `.map` sur `data.results` **transforme** la liste minimale de l’API (`name`, `url`) en une liste **enrichie** avec un **`id`** et une **`image`** dérivés de l’index (`index + 1`), car les images ne sont pas fournies directement dans cet endpoint.

## Référence dans le code source

Voir `src/App.tsx`, bloc `useEffect` avec `fetch`, puis `const enriched = data.results.map(...)`.
