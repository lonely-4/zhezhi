import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "./fonts/sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/sans-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ui",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Zhezhi — an introduction inside the sentence",
  description:
    "A page for introducing yourself, a team, or a studio. The type starts nearly lost in the background, fills one line at a time as you scroll, and a word thickens into a card when you reach it.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
