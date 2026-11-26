"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

type DonationPopupContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const DonationPopupContext = createContext<DonationPopupContextValue | null>(null);

export function DonationPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  // Remembers whichever badge was clicked, so focus can return to it on close.
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = () => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return <DonationPopupContext.Provider value={{ isOpen, open, close }}>{children}</DonationPopupContext.Provider>;
}

export function useDonationPopup(): DonationPopupContextValue {
  const ctx = useContext(DonationPopupContext);
  if (!ctx) throw new Error("useDonationPopup must be used within a DonationPopupProvider");
  return ctx;
}
