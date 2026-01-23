// components/dashboard/radar-chart.tsx
"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { subject: "効果実感", A: 120, fullMark: 150 },
  { subject: "パッケージ", A: 98, fullMark: 150 },
  { subject: "使用感", A: 86, fullMark: 150 },
  { subject: "再購入", A: 99, fullMark: 150 },
  { subject: "香り", A: 85, fullMark: 150 },
  { subject: "コスパ", A: 65, fullMark: 150 },
]

const chartConfig = {
  desktop: {
    label: "Score",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

export function DashboardRadarChart() {
  return (
    <div className="w-full h-full min-h-0 flex items-center justify-center">
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px]">
        {/* outerRadiusを80%に拡大して余白を削減 */}
        <RadarChart data={chartData} outerRadius="80%">
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="subject" className="text-xs font-bold" />
          <PolarGrid />
          <Radar
            dataKey="A"
            fill="var(--color-primary)"
            fillOpacity={0.5}
            stroke="var(--color-success)"
            strokeWidth={2}
            dot={{ r: 3, fillOpacity: 1, fill: "var(--color-success)" }}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  )
}