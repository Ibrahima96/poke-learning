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

  useEffect(() => {
    if (!pokemon) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [pokemon, onClose])

  if (!pokemon) return null

  const band = modalBands[(pokemon.id - 1) % modalBands.length]
  const artwork =
    details?.sprites.other["official-artwork"].front_default ?? pokemon.image

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-md sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div className="flex h-full w-full items-end justify-center p-0 sm:h-auto sm:items-center sm:px-4 sm:py-8">
        <div
          className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-white text-slate-900 shadow-[0_35px_120px_rgba(15,23,42,0.45)] sm:rounded-[2rem]"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pokemon-modal-title"
        >
          <div className={`h-24 bg-gradient-to-r sm:h-24 ${band}`} />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 sm:h-10 sm:w-10"
            aria-label="Fermer"
            type="button"
          >
            X
          </button>

          <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2 sm:px-8 sm:pb-8 sm:pt-0">
            <div className="-mt-10 flex justify-center sm:-mt-16">
              <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:h-32 sm:w-32 sm:p-4">
                <img
                  src={artwork}
                  alt={details?.name ?? pokemon.name}
                  className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                />
              </div>
            </div>

            <div className="mt-3 text-center sm:mt-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-slate-500 sm:text-xs">
                Fiche detaillee
              </p>
              <h2
                id="pokemon-modal-title"
                className="mt-2 text-2xl font-black capitalize text-slate-950 sm:mt-3 sm:text-3xl"
              >
                {details?.name ?? pokemon.name}
              </h2>
              <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                #{pokemon.id} - {details ? "Carte complete" : "Chargement des stats..."}
              </p>
            </div>

            {!details ? (
              <div className="mt-6 rounded-3xl bg-slate-100 p-5 sm:mt-8 sm:p-6">
                <div className="space-y-3">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-[0.95fr_1.05fr] sm:mt-8">
                <div className="rounded-3xl bg-slate-950 p-4 text-white sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
                    Portrait
                  </p>
                  <p className="mt-3 text-sm text-white/70">
                    Le visuel officiel de la carte selectionnee.
                  </p>
                  <div className="mt-5 rounded-[1.5rem] bg-white/10 p-3 sm:mt-6 sm:p-4">
                    <img
                      src={artwork}
                      alt={details.name}
                      className="mx-auto h-32 w-32 object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.35)] sm:h-40 sm:w-40"
                    />
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4 sm:p-5">
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
    </div>
  )
}
