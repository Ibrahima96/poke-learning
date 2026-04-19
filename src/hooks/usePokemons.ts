import { useEffect, useState } from "react";
import { fetchPokemons } from "../service/pokeApi";
import type { PokemonItem } from "../types";

// Hook pour charger des Pokemon par pages.
export default function usePokemons() {
  // Pokemon deja charges.
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  // Point de depart de la page courante.
  const [offset, setOffset] = useState<number>(0);
  // Indique si le chargement est en cours.
  const [loading, setLoading] = useState<boolean>(false);
  // Taille de chaque page.
  const LIMIT = 20;

  // Recharge une page a chaque changement d'offset.
  useEffect(() => {
    loadMore();
  }, [offset]);

  // Recupere la page courante et l'ajoute a la liste.
  async function loadMore() {
    setLoading(true);
    try {
      const data = await fetchPokemons(LIMIT, offset);

      // On ajoute un id et l'image officielle.
      const enriched = data.results.map((poke, index) => {
        const id = offset + index + 1;
        return {
          ...poke,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });

      // On garde les Pokemon deja charges et on ajoute la nouvelle page.
      setPokemons((prev) => [...prev, ...enriched]);
    } catch (err) {
      // Erreur ignoree ici.
      console.error(err);
    } finally {
      // Fin du chargement.
      setLoading(false);
    }
  }

  return {
    pokemons,
    // Passe a la page suivante.
    loadMore: () => setOffset((prev) => prev + LIMIT),
    loading,
  };
}
