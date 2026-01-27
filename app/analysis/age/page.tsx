// app/dashboard/analysis/age/page.tsx
import { DashboardRadarChart } from "@/components/dashboard/radar-chart"
// 他のチャートコンポーネントも必要に応じてインポートしてください

export default function AgeAnalysisPage() {
  const segments = ["20代以下", "30代", "40代", "50代以上"]

  return (
    <div className="flex flex-col gap-8 pb-8 px-6 pt-6">
      
      {/* ページヘッダー */}
      <div>
        <h2 className="text-2xl font-bold mb-2">年代別セグメント分析</h2>
        <p className="text-muted-foreground text-sm">
          若年層の「香り」評価が高い一方、40代以上では「保湿効果」への懸念が見られます。
        </p>
      </div>

      {/* 
        横スクロール可能なコンテナ
        スマホではスクロール、PCではグリッド表示
      */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[1000px] grid grid-cols-4 gap-4">
          
          {/* ヘッダー行: セグメント名 */}
          {segments.map((seg) => (
            <div key={seg} className="bg-[#121212] text-white rounded-t-xl p-3 text-center font-bold">
              {seg}
            </div>
          ))}

          {/* 1行目: レーダーチャート (AIスコア) */}
          {segments.map((seg, i) => (
            <div key={`radar-${i}`} className="bg-white p-4 h-[250px] border-x border-b border-gray-100 first:rounded-bl-none last:rounded-br-none">
              <p className="text-xs text-center text-gray-400 mb-2 font-bold">AI評価スコア</p>
              
              {/* 
                 ▼ 修正ポイント: 
                 data={[]} を明示的に渡して型エラーを回避。
                 コンポーネント側で「No Data」表示になります。
              */}
              <DashboardRadarChart data={[]} /> 
            </div>
          ))}

          {/* 2行目: ポジティブワード (Benefits) */}
          {segments.map((seg, i) => (
            <div key={`pos-${i}`} className="bg-[#F4F9C3] p-4 min-h-[200px] rounded-sm">
               <p className="text-xs text-center text-[#121212] mb-3 font-bold uppercase">Top Benefits</p>
               <ul className="space-y-2 text-sm font-bold text-[#121212]">
                 <li className="flex justify-between border-b border-black/10 pb-1"><span>香り</span> <span>45%</span></li>
                 <li className="flex justify-between border-b border-black/10 pb-1"><span>パッケージ</span> <span>30%</span></li>
                 <li className="flex justify-between border-b border-black/10 pb-1"><span>コスパ</span> <span>15%</span></li>
               </ul>
            </div>
          ))}

          {/* 3行目: ネガティブワード (Issues) */}
          {segments.map((seg, i) => (
             <div key={`neg-${i}`} className="bg-white border border-gray-200 p-4 min-h-[200px] rounded-b-xl">
               <p className="text-xs text-center text-red-500 mb-3 font-bold uppercase">Top Concerns</p>
               <ul className="space-y-2 text-sm font-medium text-gray-600">
                 <li className="flex justify-between border-b border-gray-100 pb-1"><span>ピリピリ感</span> <span>12%</span></li>
                 <li className="flex justify-between border-b border-gray-100 pb-1"><span>液だれ</span> <span>8%</span></li>
               </ul>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}