//https://pokeapi.co/api/v2/pokemon/ditto

import { useEffect } from "react";

export const fecherPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  console.log(data)
};



useEffect(()=>{
fecherPokemons()
},[])
