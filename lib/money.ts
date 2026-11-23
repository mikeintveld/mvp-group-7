import type { Product } from "./types";

// All prices are stored in cents to avoid floating point rounding errors.
export function formatCents(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function discountCents(product: Pick<Product, "priceCents" | "originalPriceCents">): number {
  if (!product.originalPriceCents) return 0;
  return Math.max(0, product.originalPriceCents - product.priceCents);
}
