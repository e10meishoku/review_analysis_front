//components/login-form.tsx
"use client" // ★クライアント側の機能（入力やクリック）を使うために必須です

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// ★前回の手順で lib/supabase/client.ts を作成している前提のインポートです
import { createClient } from "@/lib/supabase/client"
// ★追加: 統一感のあるモーダルをインポート
import { FeatureComingSoonDialog } from "@/components/feature-coming-soon-dialog"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  // ★入力値や状態を管理するための変数
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // ★追加: モーダルの開閉状態を管理
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  // ★ログインボタンを押したときの処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // フォームのデフォルト送信（リロード）を防ぐ
    setIsLoading(true)
    setError(null)

    try {
      // Supabaseにメールとパスワードを送って認証
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        // ログイン失敗時
        setError(authError.message)
        setIsLoading(false)
        return
      }

      // ログイン成功時
      router.push("/dashboard") // ダッシュボードへ移動
      router.refresh() // 画面のデータを最新にする

    } catch (err) {
      setError("予期せぬエラーが発生しました")
      setIsLoading(false)
    }
  }

  // ★修正: Googleログインボタン処理をアラートからモーダル表示に変更
  const handleGoogleLogin = () => {
    // alert("Google Login is coming soon in Phase 2!") // ←削除
    setIsModalOpen(true) // ←モーダルを開く
  }

  return (
    // ★ダイアログを配置するためにFragment (<>...</>) で全体を囲みます
    <>
      <form 
        className={cn("flex flex-col gap-6", className)} 
        onSubmit={handleSubmit} 
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        {/* ★エラーメッセージがあれば表示するエリアを追加 */}
        {error && (
          <div className="p-3 text-sm font-medium text-red-500 bg-red-50 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
              // ★入力値をReactの状態変数と紐付け
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading} // ロード中は入力不可に
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              // ★入力値をReactの状態変数と紐付け
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          {/* ★ローディング中はボタンを押せないようにし、テキストを変える */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          
          {/* Googleボタンにクリックイベントを追加 */}
          <Button 
            variant="outline" 
            className="w-full" 
            type="button" 
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.3-.4-3.5Z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.4 35.1 26.8 36 24 36c-5.3 0-9.8-3.4-11.4-8.1l-6.6 5.1C9.3 39.7 16.1 44 24 44Z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4-4.3 5.3l6.3 5.2C40.4 35.7 44 30.4 44 24c0-1.1-.1-2.3-.4-3.5Z"/>
            </svg>
            Login with Google
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>

      {/* ★追加: Coming Soon モーダルをここに配置 */}
      <FeatureComingSoonDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        featureName="Google Login"
      />
    </>
  )
}