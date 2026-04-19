import { useEffect, useState } from "react"

// useState → stocker des données dynamiques
// useEffect → lancer du code au chargement
function App() {
    const [pokemons, setPokemons] = useState<any[]>([])
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
            .then(res => res.json())
            .then(data => {
                setPokemons(data.results)
            })
    }, [])
    
    return (
        <>
            <p className="max-xl mx-auto px-4 mt-4 font-semibold">Nombre: {pokemons.length}</p>
            <div className="max-w-xl mx-auto px-4 space-y-4 mt-32  ">
                {pokemons.map((poke) => (
                    <p className="shadow bg-gray-100 py-8 text-center rounded" key={poke.name}>{poke.name}</p>
                ))}
            </div>
        </>
    )
}

export default App
