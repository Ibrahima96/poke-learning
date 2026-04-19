import { useEffect, useState } from "react"
import { fetchPokemonDetails } from "../service/pokeApi"
import type { PokemonDetails, PokemonItem } from "../types"

type PokemonModalProps = {
  pokemon: PokemonItem | null;
  onClose: () => void;
};

const modalBands = [
  "from-fuchsia-500 via-rose-500 to-amber-400",
  "from-cyan-500 via-sky-500 to-indigo-500",
  "from-emerald-500 via-teal-500 to-cyan-400",
  "from-amber-400 via-orange-400 to-rose-500",
]

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const [details, setDetails] = useState<PokemonDetails | null>(null)

  useEffect(() => {
    if (!pokemon) return

    let active = true
    setDetails(null)

    fetchPokemonDetails(pokemon.url).then((response) => {
      if (active) {
        setDetails(response)
      }
    })

    return () => {
      active = false
    }
  }, [pokemon])

  if (!pokemon) return null

  const band = modalBands[(pokemon.id - 1) % modalBands.length]
  const artwork = details?.sprites.other["official-artwork"].front_default ?? pokemon.image

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white text-slate-900 shadow-[0_35px_120px_rgba(15,23,42,0.45)]">
        <div className={`h-24 bg-gradient-to-r ${band}`} />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="px-6 pb-6 pt-0 sm:px-8">
          <div className="-mt-16 flex justify-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
              <img
                src={artwork}
                alt={details?.name ?? pokemon.name}
                className="h-24 w-24 object-contain"
              />
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">
              Fiche detaillee
            </p>
            <h2 className="mt-3 text-3xl font-black capitalize text-slate-950">
              {details?.name ?? pokemon.name}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              #{pokemon.id} - {details ? "Carte complete" : "Chargement des stats..."}
            </p>
          </div>

          {!details ? (
            <div className="mt-8 rounded-3xl bg-slate-100 p-6">
              <div className="space-y-3">
                <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
                <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
                <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-200" />
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
                  Portrait
                </p>
                <p className="mt-3 text-sm text-white/70">
                  Le visuel officiel de la carte selectionnee.
                </p>
                <div className="mt-6 rounded-[1.5rem] bg-white/10 p-4">
                  <img
                    src={artwork}
                    alt={details.name}
                    className="mx-auto h-40 w-40 object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>

              <div className="rounded-3xl bg-slate-100 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Statistiques
                </p>
                <div className="mt-4 space-y-4">
                  {details.stats.map((stat) => {
                    const width = Math.min((stat.base_stat / 160) * 100, 100)

                    return (
                      <div key={stat.stat.name}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
                          <span className="capitalize">{stat.stat.name}</span>
                          <span>{stat.base_stat}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${band}`}
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
