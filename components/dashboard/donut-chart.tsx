// components/dashboard/donut-chart.tsx
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
  visitors: { label: "回答数" },
} satisfies ChartConfig

// 色定義
const COLOR_MAP: Record<string, string> = {
  "リピートしたい": "var(--color-primary)", // Lime
  "分からない": "var(--color-muted)",      // Gray
  "しない": "#121212",                    // Black
}

export function DashboardDonutChart({ data }: Props) {
  
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold">No Data</div>
  }

  const totalPositive = React.useMemo(() => {
    const total = data.reduce((acc, curr) => acc + curr.count, 0)
    if (total === 0) return 0
    // "リピートしたい" の割合
    const target = data.find(d => d.label === "リピートしたい")
    if (!target) return 0
    return Math.round((target.count / total) * 100)
  }, [data])

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* max-hを300pxに拡大 */}
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
            paddingAngle={5}
          >
            {data.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.label] || "#e2e8f0"} />
            ))}

            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-black">
                        {totalPositive}%
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 28} className="fill-muted-foreground text-xs font-bold">
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