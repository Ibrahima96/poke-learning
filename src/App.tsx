import { useEffect, useState } from "react"

function App() {
    const [pokemons, setPokemons] = useState<IPokemons[]>([])
    const [search, setSearch] = useState<string>("")
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
            .then(res => res.json())
            .then(data => {

                // 👉 L’API ne donne pas directement les images ici → on les construit
                const enriched = data.results.map((poke: IPokemons, index: number) => ({
                    ...poke,
                    id: index + 1,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
                }))
                setPokemons(enriched)
            })
    }, [])

    //logique recherche
    const filtered = pokemons.filter((poke) => (
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
            <div className="max-w-xl mx-auto px-4 space-y-4 mt-32   ">
                {filtered.map((poke) => (
                
                        <div className="shadow bg-gray-100 py-8 text-center rounded justify-center items-center w-full mx-auto">
                            <p  key={poke.name}>{poke.name}</p>
                            <img className="block mx-auto" src={poke.image} width="80" />
                        </div>
                    
                ))}
            </div>
        </>
    )
}

export default App
