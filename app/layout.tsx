import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import DonationPopup from "@/components/DonationPopup";
import { CartProvider } from "@/context/CartContext";
import { DonationPopupProvider } from "@/context/DonationPopupContext";
import { APP_NAME } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    "Student prototype for a grocery webshop (RSM Implementing Innovations, Group 7).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <CartProvider>
          <DonationPopupProvider>
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
            <BottomNav />
            <DonationPopup />
          </DonationPopupProvider>
        </CartProvider>
      </body>
    </html>
  );
}
