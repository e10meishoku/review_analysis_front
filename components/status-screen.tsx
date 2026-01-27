"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

interface StatusScreenProps {
  title?: string
  description?: string
  // 重要: ElementType ではなく ReactNode (JSX要素) を受け取るように変更
  icon: React.ReactNode 
}

export function StatusScreen({ 
  title = "Page Not Found", 
  description = "お探しのページは見つかりませんでした。",
  icon 
}: StatusScreenProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in zoom-in duration-300">
      {/* 
         アイコンエリア 
         text-[#DFF347] を指定し、中身のSVGの色を制御します
      */}
      <div className="bg-white p-6 rounded-full shadow-sm mb-6 text-[#DFF347]">
        {/* アイコンサイズ調整用のラッパー */}
        <div className="[&>svg]:h-12 [&>svg]:w-12 [&>svg]:fill-black/5">
          {icon}
        </div>
      </div>

      {/* テキストエリア */}
      <h2 className="text-2xl font-bold text-[#121212] mb-3">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {/* アクションボタンエリア */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="flex-1 rounded-full font-bold border-gray-300 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <Button 
          onClick={() => router.push('/dashboard')}
          className="flex-1 rounded-full font-bold bg-[#121212] hover:bg-[#333] text-white"
        >
          <Home className="mr-2 h-4 w-4" />
          ホームへ
        </Button>
      </div>
    </div>
  )
}