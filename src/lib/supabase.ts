import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// 環境変数からSupabaseの接続情報を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントの作成
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 環境情報をコンソールに出力（開発時のみ）
if (process.env.NODE_ENV === 'development') {
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log('環境:', supabaseUrl.includes('127.0.0.1') ? 'ローカル' : '本番');
}
