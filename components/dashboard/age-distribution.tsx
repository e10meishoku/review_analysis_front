"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

// データ定義: 30代を最大としてLime色に設定
const chartData = [
  { label: "20代以下", count: 850, fill: "#e2e8f0" },     // 薄いグレー
  { label: "30代", count: 1240, fill: "var(--color-primary)" }, // Lime (強調)
  { label: "40代", count: 650, fill: "#94a3b8" },       // 中間のグレー
  { label: "50代", count: 350, fill: "#64748b" },       // 濃いグレー
  { label: "60代以上", count: 150, fill: "#121212" },   // 黒
]

const chartConfig = {
  count: { label: "Users" },
} satisfies ChartConfig

export function DashboardAgeDistribution() {
  // 最も多い年代とその割合を計算
  const { topAge, topPercentage } = React.useMemo(() => {
    const total = chartData.reduce((acc, curr) => acc + curr.count, 0)
    const maxItem = chartData.reduce((prev, current) => (prev.count > current.count) ? prev : current)
    const percentage = Math.round((maxItem.count / total) * 100)
    return { topAge: maxItem.label, topPercentage: percentage }
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center">
      {/* max-hを緩和し、aspect-squareで正方形を保ちつつ最大化 */}
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px] aspect-square">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="label"
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