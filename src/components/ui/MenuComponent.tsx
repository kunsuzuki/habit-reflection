/**
 * メニューコンポーネント
 * Figmaデザインに合わせたスマホ向けUI
 * 中央の+ボタンをタップすると追加メニューが表示される
 */
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MenuComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddTodo = () => {
    router.push('/add/todo');
    setIsMenuOpen(false);
  };

  const handleAddHabit = () => {
    router.push('/add/habit');
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="max-w-md mx-auto bg-white border-t border-gray-200">
        <div className="flex justify-center relative">
          {/* メニューボタン */}
          <button 
            onClick={toggleMenu}
            className="absolute -top-6 bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {/* メニュー項目 */}
        <div className="flex justify-around py-3 px-4">
          <button className="text-gray-500 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">ホーム</span>
          </button>
          <button className="text-gray-500 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-xs mt-1">日記</span>
          </button>
          <div className="w-12"></div> {/* 中央ボタンのスペース */}
          <button className="text-gray-500 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs mt-1">分析</span>
          </button>
          <button className="text-gray-500 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">設定</span>
          </button>
        </div>
      </div>

      {/* 追加メニュー（オーバーレイ） */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-64 max-w-xs mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">追加</h3>
            <div className="space-y-3">
              <button 
                onClick={handleAddTodo}
                className="w-full py-3 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                TODOを追加
              </button>
              <button 
                onClick={handleAddHabit}
                className="w-full py-3 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                習慣を追加
              </button>
            </div>
            <button 
              onClick={toggleMenu}
              className="w-full mt-4 py-2 bg-gray-100 rounded-lg text-gray-500"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
