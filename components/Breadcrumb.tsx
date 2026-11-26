import Link from "next/link";
import { ChevronRightIcon } from "./icons";

export default function Breadcrumb({ category }: { category: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-4 pt-4 text-sm text-zinc-600 sm:px-6">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRightIcon className="h-3 w-3 text-zinc-400" />
        </li>
        <li>
          <Link href="/producten" className="hover:text-accent">
            Products
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRightIcon className="h-3 w-3 text-zinc-400" />
        </li>
        <li aria-current="page" className="text-zinc-900">
          {category}
        </li>
      </ol>
    </nav>
  );
}
