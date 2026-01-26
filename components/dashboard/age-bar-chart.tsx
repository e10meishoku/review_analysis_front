// components/dashboard/age-bar-chart.tsx
"use client"

// 修正: ComposedChart, Line, YAxis 等をインポート
import { Bar, ComposedChart, Line, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

// ▼ Props定義の変更 (page.tsxで作成したマージデータの型)
interface CombinedAgeData {
  label: string
  count: number  // 件数
  rating: number // 評価
}

interface Props {
  data: CombinedAgeData[]
}

const chartConfig = {
  rating: { label: "平均評価", color: "#121212" },
  count: { label: "件数", color: "#FFFFFF" }, // 折れ線は白系で目立たせる
} satisfies ChartConfig

export function DashboardAgeBarChart({ data }: Props) {
  
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-black/50 text-xs font-bold">No Data</div>
  }

  // 評価に応じて色を変えるロジック (棒グラフ)
  const getBarColor = (score: number) => {
    return score >= 4.5 ? "#121212" : "rgba(18, 18, 18, 0.2)"
  }

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      {/* ComposedChartに変更 */}
      <ComposedChart accessibilityLayer data={data} margin={{ top: 10, bottom: 0, right: 0, left: 0 }}>
        <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
        
        <XAxis 
            dataKey="label" 
            tickLine={false} 
            tickMargin={10} 
            axisLine={false} 
            stroke="#121212" 
            fontSize={10} 
            fontWeight="bold"
            tick={{ fill: 'rgba(0,0,0,0.5)' }}
        />

        {/* 
            2軸設定:
            yAxisId="left" -> 評価 (1-7)
            yAxisId="right" -> 件数 (自動スケール)
        */}
        <YAxis yAxisId="left" orientation="left" domain={[0, 7]} hide />
        <YAxis yAxisId="right" orientation="right" hide />

        <ChartTooltip 
            cursor={{fill: 'rgba(0,0,0,0.05)'}} 
            content={<ChartTooltipContent />} 
        />
        
        {/* 棒グラフ (平均評価) - 左軸 */}
        <Bar yAxisId="left" dataKey="rating" radius={[4, 4, 4, 4]} barSize={24}>
           {data.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={getBarColor(entry.rating)} />
           ))}
        </Bar>

        {/* 折れ線グラフ (件数) - 右軸 */}
        {/* 背景がライム色なので、折れ線は白(#FFF)か濃いグレーでコントラストをつける */}
        <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="count" 
            stroke="#FFFFFF" 
            strokeWidth={3}
            dot={{ r: 4, fill: "#FFFFFF", strokeWidth: 0 }}
        />

      </ComposedChart>
    </ChartContainer>
  )
}