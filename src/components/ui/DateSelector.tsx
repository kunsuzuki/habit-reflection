/**
 * 日付選択コンポーネント
 * Figmaデザインに合わせたスマホ向けUI
 * 週間カレンダーを表示し、日付の選択が可能
 */
export default function DateSelector() {
  // 現在の日付を取得
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();
  const currentDay = today.getDay();
  
  // 週の日付を計算（現在の日付を中心に前後3日）
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(currentDate - currentDay + i);
    return {
      date: date.getDate(),
      day: i,
      isToday: date.getDate() === currentDate && 
               date.getMonth() === today.getMonth() && 
               date.getFullYear() === today.getFullYear()
    };
  });

  // 曜日の表示名
  const dayNames = ['月', '火', '水', '木', '金', '土', '日'];
  
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-bold">{currentYear}.{currentMonth}</h2>
        <button className="text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* 曜日の表示 */}
        {dayNames.map((day, index) => (
          <div key={`day-${index}`} className="text-xs font-bold">
            {day}
          </div>
        ))}
        
        {/* 日付の表示 */}
        {weekDates.map((item, index) => (
          <div key={`date-${index}`} className="relative">
            <div 
              className={`
                w-8 h-8 mx-auto flex items-center justify-center rounded-full
                ${item.isToday ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
                cursor-pointer
              `}
            >
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
