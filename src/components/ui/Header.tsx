/**
 * アプリケーションのヘッダーコンポーネント
 * アプリ名とナビゲーションを表示
 */
export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="text-2xl font-bold text-gray-900 tracking-tight">
        AI Habit Reflection
      </div>
      {/* ここにナビゲーションやユーザーアイコンなどを追加予定 */}
    </header>
  );
}
