// review_analysis_front/app/dashboard/page.tsx

// 作成したAPIクライアント関数をインポート
import { fetchKpiData } from "@/lib/api-client"

// 各種チャートコンポーネントのインポート
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

// ■ 追加: Next.js 15では URLパラメータ(searchParams) は Promise型として受け取ります
interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// ■ 変更: 引数に props を追加
export default async function DashboardPage({ searchParams }: DashboardPageProps) {

  // ■ 追加: URLパラメータが解決されるのを待ちます
  const params = await searchParams

  // ■ 追加: APIに渡すためのフィルター条件を作ります
  // URLに ?manufacturer=XXX とあれば、それを取得します
  const filter = {
    manufacturer_name: typeof params.manufacturer === 'string' ? params.manufacturer : undefined,
    product_name: typeof params.product === 'string' ? params.product : undefined,
  }

  // ■ 変更: fetchKpiData は DashboardResponse 型を返すようになりました
  const dashboardData = await fetchKpiData(filter)
  
  // KPIデータとグラフデータを安全に取り出します
  const kpiData = dashboardData?.kpi
  const distData = dashboardData?.distributions
  
  // ▼▼▼ 追加: Step 3で追加したデータを取得 ▼▼▼
  const radarData = dashboardData?.radar || []
  const productTypeData = dashboardData?.product_type || []
  const repurchaseData = dashboardData?.repurchase || []

  // レイアウト用の高さ設定
  const rowHeight = "xl:h-[320px]"

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1620px] mx-auto pb-8 px-6 pt-6">
      
      {/* 
         1行目: KPI (2/3) : Buyer Satisfaction (1/3) 
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        <div className="xl:col-span-2 h-full min-h-[300px] bg-white rounded-[2rem] p-6 shadow-sm flex flex-col overflow-hidden">
            {/* 
                取得したデータを渡します。
                もしデータ取得失敗(null)の場合は undefined を渡し、
                KpiSection側で「-」が表示されるようにします。
            */}
            <KpiSection data={kpiData || undefined} />
        </div>
        <div className="xl:col-span-1 h-full min-h-[300px]">
             <div className="bg-primary rounded-[2rem] p-6 shadow-sm h-full flex flex-col relative overflow-hidden">
                 <h3 className="font-bold text-sm mb-4">年代別平均評価</h3>
                 <div className="flex-1 min-h-0 w-full">
                    {/* ※ここはまだダミーのままです */}
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
                {/* ▼ データを渡す */}
                <DashboardAgeDistribution data={distData?.age || []} />
            </div>
        </div>

        {/* 評価分布 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-sm text-center mb-2">評価点数分布</h3>
            <div className="flex-1 w-full min-h-0">
                {/* ▼ データを渡す */}
                <DashboardRatingDistribution data={distData?.rating || []} />
            </div>
        </div>

        {/* 肌質分布 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="font-bold text-sm text-center mb-2">肌質構成比</h3>
            <div className="flex-1 w-full min-h-0">
                {/* ▼ データを渡す */}
                <DashboardSkinDistribution data={distData?.skin || []} />
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
         4行目: 3つの分析チャート (Step 3で連動開始)
      */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        
        {/* 左: AI分類スコア */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">AI分類スコア</h3>
             <div className="flex-1 w-full min-h-0">
                 {/* ▼ データを渡す */}
                 <DashboardRadarChart data={radarData} />
             </div>
        </div>

        {/* 中: 商品タイプ */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">商品タイプ構成</h3>
             <div className="flex-1 w-full min-h-0">
                 {/* ▼ データを渡す */}
                 <DashboardProductTypeChart data={productTypeData} />
             </div>
        </div>

        {/* 右: リピート意欲 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col relative overflow-hidden">
             <h3 className="font-bold text-sm text-center mb-4">リピート意欲</h3>
             <div className="flex-1 w-full min-h-0">
                 {/* ▼ データを渡す */}
                 <DashboardDonutChart data={repurchaseData} />
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