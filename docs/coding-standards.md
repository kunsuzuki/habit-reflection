# コーディング標準

このドキュメントは、AI Habit Reflectionプロジェクトで採用するコーディング標準と各技術スタックにおけるベストプラクティスをまとめたものです。

## 目次

1. [Next.js](#nextjs)
2. [Supabase](#supabase)
3. [Tailwind CSS](#tailwind-css)
4. [Cloudflare Workers](#cloudflare-workers)
5. [Cloudflare D1](#cloudflare-d1)

## Next.js

### 環境変数の管理

1. **非公開APIキーはサーバーサイド環境変数にセット**
   - APIキーなどの機密情報には `NEXT_PUBLIC_` プレフィックスを使用しない
   - 例: `GEMINI_API_KEY=xxx` (サーバーサイドのみ)
   - 例: `NEXT_PUBLIC_SITE_URL=https://example.com` (公開可能な情報)

2. **サーバーサイド関数の権限管理**
   - サーバーサイド関数は全ユーザーに許可する操作のみ定義する
   - ユーザーに許可しない操作を定義するとDBが破壊されたり、データ漏洩のリスクあり
   - 特定のユーザーのみ許可する操作には必ずユーザー認証を実装する

3. **認証連携**
   - `supabase-auth`でログイン状態をクライアントサイドとサーバーサイドで同期
   - Server Componentsでのセッション取得:
   ```tsx
   const { data: { session } } = await supabase.auth.getSession()
   ```
   - Server Actionsでの認証確認:
   ```tsx
   const { data: { user } } = await supabase.auth.getUser()
   ```

### コンポーネント設計

1. **Atomic Designパターンの採用**
   - 再利用可能なコンポーネントはatomic designパターンに従って整理
   - `atoms`、`molecules`、`organisms`、`templates`、`pages`の階層構造

2. **型定義の徹底**
   - propsにはTypeScriptの型定義を必ず付ける
   ```tsx
   type ButtonProps = {
     label: string;
     onClick: () => void;
     variant?: 'primary' | 'secondary';
   };
   
   export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
     // ...
   }
   ```

3. **コンポーネント分割**
   - 大きなコンポーネントは適切に分割し、1ファイル300行以内を目指す
   - 単一責任の原則に従い、コンポーネントは1つの役割のみを持つ

### 状態管理

1. **適切な状態管理の選択**
   - グローバル状態はContext APIやZustandなどを使用
   - Reduxのような複雑な状態管理は避ける
   - サーバーコンポーネントとクライアントコンポーネントを適切に分離
   - クライアントでのみ必要な状態はuseStateやuseReducerで管理

### パフォーマンス

1. **画像最適化**
   - Next.jsのImageコンポーネントを使用
   ```tsx
   import Image from 'next/image';
   
   <Image 
     src="/profile.jpg" 
     alt="Profile" 
     width={500} 
     height={500} 
     placeholder="blur"
   />
   ```

2. **コード分割**
   - 大きなコンポーネントはdynamic importでコード分割
   ```tsx
   const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

3. **不要なレンダリングの防止**
   - useMemoとuseCallbackを適切に使用
   ```tsx
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
   const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
   ```

## Supabase

### セキュリティ

1. **RLS (Row Level Security)の設定**
   - すべてのテーブルにRLSを設定
   - ユーザーごとのデータ分離を確実に実装
   ```sql
   -- テーブルのRLS有効化
   ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
   
   -- ポリシーの作成
   CREATE POLICY "ユーザーは自分のTODOのみ参照可能" 
   ON todos FOR SELECT 
   USING (auth.uid() = user_id);
   ```

2. **バックアップ戦略**
   - データベースの定期的なバックアップを設定
   - 本番環境のデータベースへのアクセスは最小限の権限で行う

### データ設計

1. **リレーショナルデータベース設計の原則に従う**
   - テーブル間の関係は外部キー制約で明示
   ```sql
   ALTER TABLE habit_logs 
   ADD CONSTRAINT fk_habit 
   FOREIGN KEY (habit_id) 
   REFERENCES habits(id);
   ```

2. **パフォーマンス最適化**
   - 頻繁に検索するフィールドにはインデックスを設定
   ```sql
   CREATE INDEX idx_habits_user_id ON habits(user_id);
   ```

3. **論理削除の採用**
   - 削除操作は物理削除ではなく論理削除（deleted_atフィールド）を使用
   ```sql
   ALTER TABLE habits ADD COLUMN deleted_at TIMESTAMP;
   
   -- 削除時のRLSポリシー
   CREATE POLICY "削除されていないデータのみ表示" 
   ON habits FOR SELECT 
   USING (deleted_at IS NULL);
   ```

## Tailwind CSS

### デザインシステム

1. **一貫性のあるデザイン変数**
   - カラーやサイズは変数として定義し、tailwind.config.jsで管理
   ```js
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           primary: {
             light: '#4da6ff',
             DEFAULT: '#0076e4',
             dark: '#004c94',
           },
         },
         spacing: {
           'content-sm': '640px',
           'content': '768px',
           'content-lg': '1024px',
         },
       },
     },
   };
   ```

2. **再利用可能なスタイル**
   - 繰り返し使用するクラスの組み合わせは@applyディレクティブでコンポーネント化
   ```css
   /* globals.css */
   @layer components {
     .btn-primary {
       @apply px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors;
     }
   }
   ```

3. **コンポーネントベースのスタイリング**
   - 複雑なコンポーネントはコンポーネント単位でスタイリングし、propsで変更可能に
   ```tsx
   type CardProps = {
     variant?: 'default' | 'compact';
     children: React.ReactNode;
   };
   
   export function Card({ variant = 'default', children }: CardProps) {
     return (
       <div className={`
         rounded-lg shadow-sm
         ${variant === 'compact' ? 'p-2' : 'p-4'}
       `}>
         {children}
       </div>
     );
   }
   ```

### レスポンシブデザイン

1. **モバイルファーストアプローチ**
   - モバイルファーストの設計を基本とし、必要に応じてブレークポイントを追加
   ```html
   <div class="text-sm md:text-base lg:text-lg">
     レスポンシブテキスト
   </div>
   ```

2. **高度なレイアウト**
   - 複雑なレイアウトはFlexboxやGridを活用
   ```html
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     <!-- グリッドアイテム -->
   </div>
   ```

3. **条件付き表示**
   - 画面サイズによって要素の表示/非表示を適切に切り替え
   ```html
   <div class="hidden md:block">デスクトップのみ表示</div>
   <div class="md:hidden">モバイルのみ表示</div>
   ```

## Cloudflare Workers

### パフォーマンス最適化

1. **軽量な実装**
   - コールドスタートを考慮し、初期化コードを最小限に抑える
   - 大きな依存関係は避け、軽量なライブラリを選択する

2. **非同期処理の活用**
   - 長時間実行される処理は避け、必要に応じて非同期処理に分割
   ```js
   export async function onRequest(context) {
     // 重い処理は非同期で実行
     const result = await processDataAsync(context.request);
     return new Response(JSON.stringify(result), {
       headers: { 'Content-Type': 'application/json' },
     });
   }
   ```

### エラーハンドリング

1. **例外処理**
   - すべてのWorkerにはtry-catchブロックを実装し、エラーをキャプチャ
   ```js
   export async function onRequest(context) {
     try {
       // 処理
       return new Response('Success');
     } catch (error) {
       console.error('Error:', error);
       return new Response('Internal Server Error', { status: 500 });
     }
   }
   ```

2. **エラー監視**
   - エラー発生時はログを記録し、適切なHTTPステータスコードを返す
   - 重要なエラーは監視システムに通知する仕組みを導入

## Cloudflare D1

### データモデリング

1. **スキーマ管理**
   - スキーマは明示的に定義し、マイグレーションファイルとして管理
   ```sql
   -- migrations/001_initial_schema.sql
   CREATE TABLE habits (
     id TEXT PRIMARY KEY,
     user_id TEXT NOT NULL,
     name TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **インデックス最適化**
   - インデックスを適切に設定し、クエリパフォーマンスを最適化
   ```sql
   CREATE INDEX idx_habits_user_id ON habits(user_id);
   ```

3. **ページネーション**
   - 大量データの取得は避け、ページネーションを実装
   ```js
   // 例: 10件ずつ取得
   const { results } = await db
     .prepare('SELECT * FROM habits WHERE user_id = ? LIMIT ? OFFSET ?')
     .bind(userId, 10, page * 10)
     .all();
   ```

### クエリ最適化

1. **効率的なクエリ**
   - 複雑なJOINは最小限に抑え、必要に応じてデータを非正規化
   - トランザクションを適切に使用し、データの整合性を確保

2. **N+1クエリ問題の回避**
   - 関連データは一度に取得し、N+1クエリ問題を避ける
   ```js
   // 悪い例: N+1クエリ
   const habits = await db.prepare('SELECT * FROM habits').all();
   for (const habit of habits.results) {
     const logs = await db.prepare('SELECT * FROM habit_logs WHERE habit_id = ?').bind(habit.id).all();
     habit.logs = logs.results;
   }
   
   // 良い例: 一度に関連データを取得
   const habits = await db.prepare('SELECT * FROM habits').all();
   const habitIds = habits.results.map(h => h.id);
   const logs = await db.prepare(`SELECT * FROM habit_logs WHERE habit_id IN (${habitIds.map(() => '?').join(',')})`).bind(...habitIds).all();
   
   // メモリ上でデータを関連付け
   const habitLogsMap = {};
   for (const log of logs.results) {
     if (!habitLogsMap[log.habit_id]) habitLogsMap[log.habit_id] = [];
     habitLogsMap[log.habit_id].push(log);
   }
   
   for (const habit of habits.results) {
     habit.logs = habitLogsMap[habit.id] || [];
   }
   ```

## まとめ

これらのコーディング標準に従うことで、保守性が高く、パフォーマンスに優れ、セキュアなアプリケーションを構築することができます。プロジェクトの進行に伴い、必要に応じてこのドキュメントを更新していきます。
