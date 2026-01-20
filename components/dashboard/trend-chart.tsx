// components/dashboard/trend-chart.tsx
"use client"

import * as React from "react"
import { Area, Line, ComposedChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface TrendData {
  date: string
  review_count: number
  average_rating: number
}

const generateData = (): TrendData[] => {
  const data: TrendData[] = []
  const endDate = new Date()
  
  for (let i = 90; i >= 0; i--) {
    const date = new Date(endDate)
    date.setDate(date.getDate() - i)
    
    const baseCount = 40 + Math.sin(i * 0.2) * 20
    const count = Math.floor(baseCount + Math.random() * 20)

    const baseRating = 4.5 + Math.cos(i * 0.1) * 0.5
    const rating = parseFloat((baseRating + (Math.random() * 0.4 - 0.2)).toFixed(2))
    
    data.push({
      date: date.toISOString().split("T")[0],
      review_count: count,
      average_rating: rating,
    })
  }
  return data
}

const chartData = generateData()

const chartConfig = {
  review_count: {
    label: "口コミ件数",
    color: "#6CC398", // Green
  },
  average_rating: {
    label: "平均評価",
    color: "var(--color-primary)", // Lime (#DFF347)
  },
} satisfies ChartConfig

export function DashboardTrendChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    
    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="border-none shadow-none bg-transparent h-full flex flex-col w-full">
      <CardHeader className="flex flex-row items-center justify-end gap-2 space-y-0 py-0 pb-2 px-0">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[140px] rounded-full h-8 text-xs font-medium bg-gray-50 border-gray-200"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white">
            <SelectItem value="90d" className="rounded-lg text-xs">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg text-xs">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg text-xs">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="px-0 pt-0 pb-0 flex-1 min-h-0">
        <ChartContainer
          config={chartConfig}
          // 修正ポイント: 
          // - モバイル時: h-[250px] (固定高さを確保)
          // - XL以上: h-full (親の高さ320pxに追従)
          className="aspect-auto h-[250px] w-full xl:h-full"
        >
          <ComposedChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillReviewCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6CC398" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6CC398" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
              className="text-[10px] font-medium text-gray-400"
            />
            
            <YAxis yAxisId="left" orientation="left" hide />
            <YAxis yAxisId="right" orientation="right" domain={[1, 7]} hide />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ja-JP", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            
            <Area
              yAxisId="left"
              dataKey="review_count"
              type="natural"
              fill="url(#fillReviewCount)"
              stroke="#6CC398"
              strokeWidth={2}
            />
            
            <Line
              yAxisId="right"
              dataKey="average_rating"
              type="natural"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={false}
            />
            
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}