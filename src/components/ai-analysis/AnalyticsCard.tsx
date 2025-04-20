/**
 * AIアナリティクスカードコンポーネント
 * Figmaデザインに合わせたスマホ向けUI
 * 習慣・タスクの分析結果を表示
 */
export default function AnalyticsCard() {
  return (
    <div className="bg-white p-4 border-t border-b border-gray-200">
      <h3 className="text-base font-bold mb-2">🤖 AI Analytics</h3>
      
      <div className="space-y-1">
        <p className="text-sm font-light">
          パーソナライズされた分析をタップして確認
        </p>
        <p className="text-sm font-light">
          習慣の達成状況やタスクの傾向を分析します
        </p>
      </div>
    </div>
  );
}
