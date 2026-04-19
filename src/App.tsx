import { useEffect, useMemo, useRef, useState } from "react"
import usePokemons from "./hooks/usePokemons"
import PokemonCard from "./components/PokemonCard"
import SearchBar from "./components/SearchBar"
import LoadMoreButton from "./components/LoadMoreButton"
import PokemonModal from "./components/PokemonModal"
import type { PokemonItem } from "./types"

type DisplayedPokemon = PokemonItem & {
  phase: "enter" | "idle" | "exit"
  order: number
};

const ENTER_DURATION = 420
const EXIT_DURATION = 260

function App() {
  const { pokemons, loadMore, loading } = usePokemons()
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<PokemonItem | null>(null)
  const [displayedPokemons, setDisplayedPokemons] = useState<DisplayedPokemon[]>([])
  const animationTimers = useRef(new Map<number, number>())

  const filtered = useMemo(
    () =>
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [pokemons, search],
  )

  useEffect(() => {
    setDisplayedPokemons((current) => {
      const currentMap = new Map(current.map((pokemon) => [pokemon.id, pokemon]))
      const nextIds = new Set(filtered.map((pokemon) => pokemon.id))
      const next: DisplayedPokemon[] = []

      filtered.forEach((pokemon, order) => {
        const existing = currentMap.get(pokemon.id)

        if (existing) {
          if (existing.phase === "exit") {
            const timer = animationTimers.current.get(pokemon.id)
            if (timer !== undefined) {
              window.clearTimeout(timer)
              animationTimers.current.delete(pokemon.id)
            }
          }

          next.push({
            ...existing,
            ...pokemon,
            order,
            phase: existing.phase === "enter" ? "enter" : "idle",
          })
          return
        }

        next.push({
          ...pokemon,
          order,
          phase: "enter",
        })
      })

      current.forEach((pokemon) => {
        if (!nextIds.has(pokemon.id)) {
          next.push({
            ...pokemon,
            phase: "exit",
            order: pokemon.order,
          })
        }
      })

      return next.sort((a, b) => a.order - b.order)
    })
  }, [filtered])

  useEffect(() => {
    displayedPokemons.forEach((pokemon) => {
      if (pokemon.phase === "enter" && !animationTimers.current.has(pokemon.id)) {
        const timer = window.setTimeout(() => {
          setDisplayedPokemons((current) =>
            current.map((item) =>
              item.id === pokemon.id && item.phase === "enter"
                ? { ...item, phase: "idle" }
                : item,
            ),
          )
          animationTimers.current.delete(pokemon.id)
        }, ENTER_DURATION)

        animationTimers.current.set(pokemon.id, timer)
      }

      if (pokemon.phase === "exit" && !animationTimers.current.has(pokemon.id)) {
        const timer = window.setTimeout(() => {
          setDisplayedPokemons((current) =>
            current.filter((item) => item.id !== pokemon.id),
          )
          animationTimers.current.delete(pokemon.id)
        }, EXIT_DURATION)

        animationTimers.current.set(pokemon.id, timer)
      }
    })

    const activeIds = new Set(displayedPokemons.map((pokemon) => pokemon.id))
    animationTimers.current.forEach((timer, id) => {
      if (!activeIds.has(id)) {
        window.clearTimeout(timer)
        animationTimers.current.delete(id)
      }
    })
  }, [displayedPokemons])

  useEffect(() => {
    return () => {
      animationTimers.current.forEach((timer) => window.clearTimeout(timer))
      animationTimers.current.clear()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-100">
              <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
              Arcade pokedex
            </span>
            <span className="rounded-full border border-white/10 bg-slate-950/20 px-4 py-2 text-xs text-slate-100/80">
              {loading ? "Chargement en cours" : `${pokemons.length} cartes chargees`}
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-200/80">
                Explore ton equipe
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-black leading-none text-white sm:text-6xl">
                Pokedex
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200/80 sm:text-lg">
                Cherche, decouvre et ouvre chaque carte comme un sticker de collection.
                L&apos;interface est pensee pour donner envie de parcourir toute la liste.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-slate-950/25 p-4 text-white shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Visibles</p>
                <p className="mt-2 text-3xl font-black">{filtered.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/25 p-4 text-white shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Charges</p>
                <p className="mt-2 text-3xl font-black">{pokemons.length}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/25 p-4 text-white shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Page</p>
                <p className="mt-2 text-3xl font-black">20</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </header>

        <section className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-200/70">
            {filtered.length} resultat{filtered.length > 1 ? "s" : ""}
          </p>
          <p className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-slate-100/80">
            {search ? `Filtre: ${search}` : "Aucun filtre actif"}
          </p>
        </section>

        {displayedPokemons.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center backdrop-blur-sm">
            <div className="max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/80">
                Aucun resultat
              </p>
              <h2 className="mt-3 text-2xl font-black text-white">
                On n&apos;a rien trouve ici.
              </h2>
              <p className="mt-3 text-slate-200/75">
                Essaie un autre nom de Pokemon ou vide la recherche pour revoir tout le
                bestiaire.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {displayedPokemons.map((pokemon, index) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                index={index}
                phase={pokemon.phase}
                onClick={setSelected}
              />
            ))}
          </div>
        )}

        <div className="mt-10">
          <LoadMoreButton onClick={loadMore} loading={loading} />
        </div>
      </main>

      {selected && (
        <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

export default App
