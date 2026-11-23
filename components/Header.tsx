"use client";

import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { formatCents } from "@/lib/money";
import { useCartSummary } from "@/context/CartContext";
import { CartIcon } from "./icons";

export default function Header() {
  const { itemCount, totalCents } = useCartSummary();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0 text-xl font-bold tracking-tight text-zinc-900">
          {APP_NAME}
        </Link>

        <div className="hidden flex-1 sm:block">
          <label className="block">
            <span className="sr-only">Search</span>
            <input
              type="search"
              placeholder="What are you looking for?"
              className="w-full max-w-md rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
        </div>

        <Link
          href="/winkelmandje"
          aria-label={`Shopping basket, ${formatCents(totalCents)} euro, ${itemCount} items`}
          className="ml-auto flex items-center gap-2 rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-900 hover:border-accent hover:text-accent"
        >
          <CartIcon className="h-5 w-5" />
          <span>{formatCents(totalCents)}</span>
          {itemCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
