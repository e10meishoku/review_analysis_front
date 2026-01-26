// review_analysis_front/lib/mock-data.ts

import { DashboardResponse } from "./api-client"

// APIがまだない時や、開発中に使うダミーデータです
// DashboardResponse型に合わせて構造を変更しました
export const MOCK_DASHBOARD_DATA: DashboardResponse = {
  kpi: {
    review_count: 3240,
    review_count_trend: 20,
    average_rating: 5.55,
    average_rating_trend: 10,
    average_age: 35.8,
    average_age_trend: 40,
  },
  distributions: {
    skin: [
        { label: "乾燥肌", count: 450 },
        { label: "混合肌", count: 300 },
        { label: "普通肌", count: 150 },
        { label: "脂性肌", count: 100 },
    ],
    rating: [
        { label: "★7", count: 320 },
        { label: "★6", count: 450 },
        { label: "★5", count: 210 },
        { label: "★4", count: 150 },
        { label: "★3", count: 80 },
        { label: "★2", count: 20 },
        { label: "★1", count: 10 },
    ],
    age: [
        { label: "20代以下", count: 850 },
        { label: "30代", count: 1240 },
        { label: "40代", count: 650 },
        { label: "50代", count: 350 },
        { label: "60代以上", count: 150 },
    ]
  },
  // ▼▼▼ 追加: Step 3用のダミーデータ ▼▼▼
  radar: [
    { label: "効果実感", count: 80 }, 
    { label: "パッケージ", count: 65 },
    { label: "使用感", count: 70 }, 
    { label: "再購入", count: 85 },
    { label: "香り", count: 60 }, 
    { label: "コスパ", count: 50 },
  ],
  product_type: [
    { label: "購入品", count: 65 }, 
    { label: "リピート", count: 25 }, 
    { label: "モニター", count: 10 }
  ],
  repurchase: [
    { label: "リピートしたい", count: 75 }, 
    { label: "分からない", count: 15 }, 
    { label: "しない", count: 10 }
  ]
}