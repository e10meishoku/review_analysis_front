// components/dashboard/benefits-chart.tsx
"use client"

import { Bar, BarChart, XAxis, YAxis, LabelList, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { benefit: "保湿力が高い", count: 85 },
  { benefit: "香りが良い", count: 72 },
  { benefit: "肌馴染み", count: 68 },
  { benefit: "トーンアップ", count: 45 },
  { benefit: "低刺激", count: 42 },
]

// 背景がライム色になる想定なので、バーの色は黒にします
const chartConfig = {
  count: {
    label: "件数",
    color: "#121212", 
  },
} satisfies ChartConfig

export function DashboardBenefitsChart() {
  return (
    <div className="w-full h-full min-h-0">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{ left: 0, right: 20, top: 0, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <YAxis
            dataKey="benefit"
            type="category"
            tickLine={false}
            axisLine={false}
            width={80}
            className="text-xs font-bold"
            tick={{ fill: '#121212' }} // 黒文字
          />
          <XAxis type="number" hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          
          <Bar dataKey="count" fill="#121212" radius={4} barSize={32}>
             <LabelList dataKey="count" position="right" className="fill-foreground text-xs font-bold" />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}   