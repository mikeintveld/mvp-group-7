"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { discountCents, formatCents } from "@/lib/money";

type CartSummaryProps = {
  items: { product: Product; quantity: number }[];
};

export default function CartSummary({ items }: CartSummaryProps) {
  const [message, setMessage] = useState<string | null>(null);

  const itemCount = items.reduce((sum, { quantity }) => sum + quantity, 0);
  const subtotalCents = items.reduce((sum, { product, quantity }) => sum + product.priceCents * quantity, 0);
  const bonusCents = items.reduce((sum, { product, quantity }) => sum + discountCents(product) * quantity, 0);

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="rounded-xl border border-zinc-200 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-700">Groceries ({itemCount})</span>
          <span className="font-medium text-zinc-900">{formatCents(subtotalCents)}</span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="font-medium text-orange-600">Bonus savings</span>
          <span className="font-medium text-orange-600">{formatCents(bonusCents)}</span>
        </div>

        <hr className="my-3 border-zinc-200" />

        <div className="flex items-center justify-between">
          <span className="font-bold text-zinc-900">Total</span>
          <span className="font-bold text-zinc-900">{formatCents(subtotalCents)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setMessage("Checkout will be available in a later phase")}
        className="mt-4 w-full rounded-full bg-accent px-6 py-3 text-center text-base font-semibold text-white hover:brightness-110"
      >
        Checkout ›
      </button>

      {message && (
        <p role="status" className="mt-3 text-center text-sm text-zinc-600">
          {message}
        </p>
      )}
    </aside>
  );
}
