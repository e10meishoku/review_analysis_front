// app/dashboard/page.tsx
import { KpiSection } from "@/components/dashboard/kpi-section"
import { DashboardAgeBarChart } from "@/components/dashboard/age-bar-chart"
import { DashboardAgeDistribution } from "@/components/dashboard/age-distribution"
import { DashboardRatingDistribution } from "@/components/dashboard/rating-distribution"
import { DashboardSkinDistribution } from "@/components/dashboard/skin-distribution"
import { DashboardTrendChart } from "@/components/dashboard/trend-chart"
import { DashboardRadarChart } from "@/components/dashboard/radar-chart"
import { DashboardProductTypeChart } from "@/components/dashboard/product-type-chart"
import { DashboardDonutChart } from "@/components/dashboard/donut-chart"
import { DashboardBenefitsChart } from "@/components/dashboard/benefits-chart"
import { DashboardIssuesChart } from "@/components/dashboard/issues-chart"


export default function DashboardPage() {
  // ■ 将来的なAPIデータ取得を想定したダミーデータ
  // バックエンド接続時はここを fetch('/api/dashboard/kpi') などに置き換えます
  const kpiDummyData = {
    review_count: 3240,
    review_count_trend: 20,
    average_rating: 5.55,
    average_rating_trend: 10,
    average_age: 35.8,
    average_age_trend: 40,
  }

  const rowHeight = "xl:h-[320px]"

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1620px] mx-auto pb-8 px-6 pt-6">
      
      {/* 
         1行目: KPI (2/3) : Buyer Satisfaction (1/3) 
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        <div className="xl:col-span-2 h-full min-h-[300px] bg-white rounded-[2rem] p-6 shadow-sm flex flex-col overflow-hidden">
            {/* ここでデータを渡します */}
            <KpiSection data={kpiDummyData} />
        </div>
        <div className="xl:col-span-1 h-full min-h-[300px]">
             <div className="bg-primary rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
                 <h3 className="font-bold text-sm mb-4">年代別平均評価</h3>
                 <div className="flex-1 min-h-0 w-full">
                    <DashboardAgeBarChart />
                 </div>
                 <div className="flex gap-4 mt-2 text-[10px] font-bold">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-black rounded-sm"></div>Satisfied</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-black/20 rounded-sm"></div>Unsatisfied</div>
                 </div>
             </div>
        </div>
      </div>

      {/* 
         2行目: 3つの円グラフ
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        
        {/* 年代分布 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-sm text-center mb-2">年代構成比</h3>
            <div className="flex-1 w-full min-h-0">
                <DashboardAgeDistribution />
            </div>
        </div>

        {/* 評価分布 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-sm text-center mb-2">評価点数分布</h3>
            <div className="flex-1 w-full min-h-0">
                <DashboardRatingDistribution />
            </div>
        </div>

        {/* 肌質分布 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-sm text-center mb-2">肌質構成比</h3>
            <div className="flex-1 w-full min-h-0">
                <DashboardSkinDistribution />
            </div>
        </div>
      </div>

      {/* 
         3行目: トレンドチャート
      */}
      <div className={`w-full ${rowHeight}`}>
         <div className="bg-white rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-2">
                 <div>
                    <h3 className="font-bold text-sm">件数と評価の推移</h3>
                 </div>
             </div>
             <div className="flex-1 min-h-0 w-full">
                <DashboardTrendChart />
             </div>
         </div>
      </div>

      {/* 
         4行目: 3つの分析チャート
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        
        {/* 左: AI分類スコア */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">AI分類スコア</h3>
             <div className="flex-1 w-full min-h-0">
                 <DashboardRadarChart />
             </div>
        </div>

        {/* 中: 商品タイプ */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">商品タイプ構成</h3>
             <div className="flex-1 w-full min-h-0">
                 <DashboardProductTypeChart />
             </div>
        </div>

        {/* 右: リピート意欲 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">リピート意欲</h3>
             <div className="flex-1 w-full min-h-0">
                 <DashboardDonutChart />
             </div>
        </div>
      </div>

      {/* 
         5行目: ベネフィット vs 懸念 (2分割)
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 ${rowHeight}`}>
        
        {/* 左: ベネフィットトップ5 */}
        <div className="bg-primary rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm mb-4">ベネフィットの種類のトップ5</h3>
             <div className="flex-1 min-h-0 w-full">
                 <DashboardBenefitsChart />
             </div>
        </div>

        {/* 右: 懸念事項トップ5 */}
        <div className="bg-primary rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm mb-4">懸念事項のトップ5</h3>
             <div className="flex-1 min-h-0 w-full">
                 <DashboardIssuesChart />
             </div>
        </div>
      </div>

    </div>
  )
}