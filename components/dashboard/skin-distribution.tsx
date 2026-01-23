// components/dashboard/skin-distribution.tsx
"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

// データ定義
const chartData = [
  { type: "乾燥肌", count: 450, fill: "var(--color-primary)" }, // Lime (最大)
  { type: "混合肌", count: 300, fill: "#121212" },             // Black
  { type: "普通肌", count: 150, fill: "#94a3b8" },             // Gray
  { type: "脂性肌", count: 100, fill: "#e2e8f0" },             // Light Gray
]

const chartConfig = {
  count: { label: "Users" },
} satisfies ChartConfig

export function DashboardSkinDistribution() {
  // 最も多い肌質とその割合を計算
  const { topSkin, topPercentage } = React.useMemo(() => {
    const total = chartData.reduce((acc, curr) => acc + curr.count, 0)
    const maxItem = chartData.reduce((prev, current) => (prev.count > current.count) ? prev : current)
    const percentage = Math.round((maxItem.count / total) * 100)
    return { topSkin: maxItem.type, topPercentage: percentage }
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px] aspect-square">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="type"
            innerRadius="60%"
            outerRadius="100%"
            strokeWidth={0}
            paddingAngle={2}
          >
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