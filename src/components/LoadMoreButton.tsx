type LoadMoreButtonProps = {
  onClick: () => void;
  loading: boolean;
};

export default function LoadMoreButton({
  onClick,
  loading,
}: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 px-6 py-4 text-xs font-black uppercase tracking-[0.24em] text-slate-950 shadow-[0_18px_55px_rgba(251,191,36,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(251,191,36,0.45)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-72 sm:px-8 sm:text-sm sm:tracking-[0.28em]"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/25 border-t-slate-950" />
        )}
        {loading ? "Chargement..." : "Charger plus"}
      </button>
    </div>
  )
}
