// components/feature-coming-soon-dialog.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Rocket, Construction } from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
  featureName: string // どの機能をクリックしたか表示するため
}

export function FeatureComingSoonDialog({ isOpen, onClose, featureName }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* 
        sm:max-w-md: 幅を少し狭めて上品に
        [&>button]:close-button: 右上の×ボタンのスタイル調整
      */}
      <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl rounded-[2rem] p-0 overflow-hidden">
        
        {/* 上部: アイコンエリア (Primaryカラーで期待感を演出) */}
        <div className="bg-[#DFF347] p-8 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 bg-[#121212] rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
             {/* ロケットアイコンで「これから飛躍する」イメージ */}
             <Rocket className="h-8 w-8 text-[#DFF347] fill-[#DFF347]" />
          </div>
          <DialogTitle className="text-xl font-black text-[#121212] tracking-tight">
            Coming Soon!
          </DialogTitle>
        </div>

        {/* 下部: テキストエリア */}
        <div className="p-8 pt-6">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Construction className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Phase 2 Development
                </span>
            </div>
            <DialogDescription className="text-center text-gray-600 leading-relaxed">
              <span className="font-bold text-[#121212]">{featureName}</span> 機能は<br/>
              現在、鋭意開発中です。<br/>
              次期フェーズでのリリースをお待ちください。
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-center">
            <Button 
              type="button" 
              onClick={onClose}
              className="rounded-full px-8 font-bold bg-[#121212] text-white hover:bg-gray-800"
            >
              OK, 楽しみに待つ
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}