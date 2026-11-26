"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "./icons";

type Subcategory = { name: string; imageUrl: string };

const CARD_GAP_PX = 12; // keep in sync with the scroller's gap-3

export default function SubcategoryCarousel({ items }: { items: readonly Subcategory[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  function scrollNext() {
    const cardWidth = firstCardRef.current?.offsetWidth ?? 112;
    scrollerRef.current?.scrollBy({ left: cardWidth + CARD_GAP_PX, behavior: "smooth" });
  }

  return (
    <div className="relative mx-auto mt-4 w-full min-w-0 max-w-7xl px-4 sm:px-6">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ name, imageUrl }, index) => (
          <div
            key={name}
            ref={index === 0 ? firstCardRef : undefined}
            className="flex w-28 shrink-0 snap-start flex-col items-center gap-2 rounded-xl border border-zinc-200 p-3 text-center"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-zinc-100">
              {imageUrl && (
                <Image src={imageUrl} alt="" fill sizes="64px" className="object-contain p-1" />
              )}
            </div>
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
