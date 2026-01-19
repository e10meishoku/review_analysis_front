//app/dashboard/page.tsx
import { KpiSection } from "@/components/dashboard/kpi-section"
import { DashboardRadarChart } from "@/components/dashboard/radar-chart"
import { DashboardAgeBarChart } from "@/components/dashboard/age-bar-chart"
import { DashboardTrendChart } from "@/components/dashboard/trend-chart"
import { DashboardIssuesChart } from "@/components/dashboard/issues-chart"
import { DashboardDonutChart } from "@/components/dashboard/donut-chart"

export default function DashboardPage() {
  const rowHeight = "xl:h-[320px]"

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1620px] mx-auto pb-6 px-6">
      
      {/* 
         1行目: KPI (2/3) : Buyer Satisfaction (1/3) 
         ★右側に AgeBarChart (ライム背景) を移動
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 ${rowHeight}`}>
        
        {/* 左: KPI (2/3) */}
        <div className="xl:col-span-2 h-full min-h-[300px] bg-white rounded-[2rem] p-6 shadow-sm flex flex-col">
            <KpiSection />
        </div>
        
        {/* 右: Buyer Satisfaction (1/3) -> bg-primary (ライム) */}
        <div className="xl:col-span-1 h-full min-h-[300px]">
             <div className="bg-primary rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
                 <h3 className="font-bold text-sm mb-4">年代別平均評価</h3>
                 <div className="flex-1 min-h-0 w-full">
                    <DashboardAgeBarChart />
                 </div>
                 {/* 凡例 */}
                 <div className="flex gap-4 mt-2 text-[10px] font-bold">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-black rounded-sm"></div>Satisfied</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-black/20 rounded-sm"></div>Unsatisfied</div>
                 </div>
             </div>
        </div>
      </div>

      {/* 
         2行目: Radar (1/3) : Trend (2/3) 
         ★左側に RadarChart (白背景) を移動
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 ${rowHeight}`}>
        
        {/* 左: Radar (1/3) -> bg-white (白) */}
        <div className="xl:col-span-1 h-full min-h-[300px]">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm h-full flex flex-col justify-center relative overflow-hidden">
                <h3 className="font-bold text-sm mb-2 text-muted-foreground ml-2 absolute top-6 left-6">AI分類スコア</h3>
                <div className="flex-1 w-full h-full flex items-center justify-center pt-6">
                  <DashboardRadarChart />
                </div>
            </div>
        </div>

        {/* 右: Trend (2/3) */}
        <div className="xl:col-span-2 h-full min-h-[300px]">
             <div className="bg-white rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
                 <div className="flex justify-between items-center mb-2">
                     <div>
                        <h3 className="font-bold text-sm">件数と評価の推移</h3>
                     </div>
                     <div className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                        250 Buyer
                     </div>
                 </div>
                 <div className="flex-1 min-h-0 w-full">
                    <DashboardTrendChart />
                 </div>
             </div>
        </div>
      </div>

      {/* 
         3行目: Issues (2/3) : Donut (1/3)
         ★左側の IssuesChart を bg-primary (ライム) に変更
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 ${rowHeight}`}>
        
        {/* 左: 不満点 (2/3) -> bg-primary (ライム) */}
        <div className="xl:col-span-2 h-full min-h-[300px]">
            <div className="bg-primary rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
                 <h3 className="font-bold text-sm mb-4">懸念事項のトップ5</h3>
                 <div className="flex-1 min-h-0 w-full">
                     <DashboardIssuesChart />
                 </div>
            </div>
        </div>

        {/* 右: 再購入意向 (1/3) */}
        <div className="xl:col-span-1 h-full min-h-[300px]">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
                 <h3 className="font-bold text-sm mb-4">リピート意欲</h3>
                 <div className="flex-1 min-h-0 flex items-center justify-center">
                     <DashboardDonutChart />
                 </div>
            </div>
        </div>
      </div>

    </div>
  )
}