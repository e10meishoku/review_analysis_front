// components/app-header.tsx
"use client"

import { Search, Bell, MessageSquare, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// 1. SheetTitle を追加インポート
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { AppSidebar } from "@/components/app-sidebar"

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-[#F4F8FB] px-6 flex-shrink-0">
      <div className="flex items-center gap-4 flex-1">
        
        {/* モバイル用ハンバーガーメニュー */}
        <div className="md:hidden -ml-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent 
              side="left" 
              className="p-0 w-72 border-none bg-[#121212] text-white"
            >
              {/* 
                 2. アクセシビリティ用のタイトルを追加 
                 className="sr-only" をつけることで、画面には表示されず、
                 スクリーンリーダーにだけ「Navigation Menu」と伝わります。
              */}
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              {/* サイドバー本体 */}
              <AppSidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* 検索窓 */}
        <div className="relative hidden md:block w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="Tap here to search..."
            className="pl-11 h-10 rounded-full bg-white border-none shadow-sm text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-black/5 text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-black/5 text-gray-500">
          <MessageSquare className="h-5 w-5" />
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
    </header>
  )
}