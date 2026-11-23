import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <p className="text-lg font-semibold text-zinc-900">Your shopping basket is empty</p>
      <Link href="/producten" className="font-medium text-accent hover:underline">
        ← Continue shopping
      </Link>
    </div>
  );
}
