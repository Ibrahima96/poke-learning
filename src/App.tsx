

function App() {
    const pokemons: string[] = ["pikachu", "bulbasaur", "charmander"]

    return (
        <>
            <div className="max-w-xl mx-auto px-4 space-y-4 mt-32  ">
                {pokemons.map((poke) => (
                    <p className="shadow bg-gray-100 py-8 text-center rounded" key={poke}>{poke}</p>
                ))}
            </div>
        </>
    )
}

export default App
