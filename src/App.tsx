import { useEffect, useState } from "react"

// useState → stocker des données dynamiques
// useEffect → lancer du code au chargement
function App() {
    const [pokemons, setPokemons] = useState<IPokemons[]>([])
    const [search, setSearch] = useState<string>("")
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
            .then(res => res.json())
            .then(data => {
                setPokemons(data.results)
            })
    }, [])

    //logique recherche
    const filtered = pokemons.filter((poke)=>(
        poke.name.toLowerCase().includes(search.toLowerCase())
    ))

    return (
        <>

            <p className="max-w-4xl mx-auto px-4 mt-4 font-semibold">
                <input type="search"
                 value={search} 
                 onChange={(e) => setSearch(e.target.value)} 
                 className="w-full px-4 rounded py-2 border"
                 />
            </p>
            <div className="max-w-xl mx-auto px-4 space-y-4 mt-32  ">
                {filtered.map((poke) => (
                    <p className="shadow bg-gray-100 py-8 text-center rounded" key={poke.name}>{poke.name}</p>
                ))}
            </div>
        </>
    )
}

export default App
