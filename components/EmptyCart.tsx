import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-lg font-semibold text-zinc-900">Your shopping basket is empty</p>
      <Link href="/producten" className="font-medium text-accent hover:underline">
        ← Continue shopping
      </Link>
    </div>
  );
}
