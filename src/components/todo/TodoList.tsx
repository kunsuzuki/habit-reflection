/**
 * TODOリストコンポーネント
 * Figmaデザインに合わせたスマホ向けUI
 * 日付ごとのTODOタスクを表示・管理
 */
export default function TodoList() {
  // 仮のTODOデータ
  const todos = [
    { id: 1, title: 'プロジェクト計画の作成', completed: false, priority: 'high' },
    { id: 2, title: '買い物リスト作成', completed: true, priority: 'medium' },
    { id: 3, title: '週次レポート提出', completed: false, priority: 'high' },
  ];

  return (
    <div className="bg-white p-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-bold">今日のTODO</h2>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            className={`
              flex items-center p-2
              ${todo.completed ? 'opacity-50' : ''}
              ${todo.priority === 'high' ? 'border-l-2 border-red-500' : 
                todo.priority === 'medium' ? 'border-l-2 border-yellow-500' : 'border-l-2 border-green-500'}
            `}
          >
            <input 
              type="checkbox" 
              checked={todo.completed}
              className="h-4 w-4 text-gray-900 rounded mr-3"
              readOnly
            />
            <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </span>
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          タスクがありません
        </div>
      )}
    </div>
  );
}
