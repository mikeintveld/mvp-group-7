import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 pb-12 sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
