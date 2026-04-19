type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="group mx-auto w-full max-w-2xl transition duration-300 focus-within:-translate-y-1 focus-within:scale-[1.01]">
      <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70 transition duration-300 group-focus-within:text-amber-100">
        Recherche rapide
      </label>
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/10 p-[1px] shadow-[0_18px_50px_rgba(15,23,42,0.22)] transition duration-300 group-focus-within:border-amber-200/40 group-focus-within:shadow-[0_18px_70px_rgba(251,191,36,0.18)]">
        <div className="absolute inset-0 rounded-[1.6rem] bg-gradient-to-r from-amber-300/0 via-amber-200/20 to-cyan-300/0 opacity-0 blur-xl transition duration-300 group-focus-within:opacity-100" />
        <div className="relative rounded-[1.55rem] bg-slate-950/25 px-4 py-4 backdrop-blur-xl sm:px-5">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-200/70 transition duration-300 group-focus-within:scale-110 group-focus-within:text-amber-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Rechercher un Pokemon..."
            aria-label="Rechercher un Pokemon"
            className="w-full rounded-full border border-transparent bg-transparent px-14 py-1.5 text-sm text-white placeholder:text-slate-200/45 outline-none transition duration-300 placeholder:transition sm:text-base group-focus-within:placeholder:text-slate-200/60"
          />
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-200/60 transition duration-300 group-focus-within:text-slate-100/80">
        Tape le nom d&apos;un Pokemon pour filtrer instantanement la liste.
      </p>
    </div>
  )
}
