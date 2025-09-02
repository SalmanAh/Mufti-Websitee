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
}

export function StatsCard({ title, value, description, icon: Icon, trend, gradient = "from-blue-500 to-blue-600" }: StatsCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
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
          {trend && (
            <div className="flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-300" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-300" />
              )}
              <p className={`text-sm font-medium ${
                trend.isPositive ? "text-green-300" : "text-red-300"
              }`}>
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </p>
              <span className="text-white/70 text-sm ml-1">vs last month</span>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
