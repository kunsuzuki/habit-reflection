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

## 開発ロードマップ

1. 基本UI/UXフレームワーク（カレンダー、日付ナビゲーション）
2. 習慣トラッカー基本機能
3. 日記機能
4. AI分析（最小限の機能から）
5. TODO機能
6. ユーザー認証

## ライセンス

このプロジェクトは [MITライセンス](LICENSE) の下で公開されています。
