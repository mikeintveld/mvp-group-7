"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatCents } from "@/lib/money";
import { useCart } from "@/context/CartContext";
import { PlusIcon, TrashIcon } from "./icons";

export default function CartLineItem({ product, quantity }: { product: Product; quantity: number }) {
  const { increment, remove } = useCart();
  const displayName = product.brand ? `${product.brand} ${product.name}` : product.name;

  return (
    <div className="flex items-center gap-4 border-b border-zinc-200 py-4 last:border-b-0">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f2ede4]">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill sizes="64px" className="object-contain p-1" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-1 text-center text-[9px] font-medium text-zinc-500">
            {displayName}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900">{displayName}</p>
        <p className="text-sm text-zinc-500">
          {formatCents(product.priceCents)} <span className="text-xs text-zinc-400">{product.unitSize}</span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => remove(product.id)}
          aria-label={`Remove ${displayName} from basket`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 hover:border-red-400 hover:text-red-600"
        >
          <TrashIcon className="h-4 w-4" />
        </button>

        <span
          className="flex h-9 min-w-9 items-center justify-center rounded-full border border-zinc-300 px-2 text-sm font-semibold text-zinc-900"
          aria-live="polite"
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => increment(product.id)}
          aria-label={`Increase quantity of ${displayName}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white hover:brightness-110"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
