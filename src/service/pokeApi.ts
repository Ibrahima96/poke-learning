import type { PokemonApiResponse, PokemonDetails } from "../types";

export const fetchPokemons = async (
  limit: number,
  offset: number,
): Promise<PokemonApiResponse> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!res.ok) throw new Error("Error API");
  return res.json();
};

export const fetchPokemonDetails = async (
  url: string,
): Promise<PokemonDetails> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error Details");
  return res.json();
};
