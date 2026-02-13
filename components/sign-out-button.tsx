//components/sign-out-button.tsx"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react" // アイコン

export function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    // 1. Supabaseにログアウトを通知（サーバー側のセッション無効化）
    await supabase.auth.signOut()
    
    // 2. ブラウザの金庫（localStorage）を空にして、ログイン画面へ飛ばす
    router.push("/login")
    router.refresh()
  }

  return (
    <Button 
      variant="ghost" 
      onClick={handleSignOut} 
      className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
    >
      <LogOut className="h-4 w-4" />
      ログアウト
    </Button>
  )
}