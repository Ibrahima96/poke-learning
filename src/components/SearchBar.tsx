type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
        Recherche rapide
      </label>
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-200/70"
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
          className="w-full rounded-full border border-white/10 bg-white/10 px-14 py-4 text-base text-white placeholder:text-slate-200/45 shadow-[0_18px_50px_rgba(15,23,42,0.22)] outline-none transition focus:border-amber-200/50 focus:bg-white/15 focus:shadow-[0_18px_70px_rgba(251,191,36,0.15)]"
        />
      </div>
      <p className="mt-3 text-sm text-slate-200/60">
        Tape le nom d&apos;un Pokemon pour filtrer instantanement la liste.
      </p>
    </div>
  )
}
