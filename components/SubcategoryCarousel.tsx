"use client";

import { useRef } from "react";
import { ChevronRightIcon } from "./icons";

export default function SubcategoryCarousel({ items }: { items: readonly string[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollNext() {
    scrollerRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  }

  return (
    <div className="relative mx-auto mt-4 max-w-7xl px-4 sm:px-6">
      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((name) => (
          <div
            key={name}
            className="flex w-28 shrink-0 flex-col items-center gap-2 rounded-xl border border-zinc-200 p-3 text-center"
          >
            <div className="h-16 w-16 rounded-lg bg-zinc-100" aria-hidden="true" />
            <span className="text-xs font-medium text-zinc-700">{name}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Show next subcategories"
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-zinc-300 bg-white p-2 shadow-sm hover:bg-zinc-50 sm:flex"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
