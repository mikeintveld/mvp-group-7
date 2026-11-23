# GroceryShare (prototype)

Student prototype for RSM "Implementing Innovations", Group 7. This is the
**basis** phase: a rebuilt supermarket product overview page plus a working
shopping cart. The donation feature (One-Tap Product Donation) is not built
yet — see "Future work" below.

No backend, no login, no payment. Everything runs client-side on mock data.

## Running the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or whichever port is
printed in the terminal — `next dev` picks another free port if 3000 is
already in use).

- `/` and `/producten` — product overview page ("Pasta, rice, world cuisine")
- `/winkelmandje` — shopping basket

Production build / checks:

```bash
npm run build
npm run lint
npx tsc --noEmit
```

## Where things live

- `data/products.ts` — all mock products (the single source of truth for the
  catalog)
- `lib/types.ts` — the `Product` type and `ProductBadge` union
- `lib/money.ts` — cent-based price formatting and bonus/discount math
- `lib/constants.ts` — `APP_NAME` (change this one constant to rename the app)
- `context/CartContext.tsx` — cart state (`add`/`increment`/`decrement`/
  `remove`/`clear`), persisted to `localStorage`
- `components/` — all UI building blocks (`ProductCard`, `Header`,
  `CartSummary`, etc.)
- `app/globals.css` — the single configurable accent color (`--accent`)

## Adding a product

Add an entry to the `PRODUCTS` array in `data/products.ts`:

```ts
{
  id: "unique-kebab-case-id",
  name: "Product name",
  brand: "Optional Brand",       // omit entirely for private-label products
  priceCents: 199,                // current price, in cents
  originalPriceCents: 299,        // optional: only set if on discount
  unitSize: "250 g",
  category: CATEGORY_PASTA_RICE_WORLD_CUISINE, // or another category constant
  subcategory: "Italian cuisine",
  imageUrl: "",                   // leave empty to use the text placeholder
  badges: ["vegan"],              // any of: bonus, vegan, vegetarian, organic, new
  discountLabel: "50% off",       // optional
}
```

Only products in `CATEGORY_PASTA_RICE_WORLD_CUISINE` show up on the product
overview page. `Kanzi apples bag` is deliberately in a different category
(`CATEGORY_FRUIT_FRESH_JUICES`) so the basket page has something to group by
department.

### Product images

`ah.nl` returned `403 Forbidden` for every automated fetch attempt (tried via
the WebFetch tool and via `curl` with browser headers), so no real
`static.ah.nl` image URLs could be retrieved. Every product currently has
`imageUrl: ""`, and `ProductCard` falls back to a neutral placeholder (light
background + product name) whenever `imageUrl` is empty — the same fallback
also triggers if a real image URL ever fails to load. To add real photos,
paste a `static.ah.nl` URL into a product's `imageUrl` field; `next.config.ts`
already allows that hostname via `images.remotePatterns`.

## Known limitations

- No real product images (see above) — all cards use the text placeholder.
- Filter chips (Bonus/New/Organic/Vegan/Vegetarian) and the search bar are
  visual only; they don't actually filter or search yet.
- The subcategory carousel cards are not clickable (no subcategory pages
  exist yet).
- "Checkout" only shows a message ("Checkout will be available in a later
  phase") — there is no real checkout flow.
- The heart/wishlist button is visual only (no wishlist feature).
- Cart state lives in `localStorage` per browser/device — it is not synced
  across devices or shared between users.
- Dark mode is not styled for the shop UI (only the original Next.js
  boilerplate's `prefers-color-scheme` variables remain in `globals.css`).

## Future work (not built yet)

The cart state already stores items per `cartType` (`"shopping" |
"donation"`, see `context/CartContext.tsx`), so a second, separate donation
cart can be added later without restructuring existing state. Planned for a
later phase: an extra "donate" button next to the +/− controls, a donation
menu shown before checkout, two separate receipts, and an impact screen.
None of that UI exists yet.

## Verified test cases

Manually verified in the browser (see `components/CartSummary.tsx` /
`lib/money.ts` for the underlying math):

- 2× "Pasta sauce nduja" (1.64, was 3.29) + 1× "Coconut milk" (1.27) + 1×
  "Kanzi apples bag" (3.49) → Groceries 8.04, Bonus savings 3.30 (2 × 1.65),
  Total 8.04.
- Removing all items returns the basket to its empty state and resets the
  header total to 0.00.
