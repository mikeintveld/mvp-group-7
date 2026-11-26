"use client";

import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/lib/types";
import CartLineItem from "./CartLineItem";
import CartSummary from "./CartSummary";
import DonationsSection from "./DonationsSection";
import EmptyCart from "./EmptyCart";

type CartLine = { product: Product; quantity: number };

export default function CartPageContent() {
  const { state } = useCart();

  const items: CartLine[] = Object.entries(state.groceries)
    .map(([productId, quantity]) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      return product ? { product, quantity } : null;
    })
    .filter((entry): entry is CartLine => entry !== null);

  const groups = new Map<string, CartLine[]>();
  for (const item of items) {
    const group = groups.get(item.product.category) ?? [];
    group.push(item);
    groups.set(item.product.category, group);
  }

  return (
    <>
      <h1 className="mx-auto w-full max-w-7xl px-4 pt-6 text-3xl font-bold text-zinc-900 sm:px-6">Shopping basket</h1>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            [...groups.entries()].map(([category, groupItems]) => (
              <section key={category} className="mb-8">
                <h2 className="mb-2 border-b border-zinc-200 pb-2 text-lg font-bold text-zinc-900">{category}</h2>
                <div>
                  {groupItems.map(({ product, quantity }) => (
                    <CartLineItem key={product.id} product={product} quantity={quantity} />
                  ))}
                </div>
              </section>
            ))
          )}

          <DonationsSection />
        </div>

        {(items.length > 0 || Object.keys(state.donation).length > 0) && <CartSummary />}
      </div>
    </>
  );
}
