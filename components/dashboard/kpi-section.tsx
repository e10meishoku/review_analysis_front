// components/dashboard/kpi-section.tsx
"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpRight, MessageCircle, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function KpiSection() {
  const kpis = [
    { label: "口コミ件数", val: "3,240", trend: "+20%", sub: "from last month", icon: MessageCircle },
    { label: "平均評価", val: "5.55", trend: "+10%", sub: "from last month", icon: Star },
    { label: "平均年齢", val: "35.8", trend: "+40%", sub: "from last month", icon: Users },
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
            {/* 修正2: パディングを広げ(p-7)、中身を中央寄せ(justify-center)に */}
            <div className="bg-[#121212] text-white p-7 flex-1 flex flex-col justify-center relative">
              <ArrowUpRight className="absolute top-7 right-7 h-6 w-6 text-gray-500" />
              
              <div className="flex items-center gap-5">
                {/* 修正3: アイコンの白丸を大きく (h-14 w-14) */}
                <div className="bg-white rounded-full h-14 w-14 flex items-center justify-center shrink-0">
                   {/* アイコン自体も少し大きく、黒塗りに */}
                   <kpi.icon className="h-7 w-7 fill-black text-black" />
                </div>
                <div className="flex flex-col">
                   {/* 修正4: 数字を極太・特大に (text-4xl font-extrabold) */}
                   <span className="text-4xl font-extrabold tracking-tight leading-none">{kpi.val}</span>
                   <span className="text-sm text-gray-400 font-bold mt-1.5">{kpi.label}</span>
                </div>
              </div>
            </div>
            
            {/* 下部: ライム色の帯 */}
            <div className="bg-[#DFF347] px-7 py-5 flex items-center">
               {/* 修正5: カプセルの色を見本に近い明るいティール(#5EEAD4)に変更し、文字サイズ調整 */}
               <div className="bg-[#5EEAD4] text-[#121212] text-xs font-bold px-4 py-2 rounded-full inline-block">
                 {kpi.trend} {kpi.sub}
               </div>
            </div>

          </Card>
        ))}
      </div>
    </div>
  )
}