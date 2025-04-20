/**
 * 習慣トラッカーコンポーネント
 * Figmaデザインに合わせたスマホ向けUI
 * 日付ごとの習慣達成状況を表示・管理
 */
export default function HabitTracker() {
  // 仮の習慣データ
  const habits = [
    { id: 1, name: '朝のランニング', completed: true, streak: 5 },
    { id: 2, name: '読書（30分）', completed: false, streak: 12 },
    { id: 3, name: '瞑想', completed: false, streak: 3 },
  ];

  return (
    <div className="bg-white p-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-bold">習慣トラッカー</h2>
      </div>

      <div className="space-y-2">
        {habits.map((habit) => (
          <div 
            key={habit.id} 
            className="flex items-center p-2"
          >
            <div className="mr-3">
              <button 
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center
                  ${habit.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white border border-gray-300 text-transparent'}
                `}
              >
                {habit.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-1">
              <div className="text-sm">{habit.name}</div>
              <div className="text-xs text-gray-500">{habit.streak}日連続達成中</div>
            </div>
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {habits.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          習慣が登録されていません
        </div>
      )}
    </div>
  );
}
