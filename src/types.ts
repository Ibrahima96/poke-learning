export type PokemonItem = {
  name: string;
  url: string;
  id: number;
  image: string;
};

export type PokemonApiResponse = {
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type PokemonDetailStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonDetails = {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  stats: PokemonDetailStat[];
};
