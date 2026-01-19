"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

// データ定義: 点数ごとの色分け
const chartData = [
  { rating: "★7", count: 320, fill: "var(--color-primary)" }, // Lime
  { rating: "★6", count: 450, fill: "#6cc398" },             // Green
  { rating: "★5", count: 210, fill: "#94a3b8" },             // Slate-400
  { rating: "★4", count: 150, fill: "#cbd5e1" },             // Slate-300
  { rating: "★3", count: 80,  fill: "#e2e8f0" },             // Slate-200
  { rating: "★2", count: 20,  fill: "#333333" },             // Dark Gray
  { rating: "★1", count: 10,  fill: "#121212" },             // Black
]

const chartConfig = {
  count: { label: "Reviews" },
} satisfies ChartConfig

export function DashboardRatingDistribution() {
  // 加重平均の計算
  const averageRating = React.useMemo(() => {
    let totalScore = 0
    let totalCount = 0
    
    chartData.forEach((item) => {
      const score = parseInt(item.rating.replace("★", ""), 10)
      totalScore += score * item.count
      totalCount += item.count
    })

    return (totalScore / totalCount).toFixed(2)
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px] aspect-square">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="rating"
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