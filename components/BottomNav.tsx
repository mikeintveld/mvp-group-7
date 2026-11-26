"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartTotals } from "@/context/CartContext";
import { HomeIcon, SearchIcon, CartIcon } from "./icons";

const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: HomeIcon, isActive: (pathname: string) => pathname === "/home" },
  {
    href: "/producten",
    label: "Search",
    icon: SearchIcon,
    isActive: (pathname: string) => pathname === "/producten",
  },
  {
    href: "/winkelmandje",
    label: "Basket",
    icon: CartIcon,
    isActive: (pathname: string) => pathname.startsWith("/winkelmandje"),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCartTotals();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="mx-auto flex max-w-7xl">
        {NAV_ITEMS.map(({ href, label, icon: Icon, isActive }) => {
          const active = isActive(pathname);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${
                active ? "text-accent" : "text-zinc-500"
              }`}
            >
              <span className="relative">
                <Icon className="h-6 w-6" />
                {href === "/winkelmandje" && itemCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                    {itemCount}
                  </span>
                )}
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
