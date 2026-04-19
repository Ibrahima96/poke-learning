export const fetchPokemons = async (limit: number, offset: number) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) throw new Error("Erreur API");

  return response.json();
};

export const fetchPokemonDetails = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erreur Details");
  return res.json();
};
