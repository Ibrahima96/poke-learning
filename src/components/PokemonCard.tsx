import type { PokemonItem } from "../types"

type PokemonCardProps = {
  pokemon: PokemonItem;
  index?: number;
  phase?: "enter" | "idle" | "exit";
  onClick: (pokemon: PokemonItem) => void;
};

const accentBands = [
  "from-fuchsia-400 via-rose-400 to-orange-300",
  "from-cyan-400 via-sky-400 to-indigo-400",
  "from-amber-300 via-yellow-300 to-lime-300",
  "from-emerald-400 via-teal-400 to-cyan-300",
]

export default function PokemonCard({
  pokemon,
  index = 0,
  phase = "idle",
  onClick,
}: PokemonCardProps) {
  const band = accentBands[(pokemon.id - 1) % accentBands.length]
  const animationClass =
    phase === "enter"
      ? "opacity-0 animate-fade-rise [animation-fill-mode:both]"
      : phase === "exit"
        ? "animate-fade-out [animation-fill-mode:both] pointer-events-none"
        : "opacity-100"

  return (
    <button
      type="button"
      disabled={phase === "exit"}
      onClick={() => onClick(pokemon)}
      style={{ animationDelay: `${index * 50}ms` }}
      className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/95 p-4 text-left text-slate-900 shadow-[0_18px_55px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(15,23,42,0.28)] ${animationClass}`}
    >
      <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${band}`} />
      <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-amber-300/25 blur-2xl transition duration-300 group-hover:scale-110" />
      <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-sky-300/20 blur-2xl transition duration-300 group-hover:scale-110" />

      <div className="relative flex flex-col items-center gap-4 pt-2">
        <div className="flex h-28 w-28 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-slate-100 p-3 shadow-inner">
          <div className="flex h-full w-full items-center justify-center rounded-[1.25rem] bg-white">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="h-24 w-24 object-contain drop-shadow-[0_12px_25px_rgba(15,23,42,0.2)] transition duration-300 group-hover:scale-110"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
                Pokemon
              </p>
              <h2 className="mt-2 capitalize text-xl font-black text-slate-900">
                {pokemon.name}
              </h2>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              #{pokemon.id}
            </span>
          </div>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
            Ouvrir la fiche
            <span className="text-sm transition duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </div>
    </button>
  )
}
