import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/95 border-b border-[#F0F0F0] shadow-sm">
        <div className="max-w-5xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-medium tracking-tight">AIハビットトラッカー</h1>
          </div>
          <nav className="flex items-center space-x-8">
            <Link href="/about" className="text-sm hover:text-[#053735] transition-colors">
              コンセプト
            </Link>
            <Link href="/features" className="text-sm hover:text-[#053735] transition-colors">
              機能
            </Link>
            <Link href="/login" className="text-sm px-5 py-2.5 rounded-lg border border-[#F0F0F0] hover:border-[#053735] hover:text-[#053735] transition-all shadow-sm hover:shadow">
              ログイン
            </Link>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow">
        {/* ヒーローセクション */}
        <section className="py-32 md:py-40 bg-white">
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                  習慣化と<br />
                  <span className="text-[#053735]">自己分析</span>を<br />
                  シンプルに。
                </h1>
                <p className="mt-8 text-lg text-[#666666] leading-relaxed max-w-md">
                  AIがあなたの日々の習慣と振り返りから、健康とマインドをサポートする新しい習慣管理ツール。
                </p>
                <div className="mt-12">
                  <div className="relative h-[52px]">
                    <Link href="/register" className="absolute inline-flex items-center px-7 py-3.5 rounded-lg bg-gradient-to-b from-[#0A4B48] to-[#053735] text-white text-sm font-medium shadow-md transition-all duration-200 ease-in-out group">
                      <span className="absolute inset-0 rounded-lg border-b-4 border-[#032523] group-hover:border-b-0 transition-all duration-200 ease-in-out"></span>
                      <span className="relative z-10 flex items-center group-hover:translate-y-1 transition-transform duration-200 ease-in-out">
                        無料で始める
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-xl bg-white border border-[#F0F0F0] shadow-md overflow-hidden flex items-center justify-center">
                  <div className="w-4/5 h-4/5 relative">
                    <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-[#F9FAFB] to-[#F5F5F5] border-b border-[#F0F0F0] rounded-t-lg flex items-center px-3 space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FC8181]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F6AD55]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#68D391]"></div>
                    </div>
                    <div className="pt-12 px-6">
                      <div className="h-4 w-24 bg-[#F0F0F0] rounded-md mb-6"></div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-md border border-[#E5E7EB] mr-3 shadow-sm"></div>
                          <div className="h-4 w-40 bg-[#F0F0F0] rounded-md"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-md border border-[#E5E7EB] mr-3 flex items-center justify-center shadow-sm">
                            <div className="h-3 w-3 bg-gradient-to-br from-[#0A4B48] to-[#053735] rounded-sm"></div>
                          </div>
                          <div className="h-4 w-32 bg-[#F0F0F0] rounded-md"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-md border border-[#E5E7EB] mr-3 shadow-sm"></div>
                          <div className="h-4 w-36 bg-[#F0F0F0] rounded-md"></div>
                        </div>
                      </div>
                      <div className="mt-10 h-24 bg-gradient-to-br from-[#F9FAFB] to-[#F5F5F5] rounded-lg shadow-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#053735]/5 rounded-full shadow-lg"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#A67C52]/5 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 機能紹介セクション */}
        <section className="py-32 bg-[#F9FAFB]">
          <div className="max-w-5xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-medium tracking-tight">
                主な機能
              </h2>
              <p className="mt-5 text-[#666666] max-w-xl mx-auto">
                シンプルな4つの機能で、あなたの健康的な習慣をサポート
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* 習慣トラッカー */}
              <div className="p-8 rounded-xl bg-white border border-[#F0F0F0] hover:border-[#053735] transition-colors group shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A4B48]/10 to-[#053735]/10 flex items-center justify-center text-[#053735] mb-6 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-[#053735] transition-colors">習慣トラッカー</h3>
                <p className="text-[#666666]">毎日の習慣をチェックリスト形式で管理し、継続的な習慣化をサポートします。朝・昼・夜の時間帯別に設定可能。</p>
              </div>

              {/* TODO管理 */}
              <div className="p-8 rounded-xl bg-white border border-[#F0F0F0] hover:border-[#A67C52] transition-colors group shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A67C52]/10 to-[#8A6A45]/10 flex items-center justify-center text-[#A67C52] mb-6 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-[#A67C52] transition-colors">TODO管理</h3>
                <p className="text-[#666666]">その日限定のタスクを記録・管理し、日々の目標達成をサポートします。優先度や締め切りの設定も可能。</p>
              </div>

              {/* 日記機能 */}
              <div className="p-8 rounded-xl bg-white border border-[#F0F0F0] hover:border-[#5B7B7A] transition-colors group shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5B7B7A]/10 to-[#4A6A69]/10 flex items-center justify-center text-[#5B7B7A] mb-6 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-[#5B7B7A] transition-colors">日記機能</h3>
                <p className="text-[#666666]">1日の振り返りや感情を自由に記録し、自己理解を深めます。テキストだけでなく、感情タグの追加も可能。</p>
              </div>

              {/* AI分析 */}
              <div className="p-8 rounded-xl bg-white border border-[#F0F0F0] hover:border-[#8A7968] transition-colors group shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8A7968]/10 to-[#79685A]/10 flex items-center justify-center text-[#8A7968] mb-6 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-[#8A7968] transition-colors">AI分析</h3>
                <p className="text-[#666666]">習慣の進捗と日記内容からメンタル状態や健康状態を分析し、パーソナライズされたアドバイスを提供します。</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-32 bg-white">
          <div className="max-w-3xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-medium tracking-tight mb-6">
              あなたの健康習慣を始めませんか？
            </h2>
            <p className="text-[#666666] mb-12 max-w-xl mx-auto">
              AIハビットトラッカーは完全無料で始められます。プレミアム機能は後からいつでもアップグレード可能です。
            </p>
            <div className="relative h-[52px]">
              <Link href="/register" className="absolute inline-flex items-center px-8 py-3.5 rounded-lg bg-gradient-to-b from-[#0A4B48] to-[#053735] text-white text-sm font-medium shadow-md transition-all duration-200 ease-in-out group">
                <span className="absolute inset-0 rounded-lg border-b-4 border-[#032523] group-hover:border-b-0 transition-all duration-200 ease-in-out"></span>
                <span className="relative z-10 flex items-center group-hover:translate-y-1 transition-transform duration-200 ease-in-out">
                  無料で始める
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-[#F0F0F0] py-16 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#666666]">
              &copy; 2025 AIハビットトラッカー
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="text-sm text-[#666666] hover:text-[#053735] transition-colors">
                プライバシーポリシー
              </a>
              <a href="#" className="text-sm text-[#666666] hover:text-[#053735] transition-colors">
                利用規約
              </a>
              <a href="#" className="text-sm text-[#666666] hover:text-[#053735] transition-colors">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
