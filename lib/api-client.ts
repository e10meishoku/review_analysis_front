// review_analysis_front/lib/api-client.ts

import { KpiMetrics } from "@/components/dashboard/kpi-section"
import { MOCK_DASHBOARD_DATA } from "./mock-data" // MOCK定数名を変更しています(後述)

export interface DashboardFilter {
  manufacturer_name?: string
  product_name?: string
  start_date?: string
  end_date?: string
}

// ▼▼▼ 追加: 選択肢データの型定義 ▼▼▼
export interface FilterOptions {
  manufacturers: string[]
  products: string[]
}

// ▼▼▼ 追加: グラフデータの型定義 ▼▼▼
export interface ChartItem {
  label: string
  count: number
  fill?: string // 色指定用
}

// ▼▼▼ 追加: ダッシュボード全体のレスポンス型 ▼▼▼
export interface DashboardResponse {
  kpi: KpiMetrics
  distributions: {
    skin: ChartItem[]
    rating: ChartItem[]
    age: ChartItem[]
  }
}

// ▼▼▼ 追加: 選択肢リストを取得する関数 ▼▼▼
export async function fetchFilterOptions(manufacturer_name?: string): Promise<FilterOptions> {
  // モックモードなら適当なダミーデータを返す
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return {
      manufacturers: ["明色化粧品", "競合A社", "競合B社"],
      products: manufacturer_name === "明色化粧品" 
        ? ["美顔水", "モイストラボ"] 
        : ["全商品", "商品A", "商品B"]
    }
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) return { manufacturers: [], products: [] }

    const params = new URLSearchParams()
    if (manufacturer_name && manufacturer_name !== "all") {
      params.append("manufacturer_name", manufacturer_name)
    }

    const res = await fetch(`${apiUrl}/api/dashboard/options?${params.toString()}`, {
      cache: "no-store" 
    })
    
    if (!res.ok) return { manufacturers: [], products: [] }
    return res.json()
  } catch (error) {
    console.error("Fetch Options Error:", error)
    return { manufacturers: [], products: [] }
  }
}

// ▼ 変更: 戻り値を DashboardResponse に変更
export async function fetchKpiData(filter?: DashboardFilter): Promise<DashboardResponse | null> {
    
    // モックモード
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        console.log("🛠️ Mock Mode: Returning dummy data (Filter ignored in mock)", filter)
        await new Promise((resolve) => setTimeout(resolve, 500))
        return MOCK_DASHBOARD_DATA // 型エラー防止のため、mock-data.ts も後で更新してください
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
            console.error("API URL is not defined in .env.local")
            return null
        }

        const params = new URLSearchParams()
        if (filter?.manufacturer_name) {
            params.append("manufacturer_name", filter.manufacturer_name)
        }
        if (filter?.product_name) {
            params.append("product_name", filter.product_name)
        }

        const queryString = params.toString()
        const endpoint = `${apiUrl}/api/dashboard/kpi${queryString ? `?${queryString}` : ""}`
        
        console.log(`Fetching Dashboard data from: ${endpoint}`)

        const res = await fetch(endpoint, { cache: "no-store" })

        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText}`)
            return null
        }
        return res.json()
    } catch (error) {
        console.error("Fetch Error:", error)
        return null
    }
}