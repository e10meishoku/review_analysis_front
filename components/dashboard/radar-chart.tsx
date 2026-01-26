// components/dashboard/radar-chart.tsx
"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { ChartItem } from "@/lib/api-client" // 型をインポート

// ▼ Props定義
interface Props {
  data: ChartItem[]
}

const chartConfig = {
  desktop: {
    label: "Score",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

export function DashboardRadarChart({ data }: Props) {

  // データがない場合の表示
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xs font-bold">No Data</div>
  }

  return (
    <div className="w-full h-full min-h-0 flex items-center justify-center">
      <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px]">
        {/* outerRadiusを80%に拡大して余白を削減 */}
        <RadarChart data={data} outerRadius="80%">
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          {/* dataKey="label" を指定して項目名を表示 */}
          <PolarAngleAxis dataKey="label" className="text-xs font-bold" />
          <PolarGrid />
          {/* dataKey="count" を指定して値を表示 */}
          <Radar
            dataKey="count"
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