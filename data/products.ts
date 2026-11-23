import type { Product } from "@/lib/types";

export const CATEGORY_PASTA_RICE_WORLD_CUISINE = "Pasta, rice, world cuisine";
export const CATEGORY_FRUIT_FRESH_JUICES = "Fruit, fresh juices";

// Subcategories shown in the carousel on the "Pasta, rice, world cuisine" page.
// imageUrl is best-effort: reused from a thematically fitting product photo in
// the real static.ah.nl image list the user supplied (not a dedicated category
// photo, since none existed in that list). Left empty where nothing fit well
// (falls back to the placeholder) — see the chat/README for details.
export const SUBCATEGORIES: { name: string; imageUrl: string }[] = [
  {
    name: "Asian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_56686f3259512d74526a5755326d455a7a4473703041?revLabel=1&rendition=200x200_WEBP&fileType=binary",
  },
  {
    name: "Mexican cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130313838303835?revLabel=1&rendition=200x200_WEBP&fileType=binary",
  },
  { name: "Meal kits / meal mixes", imageUrl: "" },
  {
    name: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_327056734b5a786751474f74534c6e67757942343477?revLabel=1&rendition=200x200_WEBP&fileType=binary",
  },
  {
    name: "Pasta",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130313835363234?revLabel=1&rendition=200x200_WEBP&fileType=binary",
  },
  {
    name: "Rice",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130303933393333?revLabel=1&rendition=200x200_WEBP&fileType=binary",
  },
];

// imageUrl values are real static.ah.nl photos the user retrieved manually and
// matched here by product name. ProductCard falls back to a neutral text
// placeholder whenever imageUrl is empty or fails to load.
export const PRODUCTS: Product[] = [
  {
    id: "heinz-pastasaus-nduja",
    donationEligible: false,
    name: "Pasta sauce nduja",
    brand: "Heinz",
    priceCents: 164,
    originalPriceCents: 329,
    unitSize: "350 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_5964447a33504d325459436a6b5150447551394a7377?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["bonus"],
    discountLabel: "50% off",
  },
  {
    id: "heinz-pastasaus-mascarpone-grana-padano",
    donationEligible: false,
    name: "Pasta sauce mascarpone grana padano",
    brand: "Heinz",
    priceCents: 164,
    originalPriceCents: 329,
    unitSize: "350 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_383430796d79674c51397153726b77616a2d75447851?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["bonus"],
    discountLabel: "50% off",
  },
  {
    id: "heinz-pastasaus-cherry-tomato-basil",
    donationEligible: false,
    name: "Pasta sauce cherry tomato & basil",
    brand: "Heinz",
    priceCents: 189,
    originalPriceCents: 379,
    unitSize: "490 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_386e675a776f706851485350647543615237615a4d51?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["bonus", "vegan"],
    discountLabel: "50% off",
  },
  {
    id: "cappelletti-prosciutto-crudo",
    donationEligible: false,
    name: "Cappelletti prosciutto crudo",
    priceCents: 249,
    unitSize: "250 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_327056734b5a786751474f74534c6e67757942343477?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "kokosmelk",
    donationEligible: true,
    name: "Coconut milk",
    priceCents: 127,
    unitSize: "200 ml",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Asian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_3462626452364d5751634b764e30455a43324a332d41?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "conimex-kroepoek-bali",
    donationEligible: false,
    name: "Prawn crackers Bali",
    brand: "Conimex",
    priceCents: 189,
    unitSize: "75 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Asian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_56686f3259512d74526a5755326d455a7a4473703041?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "conimex-kroepoek-naturel",
    donationEligible: false,
    name: "Prawn crackers plain",
    brand: "Conimex",
    priceCents: 169,
    unitSize: "73 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Asian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_6e666f3368387744534157424266635136336f704b41?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "excellent-girasoli-geitenkaas-honing",
    donationEligible: false,
    name: "Excellent Girasoli goat cheese with honey",
    priceCents: 319,
    unitSize: "250 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_564d51474265493653486d6c436e5a3131466b666477?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["vegetarian"],
  },
  {
    id: "tagliatelle-all-uovo",
    donationEligible: false,
    name: "Tagliatelle all'uovo",
    priceCents: 389,
    unitSize: "500 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Pasta",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130313835363234?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["vegetarian"],
  },
  {
    id: "verse-ravioli-5-formaggio",
    donationEligible: false,
    name: "Fresh ravioli 5 formaggio",
    priceCents: 249,
    unitSize: "250 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_5a32774b756f636154476169457a5744586d767a7377?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "zongedroogde-tomaten",
    donationEligible: false,
    name: "Sun-dried tomatoes",
    priceCents: 159,
    unitSize: "285 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_43545239393530343638?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "basmatirijst",
    donationEligible: true,
    name: "Basmati rice",
    priceCents: 165,
    unitSize: "1 kg",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Rice",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130303933393333?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["vegan"],
  },
  {
    id: "excellent-winterpasta",
    donationEligible: false,
    name: "Excellent Winter pasta",
    priceCents: 139,
    unitSize: "250 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Pasta",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4b64464e6c50756f516c5370494b6566424952743267?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "groene-pesto",
    donationEligible: false,
    name: "Green pesto",
    priceCents: 113,
    unitSize: "190 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    // Two different URLs were supplied for this exact name; the other is
    // https://static.ah.nl/dam/product/AHI_503742304a6a6c68524853506d506c49544d71452d41?revLabel=1&rendition=200x200_WEBP&fileType=binary
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130313532323734?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "gnocchi",
    donationEligible: false,
    name: "Gnocchi",
    priceCents: 149,
    unitSize: "500 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Pasta",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130313135383434?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["vegan"],
  },
  {
    id: "gebakken-uitjes",
    donationEligible: false,
    name: "Fried onions",
    priceCents: 149,
    unitSize: "150 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Asian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130303734343438?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["vegan"],
  },
  {
    id: "tomatenpuree",
    donationEligible: true,
    name: "Tomato puree",
    priceCents: 49,
    unitSize: "70 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    // Two different URLs were supplied for this exact name; the other is
    // https://static.ah.nl/dam/product/AHI_4354523130313139343537?revLabel=1&rendition=200x200_WEBP&fileType=binary
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130313139343536?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "mutti-polpa-tomatenpulp",
    donationEligible: true,
    name: "Polpa fine tomato pulp",
    brand: "Mutti",
    priceCents: 199,
    unitSize: "425 ml",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Italian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_6d757a4875795246543336715068446468425f544e41?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: [],
  },
  {
    id: "penne",
    donationEligible: true,
    name: "Penne",
    priceCents: 63,
    unitSize: "500 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Pasta",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_43545239393232393430?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["vegan"],
  },
  {
    id: "woknoedels-volkoren",
    donationEligible: false,
    name: "Wholewheat wok noodles",
    priceCents: 129,
    unitSize: "250 g",
    category: CATEGORY_PASTA_RICE_WORLD_CUISINE,
    subcategory: "Asian cuisine",
    imageUrl:
      "https://static.ah.nl/dam/product/AHI_4354523130313833363134?revLabel=1&rendition=200x200_WEBP&fileType=binary",
    badges: ["vegan"],
  },
  // Different department on purpose: used to test grouping-by-department in the cart (step 4).
  {
    id: "kanzi-appels-zak",
    donationEligible: false,
    name: "Kanzi apples bag",
    priceCents: 349,
    unitSize: "1 kg",
    category: CATEGORY_FRUIT_FRESH_JUICES,
    subcategory: "Fresh fruit",
    imageUrl: "",
    badges: [],
  },
];
