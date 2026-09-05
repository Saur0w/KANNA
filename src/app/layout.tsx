import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanna — Hand-Thrown Stoneware & Spatial Anchors",
  description:
      "Copenhagen-based ceramic studio crafting permanent spatial anchors and high-fire stoneware vessels.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Kanna — Hand-Thrown Stoneware",
    description:
        "Minimalist architectural ceramics and tactile stoneware objects.",
    siteName: "Kanna Atelier",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${geistSans.variable} ${geistMono.variable}`}
      >
      <body className="antialiased bg-[#F2F1ED] text-[#191817]">
        {children}
        <Footer />
      </body>
      </html>
  );
}