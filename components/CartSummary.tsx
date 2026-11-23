"use client";

import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/lib/types";
import { discountCents, formatCents } from "@/lib/money";
import { useCart } from "@/context/CartContext";

type CartLine = { product: Product; quantity: number };

function resolveLines(items: Record<string, number>): CartLine[] {
  return Object.entries(items)
    .map(([productId, quantity]) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      return product ? { product, quantity } : null;
    })
    .filter((entry): entry is CartLine => entry !== null);
}

// Reads the cart context directly (instead of taking items as props) so the
// receipt re-renders immediately when +/- is clicked anywhere, including in
// the Donations section further down the page.
export default function CartSummary() {
  const { state } = useCart();
  const [message, setMessage] = useState<string | null>(null);

  const groceryLines = resolveLines(state.groceries);
  const donationLines = resolveLines(state.donation);

  const groceriesCount = groceryLines.reduce((sum, { quantity }) => sum + quantity, 0);
  const groceriesSubtotalCents = groceryLines.reduce(
    (sum, { product, quantity }) => sum + product.priceCents * quantity,
    0,
  );
  const bonusSavingsCents = groceryLines.reduce(
    (sum, { product, quantity }) => sum + discountCents(product) * quantity,
    0,
  );

  const donationSubtotalCents = donationLines.reduce(
    (sum, { product, quantity }) => sum + product.priceCents * quantity,
    0,
  );

  const grandTotalCents = groceriesSubtotalCents + donationSubtotalCents;
  const hasDonations = donationLines.length > 0;

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="overflow-hidden rounded-xl border border-zinc-200">
        <div className="bg-zinc-50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-700">Groceries ({groceriesCount})</span>
            <span className="font-medium text-zinc-900">{formatCents(groceriesSubtotalCents)}</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="font-medium text-orange-600">Bonus savings</span>
            <span className="font-medium text-orange-600">{formatCents(bonusSavingsCents)}</span>
          </div>

          <hr className="my-3 border-zinc-200" />

          <div className="flex items-center justify-between">
            <span className="font-bold text-zinc-900">Groceries total</span>
            <span className="font-bold text-zinc-900">{formatCents(groceriesSubtotalCents)}</span>
          </div>
        </div>

        {hasDonations && (
          <div className="bg-donation-light p-4 text-donation-text">
            <div className="space-y-2 text-sm">
              {donationLines.map(({ product, quantity }) => {
                const displayName = product.brand ? `${product.brand} ${product.name}` : product.name;
                return (
                  <div key={product.id} className="flex items-center justify-between gap-2">
                    <span className="truncate">
                      {quantity}× {displayName}
                    </span>
                    <span className="shrink-0 font-medium">{formatCents(product.priceCents * quantity)}</span>
                  </div>
                );
              })}
            </div>

            <hr className="my-3 border-donation-text/20" />

            <div className="flex items-center justify-between">
              <span className="font-bold">Donations total</span>
              <span className="font-bold">{formatCents(donationSubtotalCents)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between bg-white p-4">
          <span className="text-base font-bold text-zinc-900">Total</span>
          <span className="text-lg font-bold text-zinc-900">{formatCents(grandTotalCents)}</span>
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
