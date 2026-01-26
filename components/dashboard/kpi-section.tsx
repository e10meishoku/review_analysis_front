// components/dashboard/kpi-section.tsx
"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpRight, MessageCircle, Star, Users } from "lucide-react"
// Buttonは使われていませんが、元のコードにあったため残します
import { Button } from "@/components/ui/button"

// ■ APIから受け取るデータの型定義
// FastAPIからこの形式のJSONが返ってくることを想定しています
export interface KpiMetrics {
  review_count: number         // 口コミ件数 (例: 3240)
  review_count_trend: number   // 件数昨対比 (例: 20)
  average_rating: number       // 平均評価 (例: 5.55)
  average_rating_trend: number // 評価昨対比 (例: 10)
  average_age: number          // 平均年齢 (例: 35.8)
  average_age_trend: number    // 年齢昨対比 (例: 40)
}

interface KpiSectionProps {
  data?: KpiMetrics // データ読み込み中はundefinedの可能性があるためoptionalに
}

export function KpiSection({ data }: KpiSectionProps) {
  // 数値フォーマット用ヘルパー関数
  const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num)
  const formatTrend = (num: number) => (num > 0 ? `+${num}%` : `${num}%`)

  // 表示用データの構築
  // APIデータがある場合はそれを反映、なければハイフンを表示（ローディング対策）
  const kpis = [
    { 
      label: "口コミ件数", 
      val: data ? formatNumber(data.review_count) : "-", 
      trend: data ? formatTrend(data.review_count_trend) : "-", 
      sub: "from last month", 
      icon: MessageCircle 
    },
    { 
      label: "平均評価", 
      val: data ? data.average_rating.toFixed(2) : "-", 
      trend: data ? formatTrend(data.average_rating_trend) : "-", 
      sub: "from last month", 
      icon: Star 
    },
    { 
      label: "平均年齢", 
      val: data ? data.average_age.toFixed(1) : "-", 
      trend: data ? formatTrend(data.average_age_trend) : "-", 
      sub: "from last month", 
      icon: Users 
    },
  ]

  return (
    <div className="w-full h-full flex flex-col">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-1 px-1 shrink-0">
         <div>
            <h3 className="font-bold text-sm mb-4">主要指標</h3>
         </div>
      </div>

      {/* カード部分 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-xl rounded-[1.5rem] flex flex-col h-full overflow-hidden">
            
            {/* 上部: 黒いエリア */}
            {/* 
               修正ポイント: paddingをレスポンシブ対応に変更
               - p-4: モバイル・ノートPCなど狭い画面用
               - xl:p-7: 1620px以上の広い画面用
            */}
            <div className="bg-[#121212] text-white p-4 xl:p-7 flex-1 flex flex-col justify-center relative">
              <ArrowUpRight className="absolute top-4 right-4 xl:top-7 xl:right-7 h-5 w-5 xl:h-6 xl:w-6 text-gray-500" />
              
              <div className="flex items-center gap-3 xl:gap-5">
                {/* 
                   修正ポイント: アイコンの背景サイズをレスポンシブ対応
                   - h-10 w-10: ノートPC用
                   - xl:h-14 xl:w-14: デスクトップ用
                */}
                <div className="bg-white rounded-full h-10 w-10 xl:h-14 xl:w-14 flex items-center justify-center shrink-0">
                   {/* アイコン自体のサイズも調整 */}
                   <kpi.icon className="h-5 w-5 xl:h-7 xl:w-7 fill-black text-black" />
                </div>
                
                {/* 文字情報のコンテナ */}
                <div className="flex flex-col min-w-0">
                   {/* 
                      修正ポイント: フォントサイズをレスポンシブ対応
                      - text-2xl: モバイル
                      - lg:text-3xl: ノートPC (ここで見切れを防ぐ)
                      - xl:text-4xl: デスクトップ (元のサイズ)
                      - truncateは削除しました
                   */}
                   <span className="text-2xl lg:text-3xl xl:text-3.5xl font-extrabold tracking-tight leading-none whitespace-nowrap">
                     {kpi.val}
                   </span>
                   
                   {/* ラベルのサイズも微調整 */}
                   <span className="text-[10px] lg:text-xs xl:text-sm text-gray-400 font-bold mt-1 xl:mt-1.5 whitespace-nowrap">
                     {kpi.label}
                   </span>
                </div>
              </div>
            </div>
            
            {/* 下部: ライム色の帯 */}
            {/* こちらもpaddingを調整して高さを抑える */}
            <div className="bg-[#DFF347] px-4 py-3 xl:px-7 xl:py-5 flex items-center justify-center shrink-0">
               <div className="bg-[#5EEAD4] text-[#121212] text-[10px] xl:text-xs font-bold px-3 py-1.5 xl:px-4 xl:py-2 rounded-full inline-block whitespace-nowrap">
                 {kpi.trend} {kpi.sub}
               </div>
            </div>

          </Card>
        ))}
      </div>
    </div>
  )
}