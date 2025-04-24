# コーディングガイドライン

## Next.js + Supabaseのセキュアな実装ガイド

このドキュメントでは、AI Habit Reflectionプロジェクトにおける安全なデータアクセスと認証の実装方法について説明します。

## 1. データアクセスの基本原則

### サーバーサイドファーストアプローチ

Next.js 15のServer ComponentsとServer Actionsを活用し、データアクセスはサーバーサイドで行うことを基本とします。

```tsx
// ✅ 推奨: Server Componentでのデータ取得
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = createServerClient();
  const { data: habits } = await supabase.from('habits').select();
  return <HabitList habits={habits} />;
}

// ❌ 非推奨: クライアントコンポーネントでの直接データ取得
// components/HabitList.tsx (クライアントコンポーネント)
'use client';
export default function HabitList() {
  const [habits, setHabits] = useState([]);
  
  useEffect(() => {
    const fetchHabits = async () => {
      const { data } = await supabase.from('habits').select();
      setHabits(data);
    };
    fetchHabits();
  }, []);
  
  return <div>{/* ... */}</div>;
}
```

### データ更新はServer Actionsで

データの作成・更新・削除操作はServer Actionsを使用します。

```tsx
// ✅ 推奨: Server Actionsでのデータ更新
// app/actions.ts
'use server';

import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';

const todoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  description: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付の形式が正しくありません'),
  priority: z.enum(['high', 'medium', 'low'])
});

export async function createTodo(formData: FormData) {
  // 認証チェック
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('認証が必要です');
  }
  
  // 入力検証
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description') || '',
    date: formData.get('date'),
    priority: formData.get('priority')
  };
  
  const result = todoSchema.safeParse(rawData);
  if (!result.success) {
    throw new Error('入力データが不正です: ' + result.error.message);
  }
  
  // データ挿入
  const { data, error } = await supabase.from('todos').insert({
    ...result.data,
    user_id: user.id
  });
  
  if (error) {
    console.error('データ挿入エラー:', error);
    throw new Error('TODOの作成に失敗しました');
  }
  
  return data;
}
```

## 2. 認証とセッション管理

### サーバーサイドでのセッション取得

```tsx
// app/layout.tsx
import { createServerClient } from '@/lib/supabase/server';

export default async function RootLayout({ children }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  return (
    <html>
      <body>
        <AuthProvider initialSession={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 保護されたルートの実装

```tsx
// app/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

export default async function DashboardLayout({ children }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // 未認証ユーザーはログインページにリダイレクト
    redirect('/login');
  }
  
  return <div>{children}</div>;
}
```

## 3. RLS (Row Level Security) の設計

すべてのテーブルにRLSを適用し、ユーザーが自分のデータのみにアクセスできるようにします。

```sql
-- habitsテーブルの例
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- SELECT操作のポリシー
CREATE POLICY "ユーザーは自分の習慣のみ参照可能" 
ON habits FOR SELECT 
USING (auth.uid() = user_id);

-- INSERT操作のポリシー
CREATE POLICY "ユーザーは自分の習慣のみ作成可能" 
ON habits FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- UPDATE操作のポリシー
CREATE POLICY "ユーザーは自分の習慣のみ更新可能" 
ON habits FOR UPDATE 
USING (auth.uid() = user_id);

-- DELETE操作のポリシー
CREATE POLICY "ユーザーは自分の習慣のみ削除可能" 
ON habits FOR DELETE 
USING (auth.uid() = user_id);
```

## 4. リアルタイム更新（必要な場合のみ）

リアルタイム更新が必要な場合は、クライアントコンポーネントでのサブスクリプションを最小限に絞ります。

```tsx
// components/RealtimeTodos.tsx
'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';

export default function RealtimeTodos({ initialTodos, userId }) {
  const [todos, setTodos] = useState(initialTodos);
  const supabase = createBrowserClient();
  
  useEffect(() => {
    // 自分のTODOのみをサブスクライブ
    const channel = supabase
      .channel('todos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          // ペイロードに基づいてTODOリストを更新
          if (payload.eventType === 'INSERT') {
            setTodos(prev => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setTodos(prev => prev.map(todo => 
              todo.id === payload.new.id ? payload.new : todo
            ));
          } else if (payload.eventType === 'DELETE') {
            setTodos(prev => prev.filter(todo => todo.id !== payload.old.id));
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

## 5. エラーハンドリングとログ

エラーハンドリングは詳細をサーバーサイドに残し、クライアントには最小限の情報のみを返します。

```tsx
// app/actions.ts
'use server';

import { createServerClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export async function deleteTodo(id: string) {
  try {
    const supabase = createServerClient();
    
    // 認証チェック
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      logger.warn('未認証ユーザーがTODO削除を試みました');
      throw new Error('認証が必要です');
    }
    
    // 所有権チェック
    const { data: todo } = await supabase
      .from('todos')
      .select('user_id')
      .eq('id', id)
      .single();
      
    if (!todo) {
      logger.warn(`存在しないTODO(${id})の削除が試みられました`);
      throw new Error('TODOが見つかりません');
    }
    
    if (todo.user_id !== user.id) {
      logger.warn(`ユーザー(${user.id})が他のユーザーのTODO(${id})を削除しようとしました`);
      throw new Error('このTODOを削除する権限がありません');
    }
    
    // 削除実行
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
      
    if (error) {
      logger.error(`TODO削除エラー: ${error.message}`, { id, userId: user.id });
      throw new Error('TODOの削除に失敗しました');
    }
    
    return { success: true };
  } catch (error) {
    // エラーの詳細はサーバーサイドにログ記録
    logger.error('TODO削除中にエラーが発生しました', { error });
    
    // クライアントには最小限の情報を返す
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('操作に失敗しました');
    }
  }
}
```

## 6. 環境変数の管理

環境変数は適切に分離し、クライアントサイドでは公開可能な情報のみを使用します。

```
# .env.local (サーバーサイドのみ)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key

# クライアントサイドでも使用可能
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 7. 実装例: Supabaseクライアントの設定

```tsx
// lib/supabase/server.ts (サーバーサイド用)
import { createServerClient as createClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerClient() {
  const cookieStore = cookies();
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

// lib/supabase/client.ts (クライアントサイド用)
'use client';

import { createBrowserClient as createClient } from '@supabase/ssr';

export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

## まとめ

- データアクセスはサーバーサイドで行うことを基本とする
- クライアントからのデータ更新はServer Actionsを使用する
- すべてのテーブルにRLSを適用する
- 入力データは必ずサーバーサイドで検証する
- エラーの詳細はサーバーサイドに残し、クライアントには最小限の情報を返す
