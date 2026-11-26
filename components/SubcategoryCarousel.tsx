"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "./icons";

type Subcategory = { name: string; imageUrl: string };

const CARD_GAP_PX = 12; // keep in sync with the scroller's gap-3

export default function SubcategoryCarousel({
  items,
  activeName,
  onSelect,
}: {
  items: readonly Subcategory[];
  activeName: string | null;
  onSelect: (name: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLButtonElement>(null);

  function scrollNext() {
    const cardWidth = firstCardRef.current?.offsetWidth ?? 112;
    scrollerRef.current?.scrollBy({ left: cardWidth + CARD_GAP_PX, behavior: "smooth" });
  }

  return (
    <div className="relative mx-auto mt-4 w-full min-w-0 max-w-7xl px-4 sm:px-6">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ name, imageUrl }, index) => {
          const isActive = activeName === name;
          return (
            <button
              key={name}
              type="button"
              ref={index === 0 ? firstCardRef : undefined}
              onClick={() => onSelect(name)}
              aria-pressed={isActive}
              className={`flex w-28 shrink-0 snap-start flex-col items-center gap-2 rounded-xl border p-3 text-center ${
                isActive ? "border-accent bg-accent/5 ring-2 ring-accent/20" : "border-zinc-200 hover:border-accent/50"
              }`}
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-zinc-100">
                {imageUrl && (
                  <Image src={imageUrl} alt="" fill sizes="64px" className="object-contain p-1" />
                )}
              </div>
              <span className="text-xs font-medium text-zinc-700">{name}</span>
            </button>
          );
        })}
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
