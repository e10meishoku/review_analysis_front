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
  }
}