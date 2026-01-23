// review_analysis_front/lib/mock-data.ts

import { KpiMetrics } from "@/components/dashboard/kpi-section"

// APIがまだない時や、開発中に使うダミーデータです
export const MOCK_KPI_DATA: KpiMetrics = {
  review_count: 3240,
  review_count_trend: 20,
  average_rating: 5.55,
  average_rating_trend: 10,
  average_age: 35.8,
  average_age_trend: 40,
}