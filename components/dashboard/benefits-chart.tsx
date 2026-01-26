// components/dashboard/benefits-chart.tsx
"use client"

import { Bar, BarChart, XAxis, YAxis, LabelList, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { ChartItem } from "@/lib/api-client" // 型をインポート

// ▼ Props定義
interface Props {
  data: ChartItem[]
}

// 背景がライム色になる想定なので、バーの色は黒にします
const chartConfig = {
  count: {
    label: "件数",
    color: "#121212", 
  },
} satisfies ChartConfig

export function DashboardBenefitsChart({ data }: Props) {
  
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-black/50 text-xs font-bold">No Data</div>
  }

  return (
    <div className="w-full h-full min-h-0">
      <ChartContainer config={chartConfig} className="w-full h-full">
        {/* layout="vertical" で横棒グラフにします */}
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{ left: 0, right: 20, top: 0, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <YAxis
            dataKey="label" // ここに単語が入る
            type="category"
            tickLine={false}
            axisLine={false}
            width={80} // ラベルの幅を確保
            className="text-xs font-bold"
            tick={{ fill: '#121212' }} 
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