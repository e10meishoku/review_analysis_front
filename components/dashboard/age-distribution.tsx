// components/dashboard/age-distribution.tsx
"use client"

import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { ChartItem } from "@/lib/api-client"

// ▼ Props定義
interface Props {
  data: ChartItem[]
}

const chartConfig = {
  count: { label: "Users" },
} satisfies ChartConfig

// 年代ごとの色定義
const COLOR_MAP: Record<string, string> = {
  "20代以下": "#e2e8f0",            // 薄いグレー
  "30代": "var(--color-primary)",   // Lime (ターゲット層強調)
  "40代": "#94a3b8",              // 中間のグレー
  "50代": "#64748b",              // 濃いグレー
  "60代以上": "#121212",            // 黒
}

export function DashboardAgeDistribution({ data }: Props) {

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold">No Data</div>
  }

  // 最も多い年代とその割合を計算
  const { topAge, topPercentage } = React.useMemo(() => {
    const total = data.reduce((acc, curr) => acc + curr.count, 0)
    if (total === 0) return { topAge: "-", topPercentage: 0 }

    const maxItem = data.reduce((prev, current) => (prev.count > current.count) ? prev : current)
    const percentage = Math.round((maxItem.count / total) * 100)
    return { topAge: maxItem.label, topPercentage: percentage }
  }, [data])

  return (
    <div className="h-full w-full flex items-center justify-center">
      {/* max-hを緩和し、aspect-squareで正方形を保ちつつ最大化 */}
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
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-black">
                        {topAge}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 28} className="fill-muted-foreground text-sm font-bold">
                        {topPercentage}% Users
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