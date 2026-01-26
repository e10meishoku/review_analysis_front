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
import { TrendItem } from "@/lib/api-client"

interface Props {
  data: TrendItem[]
}

const chartConfig = {
  review_count: {
    label: "口コミ件数",
    color: "#6CC398", // Green
  },
  average_rating: {
    label: "平均評価",
    color: "var(--color-primary)", // Lime
  },
} satisfies ChartConfig

// ▼▼▼ 集計ロジック ▼▼▼
// APIから来た日次データ(data)を、指定された粒度(granularity)でまとめ上げます
function aggregateData(data: TrendItem[], granularity: string): TrendItem[] {
  // データがない場合は空配列
  if (!data || data.length === 0) return []
  
  // 日次の場合はそのまま返す
  if (granularity === "day") return data

  // 集計用オブジェクト
  const grouped: Record<string, { countSum: number; ratingWeightedSum: number; items: number }> = {}

  data.forEach((item) => {
    const date = new Date(item.date)
    let key = item.date // デフォルト

    if (granularity === "year") {
      // 年次: "2025-01-01" (年の初日)
      const y = date.getFullYear()
      key = `${y}-01-01`

    } else if (granularity === "quarter") {
      // 四半期: 月を3で割って四半期の開始月(0, 3, 6, 9)を求める
      const y = date.getFullYear()
      const m = date.getMonth()
      const qStartMonth = Math.floor(m / 3) * 3
      // キーは "2025-01-01", "2025-04-01" 等にする
      const mStr = String(qStartMonth + 1).padStart(2, '0')
      key = `${y}-${mStr}-01`

    } else if (granularity === "month") {
      // 月次: "2025-01-01" (月の初日)
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      key = `${y}-${m}-01` 

    } else if (granularity === "week") {
      // 週次: その週の日曜日
      const d = new Date(date)
      const day = d.getDay()
      const diff = d.getDate() - day + (day === 0 ? -6 : 1) 
      const weekStart = new Date(d.setDate(diff))
      key = weekStart.toISOString().split('T')[0]
    }

    if (!grouped[key]) {
      grouped[key] = { countSum: 0, ratingWeightedSum: 0, items: 0 }
    }

    // 件数は単純足し算
    grouped[key].countSum += item.review_count
    
    // 加重平均用の計算
    grouped[key].ratingWeightedSum += (item.average_rating * item.review_count)
    grouped[key].items += item.review_count
  })

  // オブジェクトを配列に戻し、日付順にソート
  return Object.entries(grouped).map(([date, val]) => ({
    date,
    review_count: val.countSum,
    average_rating: val.items > 0 ? parseFloat((val.ratingWeightedSum / val.items).toFixed(2)) : 0
  })).sort((a, b) => a.date.localeCompare(b.date))
}

export function DashboardTrendChart({ data }: Props) {
  // 粒度選択の状態管理 (デフォルト: 月次)
  const [granularity, setGranularity] = React.useState("month")

  // useMemoを使って、データや粒度が変わった時だけ再計算する
  const displayedData = React.useMemo(() => {
    return aggregateData(data, granularity)
  }, [data, granularity])

  if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
            表示するデータがありません。
        </div>
    )
  }

  return (
    <Card className="border-none shadow-none bg-transparent h-full flex flex-col w-full">
      
      {/* 粒度選択用セレクトボックス */}
      <CardHeader className="flex flex-row items-center justify-end gap-2 space-y-0 py-0 pb-2 px-0">
        <Select value={granularity} onValueChange={setGranularity}>
          <SelectTrigger
            className="w-[140px] rounded-full h-8 text-xs font-medium bg-gray-50 border-gray-200"
          >
            <SelectValue placeholder="Monthly" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white">
            <SelectItem value="year" className="rounded-lg text-xs">Yearly (年)</SelectItem>
            <SelectItem value="quarter" className="rounded-lg text-xs">Quarterly (3ヶ月)</SelectItem>
            <SelectItem value="month" className="rounded-lg text-xs">Monthly (月)</SelectItem>
            <SelectItem value="week" className="rounded-lg text-xs">Weekly (週)</SelectItem>
            <SelectItem value="day" className="rounded-lg text-xs">Daily (日)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="px-0 pt-0 pb-0 flex-1 min-h-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full xl:h-full"
        >
          <ComposedChart data={displayedData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
                // 粒度によって日付フォーマットを変えて見やすくする
                if (granularity === 'year') {
                    // 年次: "2025"
                    return date.getFullYear().toString()
                } else if (granularity === 'quarter') {
                    // 四半期: "Q1 '25"
                    const m = date.getMonth() // 0, 3, 6, 9
                    const q = Math.floor(m / 3) + 1
                    return `Q${q} '${date.getFullYear().toString().slice(-2)}`
                } else if (granularity === 'month') {
                    // 月次: "Jan '25"
                    return date.toLocaleDateString("en-US", { year: '2-digit', month: 'short' })
                } else if (granularity === 'week') {
                    // 週次: "Jan 12"
                    return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
                }
                // 日次: "1/12"
                return date.toLocaleDateString("en-US", { month: 'numeric', day: 'numeric' })
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
                     const d = new Date(value)
                     if (granularity === 'year') {
                         return `${d.getFullYear()}年`
                     }
                     if (granularity === 'quarter') {
                         const q = Math.floor(d.getMonth() / 3) + 1
                         return `${d.getFullYear()}年 第${q}四半期`
                     }
                     if (granularity === 'month') {
                         return d.toLocaleDateString("ja-JP", { year: 'numeric', month: 'long' })
                     }
                     return d.toLocaleDateString("ja-JP")
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