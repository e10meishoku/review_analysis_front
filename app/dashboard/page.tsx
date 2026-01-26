// review_analysis_front/app/dashboard/page.tsx

import { fetchKpiData } from "@/lib/api-client"

import { KpiSection } from "@/components/dashboard/kpi-section"
import { DashboardAgeBarChart } from "@/components/dashboard/age-bar-chart" // 修正対象
import { DashboardAgeDistribution } from "@/components/dashboard/age-distribution"
import { DashboardRatingDistribution } from "@/components/dashboard/rating-distribution"
import { DashboardSkinDistribution } from "@/components/dashboard/skin-distribution"
import { DashboardTrendChart } from "@/components/dashboard/trend-chart" // 修正対象
import { DashboardRadarChart } from "@/components/dashboard/radar-chart"
import { DashboardProductTypeChart } from "@/components/dashboard/product-type-chart"
import { DashboardDonutChart } from "@/components/dashboard/donut-chart"
import { DashboardBenefitsChart } from "@/components/dashboard/benefits-chart"
import { DashboardIssuesChart } from "@/components/dashboard/issues-chart"

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams

  const filter = {
    manufacturer_name: typeof params.manufacturer === 'string' ? params.manufacturer : undefined,
    product_name: typeof params.product === 'string' ? params.product : undefined,
    start_date: typeof params.from === 'string' ? params.from : undefined,
    end_date: typeof params.to === 'string' ? params.to : undefined,
  }

  const dashboardData = await fetchKpiData(filter)
  
  const kpiData = dashboardData?.kpi
  const distData = dashboardData?.distributions
  const radarData = dashboardData?.radar || []
  const productTypeData = dashboardData?.product_type || []
  const repurchaseData = dashboardData?.repurchase || []
  const ageRatingData = dashboardData?.age_rating || []
  const trendData = dashboardData?.trend || []

  // ▼▼▼ 追加: 年代別の「件数」と「評価」をマージする処理 ▼▼▼
  // distData.age (件数) と ageRatingData (評価) を結合します
  const combinedAgeData = (distData?.age || []).map((ageDistItem) => {
    // 同じ年代ラベルを持つ評価データを検索
    const ratingItem = ageRatingData.find(r => r.label === ageDistItem.label)
    return {
      label: ageDistItem.label,     // 年代
      count: ageDistItem.count,     // 件数 (distData由来)
      rating: ratingItem?.count || 0 // 評価 (ageRatingData由来)
    }
  })

  const rowHeight = "xl:h-[320px]"

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1620px] mx-auto pb-8 px-6 pt-6">
      
      {/* 
         1行目: KPI (2/3) : Buyer Satisfaction (1/3) 
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        <div className="xl:col-span-2 h-full min-h-[300px] bg-white rounded-[2rem] p-6 shadow-sm flex flex-col overflow-hidden">
            <KpiSection data={kpiData || undefined} />
        </div>
        <div className="xl:col-span-1 h-full min-h-[300px]">
             <div className="bg-primary rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
                 <h3 className="font-bold text-sm mb-4">年代別平均評価と件数</h3>
                 <div className="flex-1 min-h-0 w-full">
                    {/* ▼ 修正: マージしたデータを渡す */}
                    <DashboardAgeBarChart data={combinedAgeData} />
                 </div>
                 <div className="flex gap-4 mt-2 text-[10px] font-bold">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-black rounded-sm"></div>Avg Rating</div>
                    {/* 折れ線グラフの説明を追加 */}
                    <div className="flex items-center gap-1"><div className="w-2 h-1 bg-white rounded-full"></div>Review Count</div>
                 </div>
             </div>
        </div>
      </div>

      {/* 2行目: 円グラフ (変更なし) */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-sm text-center mb-2">年代構成比</h3>
            <div className="flex-1 w-full min-h-0">
                <DashboardAgeDistribution data={distData?.age || []} />
            </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-sm text-center mb-2">評価点数分布</h3>
            <div className="flex-1 w-full min-h-0">
                <DashboardRatingDistribution data={distData?.rating || []} />
            </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-sm text-center mb-2">肌質構成比</h3>
            <div className="flex-1 w-full min-h-0">
                <DashboardSkinDistribution data={distData?.skin || []} />
            </div>
        </div>
      </div>

      {/* 3行目: トレンドチャート */}
      <div className={`w-full ${rowHeight}`}>
         <div className="bg-white rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-2">
                 <div>
                    <h3 className="font-bold text-sm">件数と評価の推移</h3>
                 </div>
             </div>
             <div className="flex-1 min-h-0 w-full">
                <DashboardTrendChart data={trendData} />
             </div>
         </div>
      </div>

      {/* 4行目: 分析チャート (変更なし) */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">AI分類スコア</h3>
             <div className="flex-1 w-full min-h-0">
                 <DashboardRadarChart data={radarData} />
             </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">商品タイプ構成</h3>
             <div className="flex-1 w-full min-h-0">
                 <DashboardProductTypeChart data={productTypeData} />
             </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">リピート意欲</h3>
             <div className="flex-1 w-full min-h-0">
                 <DashboardDonutChart data={repurchaseData} />
             </div>
        </div>
      </div>

      {/* 5行目: ワードランキング (変更なし) */}
      <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 ${rowHeight}`}>
        <div className="bg-primary rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm mb-4">ベネフィットの種類のトップ5</h3>
             <div className="flex-1 min-h-0 w-full">
                 <DashboardBenefitsChart />
             </div>
        </div>
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