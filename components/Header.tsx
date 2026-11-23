"use client";

import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { formatCents } from "@/lib/money";
import { useCartTotals } from "@/context/CartContext";
import { CartIcon } from "./icons";

export default function Header() {
  const { itemCount, grandTotalCents } = useCartTotals();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center gap-x-4 gap-y-3 px-4 py-3 sm:grid-cols-[1fr_auto_1fr] sm:px-6">
        <Link
          href="/"
          className="col-start-1 row-start-1 shrink-0 self-center text-xl font-bold tracking-tight text-zinc-900 sm:col-start-1"
        >
          {APP_NAME}
        </Link>

        <Link
          href="/winkelmandje"
          aria-label={`Shopping basket, ${formatCents(grandTotalCents)} euro, ${itemCount} items`}
          className="col-start-2 row-start-1 flex items-center gap-2 justify-self-end rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-900 hover:border-accent hover:text-accent sm:col-start-3"
        >
          <CartIcon className="h-5 w-5" />
          <span>{formatCents(grandTotalCents)}</span>
          {itemCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white">
              {itemCount}
            </span>
          )}
        </Link>

        <div className="col-span-2 row-start-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:justify-self-center">
          <label className="block">
            <span className="sr-only">Search</span>
            <input
              type="search"
              placeholder="What are you looking for?"
              className="w-full rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:w-80"
            />
          </label>
        </div>
      </div>
    </header>
  );
}
