// app/not-found.tsx
import { StatusScreen } from "@/components/status-screen"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F4F8FB]">
      <StatusScreen 
        title="Coming Soon or 404"
        description="このページは現在開発中か、もしくは存在しないURLです。左のメニューから他のページをご覧ください。"
        // 重要: ここを {FileQuestion} ではなく {<FileQuestion />} にします
        icon={<FileQuestion />}
      />
    </div>
  )
}