"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatCents } from "@/lib/money";
import { useCart } from "@/context/CartContext";
import { HeartIcon, LeafIcon, MinusIcon, PlusIcon, SproutIcon, TrashIcon } from "./icons";

export default function ProductCard({ product }: { product: Product }) {
  const { getQuantity, add, increment, decrement } = useCart();
  const quantity = getQuantity(product.id);
  const isBonus = product.badges.includes("bonus") || Boolean(product.discountLabel);
  const hasOldPrice = Boolean(product.originalPriceCents);
  const displayName = product.brand ? `${product.brand} ${product.name}` : product.name;

  return (
    <article className="flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f2ede4]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-4"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs font-medium text-zinc-500">
            {displayName}
          </div>
        )}

        <button
          type="button"
          aria-label={`Add ${displayName} to wishlist`}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm hover:text-accent"
        >
          <HeartIcon className="h-4 w-4" />
        </button>

        <div className="absolute bottom-2 left-2 flex flex-col items-start gap-1">
          {(product.badges.includes("vegan") || product.badges.includes("organic")) && (
            <div className="flex gap-1">
              {product.badges.includes("vegan") && (
                <span
                  title="Vegan"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-green-700 shadow-sm"
                >
                  <LeafIcon className="h-3 w-3" />
                </span>
              )}
              {product.badges.includes("organic") && (
                <span
                  title="Organic"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-green-800 shadow-sm"
                >
                  <SproutIcon className="h-3 w-3" />
                </span>
              )}
            </div>
          )}
          {product.discountLabel && (
            <span className="rounded bg-orange-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
              {product.discountLabel}
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-1 flex-col">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm text-zinc-900">{displayName}</h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-zinc-900">{formatCents(product.priceCents)}</span>
              {hasOldPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {formatCents(product.originalPriceCents!)}
                </span>
              )}
            </div>
            <span className="text-xs text-zinc-500">{product.unitSize}</span>
          </div>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => add(product.id)}
              aria-label={`Add ${displayName} to basket`}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${
                isBonus ? "bg-orange-600 hover:bg-orange-700" : "bg-accent hover:brightness-110"
              }`}
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          ) : (
            <div
              className={`flex shrink-0 items-center gap-1 rounded-full text-white shadow-sm ${
                isBonus ? "bg-orange-600" : "bg-accent"
              }`}
            >
              <button
                type="button"
                onClick={() => decrement(product.id)}
                aria-label={
                  quantity === 1
                    ? `Remove ${displayName} from basket`
                    : `Decrease quantity of ${displayName}`
                }
                className="flex h-9 w-9 items-center justify-center hover:brightness-110"
              >
                {quantity === 1 ? <TrashIcon className="h-4 w-4" /> : <MinusIcon className="h-4 w-4" />}
              </button>
              <span className="min-w-[1.25rem] text-center text-sm font-semibold" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => increment(product.id)}
                aria-label={`Increase quantity of ${displayName}`}
                className="flex h-9 w-9 items-center justify-center hover:brightness-110"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
