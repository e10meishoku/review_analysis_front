// components/dashboard/trend-chart.tsx
"use client"

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", a: 100, b: 50 },
  { month: "Feb", a: 220, b: 150 },
  { month: "Mar", a: 250, b: 200 },
  { month: "Apr", a: 230, b: 210 },
  { month: "May", a: 200, b: 280 },
  { month: "Jun", a: 280, b: 320 },
  { month: "Jul", a: 350, b: 380 },
  { month: "Aug", a: 330, b: 350 },
  { month: "Sep", a: 300, b: 320 },
  { month: "Oct", a: 360, b: 370 },
  { month: "Nov", a: 340, b: 330 },
  { month: "Dec", a: 310, b: 300 },
]

const chartConfig = {
  a: { label: "New Buyer", color: "#6CC398" }, // 緑
  b: { label: "Repeat", color: "#DFF347" },    // ライム
} satisfies ChartConfig

export function DashboardTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
            <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6CC398" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6CC398" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DFF347" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#DFF347" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} stroke="#999" fontSize={12} interval={1} />
        <Tooltip />
        <Area type="monotone" dataKey="a" stroke="#6CC398" strokeWidth={3} fill="url(#colorA)" />
        <Area type="monotone" dataKey="b" stroke="#DFF347" strokeWidth={3} fill="url(#colorB)" />
      </AreaChart>
    </ChartContainer>
  )
}