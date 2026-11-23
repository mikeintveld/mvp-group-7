import Breadcrumb from "./Breadcrumb";
import SubcategoryCarousel from "./SubcategoryCarousel";
import FilterChips, { type FilterChip } from "./FilterChips";
import ProductGrid from "./ProductGrid";
import { CATEGORY_PASTA_RICE_WORLD_CUISINE, PRODUCTS, SUBCATEGORIES } from "@/data/products";

export default function ProductOverview() {
  const products = PRODUCTS.filter((product) => product.category === CATEGORY_PASTA_RICE_WORLD_CUISINE);

  const chips: FilterChip[] = [
    { label: "Bonus", count: products.filter((p) => p.badges.includes("bonus")).length },
    { label: "New", count: products.filter((p) => p.badges.includes("new")).length },
    { label: "Organic", count: products.filter((p) => p.badges.includes("organic")).length },
    { label: "Vegan", count: products.filter((p) => p.badges.includes("vegan")).length },
    { label: "Vegetarian", count: products.filter((p) => p.badges.includes("vegetarian")).length },
  ];

  return (
    <>
      <Breadcrumb category={CATEGORY_PASTA_RICE_WORLD_CUISINE} />
      <h1 className="mx-auto w-full max-w-7xl px-4 pt-4 text-3xl font-bold text-zinc-900 sm:px-6">
        {CATEGORY_PASTA_RICE_WORLD_CUISINE}
      </h1>
      <SubcategoryCarousel items={SUBCATEGORIES} />
      <FilterChips chips={chips} />
      <ProductGrid products={products} />
    </>
  );
}
