// components/dashboard/issues-chart.tsx
"use client"

import { Bar, BarChart, XAxis, YAxis, LabelList, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { issue: "ピリピリする", count: 45 },
  { issue: "液だれ", count: 32 },
  { issue: "香りが強い", count: 28 },
  { issue: "高い", count: 15 },
  { issue: "ベタつく", count: 12 },
]

const chartConfig = {
  count: {
    label: "件数",
    // 修正: ライム背景に乗せるため、バーは黒(#121212)に戻す
    color: "#121212", 
  },
} satisfies ChartConfig

export function DashboardIssuesChart() {
  return (
    <div className="w-full h-full min-h-0">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{ left: 0, right: 20, top: 0, bottom: 0 }}
        >
          {/* グリッド線は少し濃くして見やすく */}
          <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <YAxis
            dataKey="issue"
            type="category"
            tickLine={false}
            axisLine={false}
            width={80}
            className="text-xs font-bold"
            // 修正: ライム背景上なので、文字色は完全な黒(#121212)にする
            tick={{ fill: '#121212' }}
          />
          <XAxis type="number" hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          
          {/* 修正: バーの色を黒に */}
          <Bar dataKey="count" fill="#121212" radius={4} barSize={32}>
             <LabelList dataKey="count" position="right" className="fill-foreground text-xs font-bold" />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}