// components/app-sidebar.tsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation" // ■ 修正: useRouter を追加
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Sparkles,
  ScanFace,
  HeartHandshake,
  MessageSquare,
  Swords,
  Settings,
  LogOut, // ■ 追加: ログアウトアイコン
} from "lucide-react"

// ■ 追加: Supabaseクライアント
import { createClient } from "@/lib/supabase/client"

// ■ 追加: 作成したモーダルをインポート
import { FeatureComingSoonDialog } from "@/components/feature-coming-soon-dialog"

// メニュー構造を「セクション」で分ける
const SIDEBAR_SECTIONS = [
  {
    title: "Overview",
    items: [
      { icon: LayoutDashboard, label: "全体概要", href: "/dashboard" },
    ]
  },
  {
    title: "Deep Dive Analysis",
    items: [
      { icon: ScanFace, label: "年代別分析 (Age)", href: "/dashboard/analysis/age" },
      { icon: Sparkles, label: "肌質別分析 (Skin)", href: "/dashboard/analysis/skin" },
      { icon: HeartHandshake, label: "悩み・期待別 (Concerns)", href: "/dashboard/analysis/concerns" },
    ]
  },
  {
    title: "Market & Data",
    items: [
      { icon: Swords, label: "競合比較 (Vs Competitors)", href: "/dashboard/competitors" },
      { icon: MessageSquare, label: "口コミ検索 (Reviews)", href: "/dashboard/reviews" },
    ]
  },
  {
    title: "System",
    items: [
      { icon: Settings, label: "設定 (Settings)", href: "/dashboard/settings" },
    ]
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()     // ■ 追加: 画面遷移用
  const supabase = createClient() // ■ 追加: ログアウト処理用

  // ■ 追加: モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState("")

  // ■ 追加: 未実装機能をクリックした時のハンドラ
  const handleComingSoonClick = (label: string) => {
    setSelectedFeature(label)
    setIsModalOpen(true)
  }

  // ■ 追加: ログアウト処理
  const handleSignOut = async () => {
    // Supabaseからログアウト
    await supabase.auth.signOut()
    // ログイン画面へ戻す
    router.push("/login")
    router.refresh()
  }

  // ■ 追加: 現在実装済みのパスリスト
  const IMPLEMENTED_PATHS = ["/dashboard"]

  return (
    <>
      <div className="flex flex-col h-full w-full bg-[#121212] text-white">
        {/* ロゴエリア */}
        <div className="flex h-16 items-center px-6 mb-2">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="font-bold text-[#121212]">N</span>
          </div>
          <span className="font-bold text-lg tracking-tight">VOC Strategy</span>
        </div>

        {/* メニューエリア */}
        <div className="flex-1 px-4 py-2 space-y-6 overflow-y-auto">
          {SIDEBAR_SECTIONS.map((section, idx) => (
            <div key={idx}>
              {/* セクションタイトル */}
              {section.title && (
                <h4 className="px-4 mb-2 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  {section.title}
                </h4>
              )}
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  // アクティブ判定
                  const isActive = item.href === "/dashboard" 
                    ? pathname === item.href 
                    : pathname.startsWith(item.href)
                  
                  // 実装済みかどうか判定
                  const isImplemented = IMPLEMENTED_PATHS.includes(item.href)

                  // 共通のスタイルクラス
                  const itemClasses = cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group w-full text-left",
                    isActive 
                      ? "bg-[#DFF347] text-[#121212] font-bold shadow-[0_0_15px_rgba(223,243,71,0.3)]" 
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  )

                  if (isImplemented) {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={itemClasses}
                      >
                        <item.icon className={cn("h-4 w-4", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    )
                  } else {
                    return (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => handleComingSoonClick(item.label)}
                        className={itemClasses}
                      >
                        <item.icon className={cn("h-4 w-4", "stroke-[2px]")} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    )
                  }
                })}
              </div>
            </div>
          ))}
        </div>

        {/* フッターエリア */}
        <div className="p-4 border-t border-white/10 space-y-4">
          
          {/* データ更新情報などのカード */}
          <div className="bg-[#1E1E1E] rounded-xl p-4 text-center border border-white/5">
              <p className="text-[10px] text-gray-400 mb-2">Data updated: 2026/01/16</p>
              <button className="text-xs bg-white text-black px-3 py-2 rounded-lg font-bold w-full hover:bg-gray-200 transition">
                  Export Report
              </button>
          </div>

          {/* ■ 追加: ログアウトボタン */}
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors text-xs font-bold"
          >
            <LogOut className="h-4 w-4" />
            <span>ログアウト</span>
          </button>
        </div>
      </div>

      {/* モーダルコンポーネント */}
      <FeatureComingSoonDialog 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        featureName={selectedFeature}
      />
    </>
  )
}