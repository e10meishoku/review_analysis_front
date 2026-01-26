// components/dashboard/rating-distribution.tsx
"use client"

import * as React from "react"
import { Label, Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { ChartItem } from "@/lib/api-client"

interface Props {
  data: ChartItem[]
}

const chartConfig = {
  count: { label: "Reviews" },
} satisfies ChartConfig

// 評価ごとの色定義
const COLOR_MAP: Record<string, string> = {
  "★7": "var(--color-primary)", // Lime
  "★6": "#6cc398",             // Green
  "★5": "#94a3b8",             // Slate-400
  "★4": "#cbd5e1",             // Slate-300
  "★3": "#e2e8f0",             // Slate-200
  "★2": "#333333",             // Dark Gray
  "★1": "#121212",             // Black
}

export function DashboardRatingDistribution({ data }: Props) {

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold">No Data</div>
  }

  // 加重平均の計算 (レーティングの場合、件数ではなく平均点が中心に欲しい場合が多いため)
  const averageRating = React.useMemo(() => {
    let totalScore = 0
    let totalCount = 0
    
    data.forEach((item) => {
      // "★7" -> 7 に変換
      const score = parseInt(item.label.replace("★", ""), 10)
      if (!isNaN(score)) {
        totalScore += score * item.count
        totalCount += item.count
      }
    })

    if (totalCount === 0) return "0.00"
    return (totalScore / totalCount).toFixed(2)
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
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-black">
                        {averageRating}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 28} className="fill-muted-foreground text-sm font-bold">
                        Average
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