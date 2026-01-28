// components/dashboard/dashboard-loader.tsx
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardLoader() {
  const rowHeight = "xl:h-[320px]"

  // ■ 共通パーツ: ご提示のコードのような「アイコン+テキスト」を再現したコンポーネント
  const LoadingState = ({ variant = "default" }: { variant?: "default" | "primary" }) => {
    if (variant === "primary") {
      // ライム色背景用: 黒っぽくしてコントラストを確保
      return (
        <div className="flex flex-col items-center gap-2 animate-pulse">
           {/* スピナーを少しリッチな枠で囲む */}
           <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center backdrop-blur-sm">
              <Spinner className="h-6 w-6 text-[#121212]" />
           </div>
           <p className="text-[10px] font-bold text-[#121212]/60 uppercase tracking-wider">
             Loading
           </p>
        </div>
      )
    }

    // 白背景用: Itemコンポーネント風の横長カプセルデザイン
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/80 border border-gray-100 rounded-xl shadow-sm">
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white border border-gray-100 shadow-sm">
          <Spinner className="h-4 w-4 text-primary" />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="h-2 w-16 bg-gray-200 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-gray-400">Loading data...</span>
        </div>
      </div>
    )
  }

  // 白背景のカード用ローダー
  const LoadingCard = ({ className = "" }: { className?: string }) => (
    <Card className={`rounded-[2rem] p-6 shadow-sm flex flex-col items-center justify-center h-full min-h-[300px] border-none relative overflow-hidden bg-white ${className}`}>
      {/* 背景: ほんのりスケルトンで「枠」を感じさせる */}
      <div className="absolute inset-x-6 top-16 bottom-6 space-y-4 opacity-30">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
      
      {/* 前面: ローディング表示 */}
      <div className="z-10 relative">
        <LoadingState variant="default" />
      </div>
    </Card>
  )

  // Primary(ライム色)背景のカード用ローダー
  const LoadingPrimaryCard = () => (
    <Card className="bg-primary rounded-[2rem] p-6 shadow-sm flex flex-col items-center justify-center h-full min-h-[300px] border-none relative overflow-hidden">
       {/* 幾何学模様っぽい背景装飾（あしらい） */}
       <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
       <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
       
       <div className="z-10 relative">
         <LoadingState variant="primary" />
       </div>
    </Card>
  )

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1620px] mx-auto pb-8 px-6 pt-6 animate-in fade-in duration-500">
      
      {/* 1行目: KPI & 年代別チャート */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        {/* KPIエリア (2/3) */}
        <div className="xl:col-span-2 h-full min-h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-none shadow-xl rounded-[1.5rem] flex flex-col h-full overflow-hidden relative bg-white items-center justify-center">
                 <LoadingState variant="default" />
              </Card>
            ))}
          </div>
        </div>
        
        {/* 年代別チャート (1/3) -> Primary背景 */}
        <div className="xl:col-span-1 h-full min-h-[300px]">
             <LoadingPrimaryCard />
        </div>
      </div>

      {/* 2行目 */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>

      {/* 3行目 */}
      <div className={`w-full ${rowHeight}`}>
         <LoadingCard />
      </div>

      {/* 4行目 */}
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 ${rowHeight}`}>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>

      {/* 5行目 */}
      <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 ${rowHeight}`}>
        <LoadingPrimaryCard />
        <LoadingPrimaryCard />
      </div>

    </div>
  )
}