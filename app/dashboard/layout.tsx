//app/dashboard/layout.tsx
import { AppSidebar } from "@/components/app-sidebar" // 自作版をインポート
import { AppHeader } from "@/components/app-header"   // トリガー修正版
import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 画面全体のコンテナ: スクロールさせない (h-screen, overflow-hidden)
    <div className="flex h-screen w-full overflow-hidden bg-[#F4F8FB]">
      
      {/* 1. 左側: 固定サイドバー */}
      {/* モバイルでは隠し、md以上で表示するレスポンシブ対応を入れています */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <AppSidebar />
      </aside>

      {/* 2. 右側: メインエリア (ヘッダー + コンテンツ) */}
      <div className="flex flex-1 flex-col min-w-0">
        
        {/* ヘッダー */}
        <AppHeader />
        
        {/* メインコンテンツ: ここだけスクロールさせる */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      
    </div>
  )
}