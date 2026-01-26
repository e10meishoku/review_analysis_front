// components/dashboard/issues-chart.tsx
"use client"

import { Bar, BarChart, XAxis, YAxis, LabelList, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { ChartItem } from "@/lib/api-client"

interface Props {
  data: ChartItem[]
}

const chartConfig = {
  count: {
    label: "件数",
    color: "#121212", 
  },
} satisfies ChartConfig

export function DashboardIssuesChart({ data }: Props) {
  
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-black/50 text-xs font-bold">No Data</div>
  }

  return (
    <div className="w-full h-full min-h-0">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{ left: 0, right: 20, top: 0, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <YAxis
            dataKey="label"
            type="category"
            tickLine={false}
            axisLine={false}
            width={80}
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