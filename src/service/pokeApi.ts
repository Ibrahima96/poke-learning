export const fetchPokemons = async (limit: number, offset: number) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!res.ok) throw new Error("Error API");
  return res.json();
};

export const fetchPokemonDetails = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error Details");
  return res.json();
};
