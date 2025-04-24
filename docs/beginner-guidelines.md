# Next.js + Supabase プロジェクト構成ガイド（ビギナー向け）

このドキュメントは、CakePHPなどのMVCやサービス・リポジトリパターンを経験してきた方や、Web開発初心者がこのプロジェクトに参画した際に迷わないよう、構造・役割・開発手法の全体像をわかりやすくまとめたものです。

---

## 1. 概念的な全体像

- **Next.js（Reactベース）** を中心に、**Supabase**（BaaS: Backend as a Service）を組み合わせたモダンWebアプリ構成
- フロントエンドとバックエンドの境界が曖昧な「フルスタック」な開発が可能
- サーバーサイド（Server Components, Server Actions）中心のセキュアな設計
- Atomic Designやディレクトリごとの責務分離で保守性・拡張性を重視

---

## 2. ディレクトリ構成と役割

```
/（プロジェクトルート）
├── src/
│   ├── app/                # Next.jsのルーティングとページ（URL単位でディレクトリ分割）
│   │   └── dashboard/      # 例: /dashboard ページ
│   ├── components/         # 再利用可能なUI部品（Atomic Designを意識）
│   │   ├── ui/             # 汎用UIパーツ（例: Button, Input, Modal, Menu など）
│   │   └── journal/        # 機能ごとの部品（例: 日記入力フォーム, 分析ボタン, 習慣トラッカーリスト など）
│   ├── lib/                # サーバーサイドやクライアントサイド両方で利用できる「汎用的なロジック」や「設定」をまとめる場所
│   ├── actions/            # Next.jsのServer Actions（フォーム送信やDB更新などのサーバー処理）
│   └── types/              # 型定義（TypeScriptの型を集約）
├── public/                 # 静的ファイル（画像、favicon等）
├── docs/                   # ドキュメント一式（コーディング規約、TODO、ガイド等）
├── .env.local              # 環境変数（APIキーなど、公開NG情報はここに）
├── tailwind.config.js      # Tailwind CSSの設定
└── ...                     # その他設定ファイル
```

---

## 3. 各ディレクトリ・ファイルの役割と具体例

