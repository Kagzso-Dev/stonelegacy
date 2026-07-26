import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SettingsProvider } from "@/lib/settings-context";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

export const metadata: Metadata = {
  title: "StoneLegacy Engravers — Preserving Memories in Stone for Generations",
  description:
    "Premium granite engraving services — custom house name boards, school memorials, donor walkways, and campus signage using CNC, Sandblasting, and Laser technology.",
  keywords: [
    "Granite Engraving",
    "House Name Board",
    "School Memorial",
    "Donor Walkway",
    "CNC Engraving",
    "Laser Etching",
    "Sandblasting",
    "Stone Engraving",
    "StoneLegacy",
  ],
  openGraph: {
    title: "StoneLegacy Engravers — Preserving Memories in Stone",
    description: "Custom granite engraving for homes, schools, and institutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A] antialiased font-[var(--font-inter)]">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
