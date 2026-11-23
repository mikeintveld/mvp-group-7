export type FilterChip = { label: string; count: number };

// Visual only for now — clicking a chip does not filter the grid yet.
export default function FilterChips({ chips }: { chips: FilterChip[] }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 sm:px-6">
      {chips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:border-accent hover:text-accent"
        >
          {chip.label} <span className="text-zinc-400">{chip.count}</span>
        </button>
      ))}
    </div>
  );
}
