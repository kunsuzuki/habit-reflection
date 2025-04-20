import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "../components/layout/AppLayout";
import { metadata } from "./metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export { metadata };

/**
 * アプリケーションのルートレイアウト
 * 全ページで共通のHTML構造とフォント設定を提供
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="light">
      <body
        className={`min-h-screen bg-background font-sans antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
