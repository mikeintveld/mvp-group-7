export type FilterChip = {
  key: string;
  label: string;
  count: number;
  active: boolean;
  variant?: "default" | "donation";
};

export default function FilterChips({
  chips,
  onToggle,
}: {
  chips: FilterChip[];
  onToggle: (key: string) => void;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 sm:px-6">
      {chips.map((chip) => {
        const disabled = chip.count === 0;
        const isDonation = chip.variant === "donation";

        const colorClasses = isDonation
          ? chip.active
            ? "border-donation-text bg-donation-text text-white ring-2 ring-donation-text ring-offset-1"
            : "border-donation bg-donation text-white hover:brightness-110"
          : chip.active
            ? "border-accent bg-accent text-white"
            : "border-zinc-300 text-zinc-700 hover:border-accent hover:text-accent";

        return (
          <button
            key={chip.key}
            type="button"
            disabled={disabled}
            aria-pressed={chip.active}
            onClick={() => onToggle(chip.key)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-300 disabled:hover:text-zinc-700 ${colorClasses}`}
          >
            {chip.label} <span className={isDonation || chip.active ? "text-white/80" : "text-zinc-400"}>{chip.count}</span>
          </button>
        );
      })}
    </div>
  );
}
