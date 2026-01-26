// review_analysis_front/lib/api-client.ts

import { KpiMetrics } from "@/components/dashboard/kpi-section"
import { MOCK_DASHBOARD_DATA } from "./mock-data"

export interface DashboardFilter {
  manufacturer_name?: string
  product_name?: string
  start_date?: string
  end_date?: string
}

export interface FilterOptions {
  manufacturers: string[]
  products: string[]
}

export interface ChartItem {
  label: string
  count: number
  fill?: string
}

export interface TrendItem {
  date: string
  review_count: number
  average_rating: number
}

// ▼▼▼ 追加: benefits と issues を定義 ▼▼▼
export interface DashboardResponse {
  kpi: KpiMetrics
  distributions: {
    skin: ChartItem[]
    rating: ChartItem[]
    age: ChartItem[]
  }
  radar: ChartItem[]
  product_type: ChartItem[]
  repurchase: ChartItem[]
  age_rating: ChartItem[]
  trend: TrendItem[]
  benefits: ChartItem[]
  issues: ChartItem[]
}

// 日付フォーマットヘルパー
function formatDateStr(dateStr?: string): string | undefined {
  if (!dateStr) return undefined
  return dateStr.replace(/\//g, "-")
}

export async function fetchFilterOptions(manufacturer_name?: string): Promise<FilterOptions> {
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

export async function fetchKpiData(filter?: DashboardFilter): Promise<DashboardResponse | null> {
    
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
        console.log("🛠️ Mock Mode: Returning dummy data", filter)
        await new Promise((resolve) => setTimeout(resolve, 500))
        return MOCK_DASHBOARD_DATA
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
        
        const formattedStart = formatDateStr(filter?.start_date)
        const formattedEnd = formatDateStr(filter?.end_date)
        
        if (formattedStart) params.append("start_date", formattedStart)
        if (formattedEnd) params.append("end_date", formattedEnd)

        const queryString = params.toString()
        const endpoint = `${apiUrl}/api/dashboard/kpi${queryString ? `?${queryString}` : ""}`
        
        console.log(`Fetching Dashboard data from: ${endpoint}`)

        const res = await fetch(endpoint, { cache: "no-store" })

        if (!res.ok) {
            const errorText = await res.text()
            console.error("API Error details:", errorText)
            return null
        }
        return res.json()
    } catch (error) {
        console.error("Fetch Error:", error)
        return null
    }
}