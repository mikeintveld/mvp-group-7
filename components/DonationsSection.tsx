import { PRODUCTS } from "@/data/products";
import ProductGrid from "./ProductGrid";

const DONATION_PRODUCTS = PRODUCTS.filter((product) => product.donationEligible);

export default function DonationsSection() {
  return (
    <section className="mt-8">
      <h2 className="mb-1 border-b border-zinc-200 pb-2 text-lg font-bold text-zinc-900">Donations</h2>
      <p className="mb-4 mt-2 text-sm text-zinc-600">
        Add products to donate to the food bank. They are kept separate from your own groceries.
      </p>
      <ProductGrid products={DONATION_PRODUCTS} variant="donation" padded={false} />
    </section>
  );
}
