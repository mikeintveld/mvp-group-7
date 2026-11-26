"use client";

import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import SubcategoryCarousel from "./SubcategoryCarousel";
import FilterChips, { type FilterChip } from "./FilterChips";
import ProductGrid from "./ProductGrid";
import { CATEGORY_PASTA_RICE_WORLD_CUISINE, PRODUCTS, SUBCATEGORIES } from "@/data/products";
import type { ProductBadge } from "@/lib/types";

const BADGE_FILTERS: { key: ProductBadge; label: string }[] = [
  { key: "bonus", label: "Bonus" },
  { key: "new", label: "New" },
  { key: "organic", label: "Organic" },
  { key: "vegan", label: "Vegan" },
  { key: "vegetarian", label: "Vegetarian" },
];

const products = PRODUCTS.filter((product) => product.category === CATEGORY_PASTA_RICE_WORLD_CUISINE);

export default function ProductOverview() {
  const [activeBadges, setActiveBadges] = useState<Set<ProductBadge>>(new Set());
  const [donationActive, setDonationActive] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  function toggleSubcategory(name: string) {
    setActiveSubcategory((prev) => (prev === name ? null : name));
  }

  function toggleChip(key: string) {
    if (key === "donation") {
      setDonationActive((prev) => !prev);
      return;
    }
    const badge = key as ProductBadge;
    setActiveBadges((prev) => {
      const next = new Set(prev);
      if (next.has(badge)) {
        next.delete(badge);
      } else {
        next.add(badge);
      }
      return next;
    });
  }

  function clearFilters() {
    setActiveBadges(new Set());
    setDonationActive(false);
    setActiveSubcategory(null);
  }

  const filteredProducts = products.filter((product) => {
    const matchesBadges = [...activeBadges].every((badge) => product.badges.includes(badge));
    const matchesDonation = !donationActive || product.donationEligible;
    const matchesSubcategory = !activeSubcategory || product.subcategory === activeSubcategory;
    return matchesBadges && matchesDonation && matchesSubcategory;
  });

  const chips: FilterChip[] = [
    ...BADGE_FILTERS.map(({ key, label }) => ({
      key,
      label,
      count: products.filter((p) => p.badges.includes(key)).length,
      active: activeBadges.has(key),
    })),
    {
      key: "donation",
      label: "Donation",
      count: products.filter((p) => p.donationEligible).length,
      active: donationActive,
      variant: "donation" as const,
    },
  ];

  return (
    <>
      <Breadcrumb category={CATEGORY_PASTA_RICE_WORLD_CUISINE} />
      <h1 className="mx-auto w-full max-w-7xl px-4 pt-4 text-3xl font-bold text-zinc-900 sm:px-6">
        {CATEGORY_PASTA_RICE_WORLD_CUISINE}
      </h1>
      <SubcategoryCarousel items={SUBCATEGORIES} activeName={activeSubcategory} onSelect={toggleSubcategory} />
      <FilterChips chips={chips} onToggle={toggleChip} />
      {filteredProducts.length === 0 ? (
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
          <p className="text-zinc-600">No products match these filters</p>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-110"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </>
  );
}
