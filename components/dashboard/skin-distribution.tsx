// components/dashboard/skin-distribution.tsx
"use client"

import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts" // Cellを追加
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { ChartItem } from "@/lib/api-client" // 型をインポート

// ▼ Props定義
interface Props {
  data: ChartItem[]
}

const chartConfig = {
  count: { label: "Users" },
} satisfies ChartConfig

// 肌質ごとの固定色定義 (labelとのマッピング)
const COLOR_MAP: Record<string, string> = {
  "乾燥肌": "var(--color-primary)", // Lime
  "混合肌": "#121212",             // Black
  "普通肌": "#94a3b8",             // Gray
  "脂性肌": "#e2e8f0",             // Light Gray
  "敏感肌": "#6cc398",             // Green
  "不明": "#f1f5f9"
}

export function DashboardSkinDistribution({ data }: Props) {
  
  // データが空の場合のハンドリング
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold">No Data</div>
  }

  // 最も多い肌質とその割合を計算
  const { topSkin, topPercentage } = React.useMemo(() => {
    const total = data.reduce((acc, curr) => acc + curr.count, 0)
    if (total === 0) return { topSkin: "-", topPercentage: 0 }

    const maxItem = data.reduce((prev, current) => (prev.count > current.count) ? prev : current)
    const percentage = Math.round((maxItem.count / total) * 100)
    return { topSkin: maxItem.label, topPercentage: percentage }
  }, [data])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px] aspect-square">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="count"
            nameKey="label"
            innerRadius="60%"
            outerRadius="100%"
            strokeWidth={0}
            paddingAngle={2}
          >
            {/* 色を動的に割り当て */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.label] || "#cbd5e1"} />
            ))}

            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-black">
                        {topSkin}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 28} className="fill-muted-foreground text-sm font-bold">
                        {topPercentage}%
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