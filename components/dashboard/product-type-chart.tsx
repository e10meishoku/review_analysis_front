// components/dashboard/product-type-chart.tsx
"use client"

import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts" // Cell追加
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { ChartItem } from "@/lib/api-client" // 型をインポート

// ▼ Props定義
interface Props {
  data: ChartItem[]
}

const chartConfig = {
  visitors: { label: "割合" },
} satisfies ChartConfig

// タイプごとの色定義
const COLOR_MAP: Record<string, string> = {
  "購入品": "#121212",            // 黒 (メイン)
  "リピート": "var(--color-primary)", // Lime (強調)
  "モニター": "#e2e8f0",          // グレー
  "サンプル": "#94a3b8",          // 濃いグレー
  "プレゼント": "#cbd5e1"
}

export function DashboardProductTypeChart({ data }: Props) {
  
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold">No Data</div>
  }

  // 「購入品」の割合を計算（中央に表示するため）
  const purchaseRate = React.useMemo(() => {
    const total = data.reduce((acc, curr) => acc + curr.count, 0)
    if (total === 0) return 0
    const target = data.find(d => d.label === "購入品") || data[0]
    return Math.round((target.count / total) * 100)
  }, [data])

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* max-hを300pxに拡大し、aspect-squareで正方形を維持 */}
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px] aspect-square">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="count"
            nameKey="label"
            innerRadius="60%" // %指定
            outerRadius="100%" // %指定で最大化
            strokeWidth={0}
            paddingAngle={4}
          >
             {/* 色の適用 */}
             {data.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.label] || "#e2e8f0"} />
            ))}

             <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-black">
                        {purchaseRate}%
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 28} className="fill-muted-foreground text-xs font-bold">
                        購入品
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}