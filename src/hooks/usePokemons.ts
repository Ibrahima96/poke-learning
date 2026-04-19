import { useEffect, useState } from "react";
import { fetchPokemons } from "../service/pokeApi";

export default function usePokemons() {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(false);

  const LIMIT = 20;
  useEffect(() => {
    loadMore();
  }, [offset]);

  const loadMore = async () => {
    setloading(true);
    try {
      const data = await fetchPokemons(LIMIT, offset);
      const enriched = data.results.map((poke: any, index: number) => {
        const id = offset + index + 1;
        return {
          ...poke,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });
      setPokemons((prev) => [...prev, ...enriched]);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  return {
    pokemons,
    loadMore: () => setOffset((prev) => prev + LIMIT),
    loading,
  };
}
