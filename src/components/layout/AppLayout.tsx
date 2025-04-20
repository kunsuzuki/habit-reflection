import { ReactNode } from "react";
import { Header, Footer, MenuComponent } from "../ui";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * アプリケーション全体のレイアウトを提供するコンポーネント
 * スマホファーストのアプローチでデザイン
 * ヘッダー、メインコンテンツ、フッターの基本構造を定義
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <main className="flex-1 max-w-md mx-auto w-full bg-white pb-16">
        {children}
      </main>
      <MenuComponent />
      <Footer />
    </div>
  );
}
