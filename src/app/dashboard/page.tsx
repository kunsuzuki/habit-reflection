import { DateSelector } from "@/components/ui";
import AnalyticsCard from "@/components/ai-analysis/AnalyticsCard";
import TodoList from "@/components/todo/TodoList";
import HabitTracker from "@/components/habits/HabitTracker";
import JournalEntry from "@/components/journal/JournalEntry";

/**
 * ダッシュボードページ
 * Figmaデザインに合わせたスマホファーストUI
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      {/* 日付選択コンポーネント */}
      <DateSelector />
      
      {/* AIアナリティクス */}
      <AnalyticsCard />
      
      {/* TODOリスト */}
      <TodoList />
      
      {/* 習慣トラッカー */}
      <HabitTracker />
      
      {/* 日記入力エリア */}
      <JournalEntry />
    </div>
  );
}
