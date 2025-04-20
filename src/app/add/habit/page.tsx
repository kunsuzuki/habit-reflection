/**
 * 習慣追加ページ
 * Figmaデザインに合わせたスマホ向けUI
 */
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddHabitPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [targetCount, setTargetCount] = useState(1);
  const [selectedDays, setSelectedDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true
  });

  const handleDayToggle = (day: keyof typeof selectedDays) => {
    setSelectedDays({
      ...selectedDays,
      [day]: !selectedDays[day]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ここでデータを保存する処理を実装（Supabase連携後）
    console.log({ 
      name, 
      description, 
      frequency, 
      targetCount,
      selectedDays 
    });
    router.back();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button 
          onClick={() => router.back()}
          className="text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">習慣を追加</h1>
        <div className="w-6"></div> {/* スペーサー */}
      </div>

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="flex-1 p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              習慣名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="習慣の名前を入力"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              説明
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="詳細な説明（任意）"
              rows={3}
              maxLength={255}
            />
            <p className="text-xs text-gray-500 mt-1">最大255文字</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              頻度 <span className="text-red-500">*</span>
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="daily">毎日</option>
              <option value="weekly">毎週</option>
              <option value="monthly">毎月</option>
            </select>
          </div>

          <div>
            <label htmlFor="targetCount" className="block text-sm font-medium text-gray-700 mb-1">
              目標回数
            </label>
            <input
              type="number"
              id="targetCount"
              value={targetCount}
              onChange={(e) => setTargetCount(parseInt(e.target.value))}
              min={1}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              曜日指定
            </label>
            <div className="grid grid-cols-7 gap-2">
              {[
                { key: 'mon', label: '月' },
                { key: 'tue', label: '火' },
                { key: 'wed', label: '水' },
                { key: 'thu', label: '木' },
                { key: 'fri', label: '金' },
                { key: 'sat', label: '土' },
                { key: 'sun', label: '日' }
              ].map((day) => (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => handleDayToggle(day.key as keyof typeof selectedDays)}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm
                    ${selectedDays[day.key as keyof typeof selectedDays] 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-900 border border-gray-300'}
                  `}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white rounded-md font-medium"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
