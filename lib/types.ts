export type ProductBadge = "bonus" | "vegan" | "vegetarian" | "organic" | "new";

export type Product = {
  id: string;
  name: string;
  brand?: string;
  priceCents: number;
  originalPriceCents?: number;
  unitSize: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  badges: ProductBadge[];
  discountLabel?: string;
  donationEligible: boolean;
};
