"use client";

import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { PRODUCTS } from "@/data/products";
import { discountCents } from "@/lib/money";

// Two separate carts: your own groceries, and products picked to donate to
// the food bank (OTPD). They share the same actions/shape but never mix.
export type CartType = "groceries" | "donation";

type CartItems = Record<string, number>; // productId -> quantity
type CartData = Record<CartType, CartItems>;

// `hydrated` lives in the reducer state (not a separate useState) so the
// write-effect below can gate on it via the dispatch/state cycle alone,
// without calling a state setter directly inside an effect body.
type ReducerState = {
  data: CartData;
  hydrated: boolean;
};

type CartAction =
  | { type: "add"; cartType: CartType; productId: string }
  | { type: "increment"; cartType: CartType; productId: string }
  | { type: "decrement"; cartType: CartType; productId: string }
  | { type: "remove"; cartType: CartType; productId: string }
  | { type: "clear"; cartType: CartType }
  | { type: "hydrate"; data: CartData };

const EMPTY_DATA: CartData = { groceries: {}, donation: {} };
const INITIAL_STATE: ReducerState = { data: EMPTY_DATA, hydrated: false };
const STORAGE_KEY = "groceryshare:cart";

function withoutProduct(items: CartItems, productId: string): CartItems {
  const next = { ...items };
  delete next[productId];
  return next;
}

function cartReducer(state: ReducerState, action: CartAction): ReducerState {
  switch (action.type) {
    case "hydrate":
      return { data: action.data, hydrated: true };
    case "add":
    case "increment": {
      const items = state.data[action.cartType];
      const quantity = (items[action.productId] ?? 0) + 1;
      return {
        ...state,
        data: { ...state.data, [action.cartType]: { ...items, [action.productId]: quantity } },
      };
    }
    case "decrement": {
      const items = state.data[action.cartType];
      const quantity = (items[action.productId] ?? 0) - 1;
      const nextItems =
        quantity <= 0 ? withoutProduct(items, action.productId) : { ...items, [action.productId]: quantity };
      return { ...state, data: { ...state.data, [action.cartType]: nextItems } };
    }
    case "remove":
      return {
        ...state,
        data: { ...state.data, [action.cartType]: withoutProduct(state.data[action.cartType], action.productId) },
      };
    case "clear":
      return { ...state, data: { ...state.data, [action.cartType]: {} } };
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartData;
  add: (productId: string, cartType?: CartType) => void;
  increment: (productId: string, cartType?: CartType) => void;
  decrement: (productId: string, cartType?: CartType) => void;
  remove: (productId: string, cartType?: CartType) => void;
  clear: (cartType?: CartType) => void;
  getQuantity: (productId: string, cartType?: CartType) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Start empty + unhydrated on both server and client so the first client
  // render matches the server-rendered HTML exactly; localStorage is only
  // read after mount.
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  useEffect(() => {
    let data = EMPTY_DATA;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CartData>;
        data = { ...EMPTY_DATA, ...parsed };
      }
    } catch {
      // localStorage unavailable or corrupted — fall back to an empty cart.
    }
    dispatch({ type: "hydrate", data });
  }, []);

  useEffect(() => {
    // Skip the write until hydration has actually run once, otherwise this
    // would fire on the same initial mount with the still-empty initial
    // state and overwrite whatever was just read from localStorage.
    if (!state.hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    } catch {
      // e.g. private browsing or storage quota exceeded — safe to ignore.
    }
  }, [state]);

  const value: CartContextValue = {
    state: state.data,
    add: (productId, cartType = "groceries") => dispatch({ type: "add", cartType, productId }),
    increment: (productId, cartType = "groceries") => dispatch({ type: "increment", cartType, productId }),
    decrement: (productId, cartType = "groceries") => dispatch({ type: "decrement", cartType, productId }),
    remove: (productId, cartType = "groceries") => dispatch({ type: "remove", cartType, productId }),
    clear: (cartType = "groceries") => dispatch({ type: "clear", cartType }),
    getQuantity: (productId, cartType = "groceries") => state.data[cartType][productId] ?? 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

function sumCartItems(items: CartItems) {
  let count = 0;
  let subtotalCents = 0;
  let bonusCents = 0;
  for (const [productId, quantity] of Object.entries(items)) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) continue;
    count += quantity;
    subtotalCents += product.priceCents * quantity;
    bonusCents += discountCents(product) * quantity;
  }
  return { count, subtotalCents, bonusCents };
}

// All cart totals in one place, in cents. Used by the header (grand total +
// item count) and the split receipt on the basket page.
export function useCartTotals() {
  const { state } = useCart();
  const groceries = sumCartItems(state.groceries);
  const donation = sumCartItems(state.donation);

  return {
    groceriesCount: groceries.count,
    groceriesSubtotalCents: groceries.subtotalCents,
    bonusSavingsCents: groceries.bonusCents,
    donationCount: donation.count,
    donationSubtotalCents: donation.subtotalCents,
    grandTotalCents: groceries.subtotalCents + donation.subtotalCents,
    itemCount: groceries.count + donation.count,
  };
}
