"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { useDonationPopup } from "@/context/DonationPopupContext";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  InfoIcon,
  MessageIcon,
  ReceiptIcon,
  SettingsIcon,
  StoreIcon,
  UserIcon,
} from "@/components/icons";

const COLLAGE_PRODUCT_IDS = ["basmatirijst", "penne", "kokosmelk"];
const COLLAGE_ROTATIONS = [-6, 4, -3];

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

type MenuRow = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  iconColorClass?: string;
} & ({ kind: "link"; href: string } | { kind: "popup" } | { kind: "toast" });

const GROUP_1: MenuRow[] = [
  { kind: "toast", label: "Orders and purchases", icon: ReceiptIcon },
  { kind: "link", label: "My donations", icon: HeartIcon, href: "/winkelmandje#donations", iconColorClass: "text-donation" },
  { kind: "popup", label: "About donating", icon: InfoIcon },
  { kind: "toast", label: "Stores", icon: StoreIcon },
  { kind: "toast", label: "Messages", icon: MessageIcon },
];

const GROUP_2: MenuRow[] = [
  { kind: "toast", label: "Account details", icon: UserIcon },
  { kind: "toast", label: "Preferences and settings", icon: SettingsIcon },
];

export default function HomePage() {
  const router = useRouter();
  const { open: openDonationPopup } = useDonationPopup();
  // Starts with a neutral placeholder so the server-rendered and first client
  // render match exactly; the real, time-based greeting is filled in after
  // mount to avoid a hydration mismatch.
  const [greeting, setGreeting] = useState("Hello");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeout = useRef<number | null>(null);

  useEffect(() => {
    // Reads the browser's clock, which only exists post-mount — this is a
    // read from an external system (not derivable state), so the lint rule
    // against setState-in-effect doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  function showUnavailableToast() {
    setToast("Not available in this prototype");
    if (toastTimeout.current) window.clearTimeout(toastTimeout.current);
    toastTimeout.current = window.setTimeout(() => setToast(null), 2500);
  }

  const collageProducts = COLLAGE_PRODUCT_IDS.map((id) => PRODUCTS.find((product) => product.id === id)).filter(
    (product): product is NonNullable<typeof product> => Boolean(product),
  );

  function renderRow(row: MenuRow) {
    const Icon = row.icon;
    const rowClasses = "flex w-full items-center gap-3 border-b border-zinc-100 py-4 text-left last:border-b-0";
    const content = (
      <>
        <Icon className={`h-5 w-5 shrink-0 ${row.iconColorClass ?? "text-zinc-500"}`} />
        <span className="flex-1 text-sm font-medium text-zinc-900">{row.label}</span>
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-zinc-400" />
      </>
    );

    if (row.kind === "link") {
      return (
        <Link key={row.label} href={row.href} className={rowClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        key={row.label}
        type="button"
        onClick={row.kind === "popup" ? openDonationPopup : showUnavailableToast}
        className={rowClasses}
      >
        {content}
      </button>
    );
  }

  return (
    <div className="mx-auto w-full md:max-w-2xl">
      <div className="relative h-48 overflow-hidden bg-accent text-white">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="absolute left-4 top-4 hidden h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 md:flex"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        <div className="absolute right-6 top-8 flex">
          {collageProducts.map((product, index) => (
            <div
              key={product.id}
              className="relative h-16 w-16 overflow-hidden rounded-xl border-2 border-white bg-white shadow-md"
              style={{
                marginLeft: index === 0 ? 0 : -16,
                transform: `rotate(${COLLAGE_ROTATIONS[index % COLLAGE_ROTATIONS.length]}deg)`,
                zIndex: index,
              }}
            >
              <Image src={product.imageUrl} alt="" fill sizes="64px" className="object-contain p-1" />
            </div>
          ))}
        </div>

        <h1 className="absolute bottom-6 left-4 right-4 text-2xl font-bold">{greeting}</h1>
      </div>

      <div className="relative -mt-6 rounded-t-3xl bg-white px-4 pb-10 pt-6">
        <div>{GROUP_1.map(renderRow)}</div>
        <div className="-mx-4 my-4 h-2 bg-zinc-100" />
        <div>{GROUP_2.map(renderRow)}</div>
      </div>

      {toast && (
        <div role="status" className="fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 md:bottom-6">
          <div className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg">{toast}</div>
        </div>
      )}
    </div>
  );
}
