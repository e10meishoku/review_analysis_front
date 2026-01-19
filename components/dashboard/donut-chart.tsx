// components/dashboard/donut-chart.tsx
"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

// 修正: 配色をトンマナに合わせる
const chartData = [
  { label: "リピートしたい", visitors: 75, fill: "var(--color-primary)" }, // ライム (変更なし)
  { label: "分からない", visitors: 15, fill: "var(--color-muted)" },   // グレー (変更なし)
  { label: "しない", visitors: 10, fill: "#121212" },                  // 黒 (赤から変更)
]

const chartConfig = {
  visitors: { label: "回答数" },
} satisfies ChartConfig

export function DashboardDonutChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[250px] aspect-square">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="label"
            innerRadius="60%"
            outerRadius="100%"
            strokeWidth={0}
            paddingAngle={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-black">
                        {totalVisitors}%
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs font-bold">
                        Positive
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