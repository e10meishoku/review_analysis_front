// components/dashboard/product-type-chart.tsx
"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { type: "購入品", visitors: 65, fill: "#121212" },
  { type: "リピート", visitors: 25, fill: "#DFF347" },
  { type: "モニター", visitors: 10, fill: "#e2e8f0" },
]

const chartConfig = {
  visitors: { label: "割合" },
} satisfies ChartConfig

export function DashboardProductTypeChart() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* max-hを300pxに拡大し、aspect-squareで正方形を維持 */}
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px] aspect-square">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="type"
            innerRadius="60%" // %指定
            outerRadius="100%" // %指定で最大化
            strokeWidth={0}
            paddingAngle={4}
          >
             <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-black">
                        65%
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 28} className="fill-muted-foreground text-xs font-bold">
                        新規購入
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