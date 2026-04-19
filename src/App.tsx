import { useState } from "react"

// useState → stocker des données dynamiques

function App() {
    const data: string[] = ["pikachu", "bulbasaur", "charmander"]
    const [pokemons, setPokemons] = useState<string[]>(data)
    return (
        <>
            <p className="max-xl mx-auto px-4 mt-4 font-semibold">Nombre: {pokemons.length}</p>
            <div className="max-w-xl mx-auto px-4 space-y-4 mt-32  ">
                {pokemons.map((poke) => (
                    <p className="shadow bg-gray-100 py-8 text-center rounded" key={poke}>{poke}</p>
                ))}
            </div>
        </>
    )
}

export default App
