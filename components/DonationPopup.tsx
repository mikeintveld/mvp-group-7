"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { formatCents } from "@/lib/money";
import { DONATION_POPUP_INTRO } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { useDonationPopup } from "@/context/DonationPopupContext";
import { CloseIcon } from "./icons";

const DONATION_PRODUCTS = PRODUCTS.filter((product) => product.donationEligible);

export default function DonationPopup() {
  const { isOpen, close } = useDonationPopup();
  const { add } = useCart();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  function donateAll() {
    for (const product of DONATION_PRODUCTS) {
      add(product.id, "donation");
    }
    close();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={close}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-popup-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[95vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl outline-none sm:max-h-[85vh]"
      >
        <div className="grid shrink-0 grid-cols-[3rem_1fr_3rem] items-center border-b border-zinc-200 px-6 py-4">
          <div />
          <h2 id="donation-popup-title" className="text-center text-2xl font-bold text-zinc-900">
            Lovingly Donating
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center justify-self-end rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-100"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <p className="shrink-0 px-6 py-4 text-base text-zinc-600">{DONATION_POPUP_INTRO}</p>

        <div className="flex-1 divide-y divide-zinc-200 overflow-y-auto px-6">
          {DONATION_PRODUCTS.map((product) => {
            const displayName = product.brand ? `${product.brand} ${product.name}` : product.name;
            return (
              <div key={product.id} className="flex items-center gap-4 py-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-donation-light">
                  <Image src={product.imageUrl} alt={product.name} fill sizes="80px" className="object-contain p-2" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-base text-zinc-900">{displayName}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base font-bold text-zinc-900">{formatCents(product.priceCents)}</span>
                    <span className="text-sm text-zinc-500">{product.unitSize}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => add(product.id, "donation")}
                  aria-label={`Add 1 ${displayName} to the donation basket`}
                  className="shrink-0 rounded-full bg-donation px-4 py-2 text-sm font-semibold text-white hover:bg-donation-text"
                >
                  + 1
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex shrink-0 gap-3 border-t border-zinc-200 p-6">
          <button
            type="button"
            onClick={close}
            className="flex-1 rounded-full border border-donation bg-white px-5 py-3 text-base font-semibold text-donation hover:bg-donation-light"
          >
            No
          </button>
          <button
            type="button"
            onClick={donateAll}
            className="flex-1 rounded-full bg-donation px-5 py-3 text-base font-semibold text-white hover:bg-donation-text"
          >
            Donate All
          </button>
        </div>
      </div>
    </div>
  );
}
