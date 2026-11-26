import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  variant = "default",
  padded = true,
}: {
  products: Product[];
  variant?: "default" | "donation";
  padded?: boolean;
}) {
  const gridClasses = "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5";

  return (
    <div className={padded ? `mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 ${gridClasses}` : gridClasses}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
