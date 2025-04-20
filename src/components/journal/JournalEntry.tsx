/**
 * 日記入力コンポーネント
 * ダッシュボードに表示される日記入力エリア
 */
"use client";

import { useState } from 'react';

export default function JournalEntry() {
  const [journalContent, setJournalContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleJournalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournalContent(e.target.value);
  };

  const analyzeJournal = () => {
    if (!journalContent.trim()) {
      return;
    }

    setIsAnalyzing(true);
    
    // 実際のAPIが実装されるまでのモック分析結果
    setTimeout(() => {
      setAnalysisResult(
        "今日の日記からは、ポジティブな感情が伝わってきます。習慣の継続に成功していることが自信につながっているようです。明日も同じペースで続けていくことをおすすめします。"
      );
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">今日の振り返り</h2>
      <textarea
        className="w-full border border-gray-200 rounded-lg p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="今日の出来事や感情を記録しましょう..."
        value={journalContent}
        onChange={handleJournalChange}
      ></textarea>
      
      <div className="mt-3">
        <button
          onClick={analyzeJournal}
          disabled={!journalContent.trim() || isAnalyzing}
          className={`w-full py-2 rounded-lg font-medium ${
            !journalContent.trim() || isAnalyzing
              ? 'bg-gray-200 text-gray-500'
              : 'bg-gray-900 text-white'
          }`}
        >
          {isAnalyzing ? 'AI分析中...' : 'AIで分析する'}
        </button>
      </div>

      {analysisResult && (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium mb-2">AI分析結果</h3>
          <p className="text-gray-700">{analysisResult}</p>
        </div>
      )}
    </div>
  );
}
