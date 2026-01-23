// components/app-header.tsx
"use client"

import { Bell, Menu, SlidersHorizontal } from "lucide-react" // フィルターアイコン追加
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { AppSidebar } from "@/components/app-sidebar"
import { HeaderFilters } from "@/components/header-filters"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-[#F4F8FB] flex-shrink-0">
      <div className="flex h-16 items-center gap-4 w-full max-w-[1620px] mx-auto px-6">
        
        {/* 左側エリア */}
        <div className="flex items-center gap-4 flex-1 w-full min-w-0">
          
          {/* A. モバイル用: ハンバーガーメニュー */}
          <div className="md:hidden -ml-2 shrink-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-none bg-[#121212] text-white">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <AppSidebar />
              </SheetContent>
            </Sheet>
          </div>

          {/* B. デスクトップ用: フィルター (横並び) */}
          <div className="hidden md:block w-full">
             <HeaderFilters className="flex-row items-center" />
          </div>

          {/* C. モバイル用: フィルターボタン (アイコンのみ表示) */}
          <div className="md:hidden ml-auto">
             <Sheet>
                <SheetTrigger asChild>
                   <Button variant="outline" size="sm" className="rounded-full h-9 bg-white border-gray-200 text-gray-700 gap-2 px-3 shadow-sm">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="text-xs font-bold">Filter</span>
                   </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-auto pb-8 rounded-b-[1.5rem]">
                   <SheetTitle className="mb-4 text-center font-bold">分析条件の変更</SheetTitle>
                   <SheetDescription className="sr-only">分析対象のブランド、商品、期間を設定します</SheetDescription>
                   {/* ここでフィルターを縦並び(flex-col)で表示 */}
                   <HeaderFilters className="flex-col" />
                   
                   <div className="mt-6">
                      <Button className="w-full rounded-full font-bold">適用する</Button>
                   </div>
                </SheetContent>
             </Sheet>
          </div>
        </div>

        {/* 右側エリア: 通知 + プロフィール */}
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-black/5 text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3 pl-3 ml-2 border-l border-gray-200">
            <div className="text-right hidden sm:block leading-tight">
              <p className="text-sm font-bold text-gray-900">佐藤 理恵</p>
              <p className="text-[10px] text-gray-500 font-medium">Brand Manager</p>
            </div>
            <Avatar className="h-9 w-9 border border-white shadow-sm cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}