-- 拡張機能の有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- habitsテーブル（習慣の定義）
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL, -- daily, weekly, monthly
  target_count INTEGER DEFAULT 1, -- 目標回数
  icon TEXT, -- アイコン名
  color TEXT, -- カラーコード
  notification_time TIME, -- 通知時間
  days_of_week INTEGER[], -- 0=日曜, 1=月曜, ..., 6=土曜
  repeat_interval INTEGER DEFAULT 1, -- 繰り返し間隔（毎日=1, 隔日=2など）
  repeat_type TEXT DEFAULT 'daily', -- daily, weekly, biweekly, monthly, yearly
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- habit_logsテーブル（習慣の実行記録）
CREATE TABLE habit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT false,
  count INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(habit_id, date)
);

-- journal_entriesテーブル（日記）
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  content TEXT,
  mood TEXT, -- 気分/感情を表すタグ（happy, sad, neutral など）
  tags TEXT[], -- カスタムタグ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, date)
);

-- todosテーブル（TODOリスト）
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT false,
  priority TEXT, -- high, medium, low
  notification_time TIME, -- 通知時間
  memo TEXT, -- メモ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ai_analyticsテーブル（AI分析結果）
CREATE TABLE ai_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  analysis_type TEXT NOT NULL, -- daily, weekly, monthly
  content TEXT NOT NULL, -- AI分析の内容
  metrics JSONB, -- 分析メトリクス（習慣達成率、気分傾向など）
  recommendations TEXT[], -- AIによる推奨事項
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, date, analysis_type)
);

-- RLSの設定
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analytics ENABLE ROW LEVEL SECURITY;

-- habitsテーブルのRLSポリシー
CREATE POLICY "ユーザーは自分の習慣のみ参照可能" 
ON habits FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の習慣のみ作成可能" 
ON habits FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の習慣のみ更新可能" 
ON habits FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の習慣のみ削除可能" 
ON habits FOR DELETE
USING (auth.uid() = user_id);

-- habit_logsテーブルのRLSポリシー
CREATE POLICY "ユーザーは自分の習慣ログのみ参照可能" 
ON habit_logs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の習慣ログのみ作成可能" 
ON habit_logs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の習慣ログのみ更新可能" 
ON habit_logs FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の習慣ログのみ削除可能" 
ON habit_logs FOR DELETE
USING (auth.uid() = user_id);

-- journal_entriesテーブルのRLSポリシー
CREATE POLICY "ユーザーは自分の日記のみ参照可能" 
ON journal_entries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の日記のみ作成可能" 
ON journal_entries FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の日記のみ更新可能" 
ON journal_entries FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分の日記のみ削除可能" 
ON journal_entries FOR DELETE
USING (auth.uid() = user_id);

-- todosテーブルのRLSポリシー
CREATE POLICY "ユーザーは自分のTODOのみ参照可能" 
ON todos FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のTODOのみ作成可能" 
ON todos FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のTODOのみ更新可能" 
ON todos FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のTODOのみ削除可能" 
ON todos FOR DELETE
USING (auth.uid() = user_id);

-- ai_analyticsテーブルのRLSポリシー
CREATE POLICY "ユーザーは自分のAI分析のみ参照可能" 
ON ai_analytics FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のAI分析のみ作成可能" 
ON ai_analytics FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のAI分析のみ更新可能" 
ON ai_analytics FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のAI分析のみ削除可能" 
ON ai_analytics FOR DELETE
USING (auth.uid() = user_id);

-- インデックスの作成（パフォーマンス向上のため）
CREATE INDEX habits_user_id_idx ON habits(user_id);
CREATE INDEX habit_logs_habit_id_idx ON habit_logs(habit_id);
CREATE INDEX habit_logs_user_id_idx ON habit_logs(user_id);
CREATE INDEX habit_logs_date_idx ON habit_logs(date);
CREATE INDEX journal_entries_user_id_idx ON journal_entries(user_id);
CREATE INDEX journal_entries_date_idx ON journal_entries(date);
CREATE INDEX todos_user_id_idx ON todos(user_id);
CREATE INDEX todos_date_idx ON todos(date);
CREATE INDEX ai_analytics_user_id_idx ON ai_analytics(user_id);
CREATE INDEX ai_analytics_date_idx ON ai_analytics(date);