- **src/app/**
  - ページ単位のルーティング（URLごとにディレクトリ分割）
  - ページ直下に`page.tsx`（画面UI）、`layout.tsx`（レイアウト共通化）など
  - 例: `/dashboard/page.tsx`（ダッシュボード画面UI）
- **src/components/**
  - UI部品をAtomic Design（Atoms, Molecules, Organisms...）で整理
  - `ui/` … プロジェクト全体で使い回す汎用部品（例: Button, Input, Modal, Menu, Checkbox, Spinner など）
  - `journal/`や`habit/`など … 機能ごと・画面ごとの部品（例: 日記入力フォーム, 習慣リスト, AI分析ボタン, TODOカード など）
- **src/lib/**
  - サーバーサイドやクライアントサイド両方で利用できる「汎用的なロジック」や「設定」をまとめる場所
  - 例：SupabaseやAPIクライアントの初期化、バリデーション関数、ユーティリティ関数
  - DBアクセスのためのラッパーや、ビジネスロジック（データ整形・集計）もここに置く
  - **CakePHPでいうService/Repository層に近い役割**
  - **“純粋な処理”のみ（副作用を持たない）**
  - 例: `supabaseClient.ts`（Supabase初期化）、`validation.ts`（入力値バリデーション）、`journalService.ts`（日記データの取得・保存ロジック）
- **src/actions/**
  - Next.jsのServer Actions（フォーム送信やDB更新処理をサーバーで実行）
  - **UIやAPIから呼び出される「サーバーサイドの入り口」**
  - リクエスト受付・認証・エラー処理・lib呼び出し・レスポンス返却など“副作用”を含む
  - **CakePHPのController+Service的イメージ**
  - 例: `journalActions.ts`（日記登録・取得・削除など）
- **src/types/**
  - 型定義（DBスキーマやAPIレスポンス型など）
  - 例: `journal.ts`（日記データ型）、`user.ts`（ユーザー型）
- **public/**
  - 静的ファイル（画像、ドキュメント外リソース）
  - 例: `logo.png`, `robots.txt`
- **docs/**
  - プロジェクト運用・開発ルール・設計思想・TODOなどのドキュメント
  - 例: `coding-standards.md`, `todo/schedule-and-tasks.md`, `beginner-guidelines.md`
- **.env.local**
  - 環境変数（APIキー等、絶対にGit管理しない）
- **tailwind.config.js**
  - Tailwind CSSのカスタマイズ設定

---

## 4. libとactionsの違い・使い分け

### ● lib（Service/Repository層的役割）
- **主に「純粋なロジック」や「再利用したいデータ操作の部品」を実装**
- 例：Supabaseから日記データを取得する関数、バリデーション関数など
- **副作用（リクエスト受付やレスポンス返却）は持たない**

```ts
// lib/journalService.ts
export async function fetchJournals(userId: string) {
  // DBから日記一覧を取得
}
export async function saveJournal(userId: string, content: string) {
  // DBに日記を保存
}
```

### ● actions（Controller層的役割）
- **UIやAPIから呼び出される「サーバーサイドの窓口」**
- リクエスト受付・認証・エラー処理・lib呼び出し・レスポンス返却など“副作用”を含む
- Next.jsのServer Actionsとして`'use server'`が必要

```ts
// actions/journalActions.ts
'use server';
import { saveJournal } from '../lib/journalService';

export async function registerJournalAction(formData: FormData) {
  // 入力値取得・バリデーション・認証チェック
  // ↓
  return await saveJournal(userId, formData.get('content'));
}
```

### ● 違いのまとめ
| 役割             | lib                        | actions                       |
|------------------|----------------------------|-------------------------------|
| 主な責務         | 純粋な処理・部品           | サーバーの窓口・副作用処理     |
| 利用場所         | どこからでも再利用         | UIやAPIから呼び出される        |
| CakePHP対応      | Service/Repository         | Controller                    |

---

## 5. CakePHPとの対応イメージ

| CakePHP           | Next.jsプロジェクト構成         | 役割説明（簡単に）                 |
|-------------------|--------------------------------|------------------------------------|
| Controller        | `src/actions/`                  | UIからのリクエスト受付・処理分岐   |
| Service/Repository| `src/lib/`                      | ビジネスロジック・DB操作・整形     |
| Table (Model)     | `src/types/` + Supabase         | 型定義（TypeScript）＋DBスキーマ   |

---

## 6. 開発手法のポイント

- **Atomic Design**
  - UI部品を小さい単位（Atom: Button, Molecule: 入力フォーム, Organism: 入力＋リストなど）から組み上げることで再利用性・保守性UP
- **Server Components / Server Actions**
  - データ取得・更新はサーバーサイドで行い、セキュリティとパフォーマンスを両立
  - CakePHPのController+Serviceのイメージで、UIとロジックを分離
- **型安全な開発（TypeScript）**
  - 型定義を活用し、バグを未然に防ぐ
- **コーディング規約・セキュリティルール**
  - docs/coding-standards.md, docs/coding-guidelines.mdを必ず参照
- **ドキュメント駆動**
  - READMEやdocs/配下のファイルで仕様・ルール・タスクを常に明文化

---

## 7. 具体的なファイル例

- `src/app/dashboard/page.tsx` … ダッシュボード画面のUI（ページ単位）
- `src/components/journal/JournalEntry.tsx` … 日記入力UI部品（機能特化型）
- `src/components/ui/Button.tsx` … 汎用ボタン部品
- `src/components/habit/HabitList.tsx` … 習慣リスト表示部品
- `src/lib/supabaseClient.ts` … Supabaseの初期化・認証・DB操作関数
- `src/actions/journalActions.ts` … 日記の登録・取得などのサーバー処理
- `src/types/journal.ts` … 日記データ型定義

---

## 8. まとめ

- CakePHPのMVCやサービス層の考え方は、Next.jsでも「責務ごとにディレクトリを分ける」ことで活かせます
- サーバーサイド中心の設計・型安全・ドキュメント駆動が現代的なベストプラクティス
- ビギナーはまずこのガイドとREADME、docs/coding-standards.mdを読むのが推奨ルートです

---

> 疑問点や改善案があれば、docs/配下に追記・修正してください！
