import type { Metadata } from "next";
import "./globals.css";
import { general_sans } from "@/fonts/fonts";
import WalletProv from "@/components/solana/WalletProv";

export const metadata: Metadata = {
  title: "NexAI",
  description: "",
  authors: [
    { name: "Shlok K" },
    { name: "Shridhar G"},
  ],

  keywords: ["NexAI", "NeXAI"],
  robots: "index,follow",
  applicationName: "NeXAI",
  category: "resources",
  creator: "Shridhar, Shlok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${general_sans.className} bg-[#f0ffff]`}>
        {children}
      </body>
    </html>
  );
}
