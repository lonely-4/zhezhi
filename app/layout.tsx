import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const serif = localFont({
  src: [
    { path: "./fonts/serif-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/serif-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-essay",
  display: "swap",
  adjustFontFallback: false,
});

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
  title: "折纸 — 句子里的介绍",
  description:
    "适合自我、团队与工作室的介绍页。正文默认隐在背景里，滚动时从左到右填亮，读到特点，卡片从字里浮上来。",
};

export const viewport: Viewport = {
  themeColor: "#110f0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
