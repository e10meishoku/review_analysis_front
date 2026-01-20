// app/dashboard/layout.tsx
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F4F8FB]">
      {/* 1. 左側: 固定サイドバー */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <AppSidebar />
      </aside>

      {/* 2. 右側: メインエリア */}
      <div className="flex flex-1 flex-col min-w-0">
        
        <AppHeader />
        
        {/* 
           修正: ここにあった "mx-auto max-w-7xl" を削除し、"w-full" に変更します。
           これにより、page.tsx 側の max-w-[1620px] 設定が正しく効くようになり、ヘッダーと揃います。
        */}
        <main className="flex-1 overflow-y-auto w-full">
           {children}
        </main>
      </div>
      
    </div>
  )
}