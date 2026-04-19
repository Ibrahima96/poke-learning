import { useEffect, useState } from "react"

function App() {
    const [pokemons, setPokemons] = useState<IPokemons[]>([])
    const [search, setSearch] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    //avoir plus de pokemon
    const [offset, setOffset] = useState<number>(0)
    const LIMIT = 20
    useEffect(() => {
        setLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
            .then(res => res.json())
            .then(data => {

                // 👉 L’API ne donne pas directement les images ici → on les construit
                const enriched = data.results.map((poke: IPokemons, index: number) => {
                    const id = offset + index + 1
                    return {
                        ...poke,
                        id,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    }
                })
                setPokemons(prev => [...prev, ...enriched])
                setLoading(false)
            })
    }, [offset])

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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4  ">
                {filtered.map((poke) => (

                    <div className="shadow bg-gray-100 py-8 text-center rounded justify-center items-center w-sm mx-auto">
                        <p key={poke.name}>{poke.name}</p>
                        <img className="block mx-auto" src={poke.image} width="80" />
                    </div>

                ))}

            </div>
            <button className="block mx-auto  " onClick={() => setOffset(prev => prev + LIMIT)}>
               {loading ? "chargement ..." : " Charger plus"}
            </button>
        </>
    )
}

export default App
