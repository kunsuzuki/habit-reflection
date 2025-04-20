/**
 * アプリケーションのフッターコンポーネント
 * コピーライトと補足情報を表示
 */
export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 text-center py-3 text-sm text-gray-600 mt-8">
      &copy; {new Date().getFullYear()} AI Habit Reflection
    </footer>
  );
}
