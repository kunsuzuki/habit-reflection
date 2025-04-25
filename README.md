# AIハビットトラッカー

AIを活用した習慣管理・健康管理Webアプリケーション

## プロジェクト概要

AIハビットトラッカーは、日々の習慣管理、TODO管理、日記機能、AI分析を組み合わせた総合的な自己管理ツールです。「マイ ルーティン」アプリをベースに、AI機能を追加した発展形として開発されています。

### 主な機能

- **習慣トラッカー**: 毎日の習慣をチェックリスト形式で管理
- **TODO管理**: その日限定のタスクを記録・管理
- **日記機能**: 1日の振り返りや感情を自由に記録
- **AI分析**: 習慣の進捗と日記内容からメンタル状態や健康状態を分析し、アドバイスを提供

## 技術スタック

- **フロントエンド**: Next.js, Tailwind CSS
- **バックエンド**: Next.js API Routes + Cloudflare Workers
- **データベース**: Supabase
- **AI API**: Gemini API + Cloudflare Workers AI
- **ホスティング**: Cloudflare Pages + Workers

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone git@github.com:kunsuzuki/habit-reflection.git
cd habit-reflection

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## プロジェクト構造

```
habit-reflection/
├── src/
│   ├── app/             # Next.jsのアプリケーションルート
│   ├── components/      # UIコンポーネント
│   │   ├── ui/          # 基本UIコンポーネント
│   │   ├── habits/      # 習慣管理関連コンポーネント
│   │   ├── journal/     # 日記関連コンポーネント
│   │   ├── todo/        # TODO管理関連コンポーネント
│   │   └── ai-analysis/ # AI分析関連コンポーネント
│   └── lib/             # ユーティリティ関数やヘルパー
├── public/              # 静的ファイル
└── ...
```

## セキュリティとデータアクセス設計

このプロジェクトでは、Next.js 15のServer ComponentsとServer Actionsを活用し、Supabaseとの連携においてセキュアな実装を行います。

### データアクセスの原則

1. **サーバーサイドファーストアプローチ**
   - データの読み書きは基本的にServer ComponentsまたはServer Actionsで行う
   - クライアントサイドからの直接DBアクセスは最小限に留める

2. **多層防御戦略**
   - RLS（Row Level Security）を必ず設定する
   - サーバーサイドでも追加の権限チェックを実装する
   - クライアントから送信されるデータは常にサーバーサイドで検証する

### 実装パターン

1. **読み取り操作（GET）**
   - Server Componentsを使用してデータを取得
   - 例: 
   ```tsx
   // app/dashboard/page.tsx
   async function DashboardPage() {
     const supabase = createServerClient();
     const { data: habits } = await supabase.from('habits').select();
     return <HabitList habits={habits} />;
   }
   ```

2. **書き込み操作（POST, PUT, DELETE）**
   - Server Actionsを使用
   - 例:
   ```tsx
   // app/actions.ts
   'use server'
   export async function createTodo(formData: FormData) {
     const supabase = createServerClient();
     const { data: { user } } = await supabase.auth.getUser();
     if (!user) throw new Error('認証が必要です');
     
     // 入力検証
     const title = formData.get('title');
     if (!title) throw new Error('タイトルは必須です');
     
     return await supabase.from('todos').insert({
       title,
       user_id: user.id
     });
   }
   ```

### セキュリティ対策

1. **入力検証**
   - zodなどのバリデーションライブラリを使用
   - サーバーサイドで必ず検証を行う

2. **RLS設計**
   - 全テーブルにRLSポリシーを適用
   - 例:
   ```sql
   -- habitsテーブルのRLSポリシー
   CREATE POLICY "ユーザーは自分の習慣のみ参照可能" 
   ON habits FOR SELECT 
   USING (auth.uid() = user_id);
   
   CREATE POLICY "ユーザーは自分の習慣のみ作成可能" 
   ON habits FOR INSERT 
   WITH CHECK (auth.uid() = user_id);
   ```

## デザイン・開発フロー

- Figma MCPでデザインを取得・確認し、UI開発前に必ず参照
- Figma上にないページ・コンポーネントは、既存デザインに沿ったUIを作成
- 段階的に開発を進め、**各ステップごとにブラウザ上で成果物を確認・ユーザーに報告**
- 変更ファイル・実装内容・確認方法を毎回明示
- ユーザーからのフィードバックを反映しながら進行

## ライセンス

このプロジェクトは [MITライセンス](LICENSE) の下で公開されています。
