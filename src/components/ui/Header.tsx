/**
 * アプリケーションのヘッダーコンポーネント
 * スマホファーストのアプローチでデザイン
 */
export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-3 px-4 flex items-center justify-between">
      <div className="text-xl font-bold text-gray-900">
        AI Habit Reflection
      </div>
      {/* ここにナビゲーションやユーザーアイコンなどを追加予定 */}
    </header>
  );
}
