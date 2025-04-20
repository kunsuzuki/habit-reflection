import { ReactNode } from "react";
import { Header, Footer } from "../ui";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * アプリケーション全体のレイアウトを提供するコンポーネント
 * ヘッダー、メインコンテンツ、フッターの基本構造を定義
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
