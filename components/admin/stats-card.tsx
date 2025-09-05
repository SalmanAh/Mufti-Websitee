import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  gradient?: string
  views?: number
}

export function StatsCard({ title, value, description, icon: Icon, trend, gradient = "from-blue-500 to-blue-600", views }: StatsCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105 bg-white">
      <div className={`bg-gradient-to-br ${gradient} p-6 text-white relative`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-4 relative z-10">
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          {description && <p className="text-sm text-white/80 mb-2">{description}</p>}
          {views !== undefined && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-white/80 text-sm">Views: {views.toLocaleString()}</span>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
