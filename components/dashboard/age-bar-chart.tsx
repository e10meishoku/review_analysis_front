// components/dashboard/age-bar-chart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { age: "20代以下", score: 70 },
  { age: "30代", score: 45 },
  { age: "40代", score: 90 },
  { age: "50代", score: 60 },
  { age: "60代以上", score: 85 },
]

const chartConfig = {
  score: { label: "Satisfaction", color: "#121212" }, 
} satisfies ChartConfig

export function DashboardAgeBarChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 10, bottom: 0 }}>
        {/* グリッド線を少し薄く */}
        <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
        <XAxis 
            dataKey="age" 
            tickLine={false} 
            tickMargin={10} 
            axisLine={false} 
            stroke="#121212" 
            fontSize={12} 
            fontWeight="bold"
            tick={{ fill: 'rgba(0,0,0,0.5)' }}
        />
        <ChartTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} content={<ChartTooltipContent />} />
        {/* 黒いバー */}
        <Bar dataKey="score" fill="#121212" radius={[4, 4, 4, 4]} barSize={24} />
      </BarChart>
    </ChartContainer>
  )
}