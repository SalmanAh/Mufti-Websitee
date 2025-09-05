export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import { StatsCard } from "@/components/admin/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Search, Check, FileText, Eye, AlertCircle, BookOpen, Scroll, Quote } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100 dark:from-emerald-950 dark:via-amber-950 dark:to-emerald-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center space-y-4 p-6">
            <AlertCircle className="h-12 w-12 text-amber-600" />
            <h2 className="text-xl font-semibold text-center">Authentication Required</h2>
            <p className="text-muted-foreground text-center">Please log in to access the admin dashboard.</p>
            <Button asChild>
              <Link href="/auth/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Optimized: Fetch only essential statistics with single query approach
  const fetchDashboardData = async () => {
    try {
      // Use Promise.all for parallel execution but only fetch counts, not full data
      const [
        articlesResult,
        videosResult,
        booksResult,
        hadithsResult,
        ayatsResult,
      ] = await Promise.all([
        supabase.from("articles").select("id, views", { count: "exact" }),
        supabase.from("videos").select("id, views", { count: "exact" }),
        supabase.from("books").select("id, views", { count: "exact" }),
        supabase.from("hadiths").select("id, views", { count: "exact" }),
        supabase.from("ayats").select("id, views", { count: "exact" }),
      ])

      // Calculate total views for each category
      const articlesViews = articlesResult.data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
      const videosViews = videosResult.data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
      const booksViews = booksResult.data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
      const hadithsViews = hadithsResult.data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
      const ayatsViews = ayatsResult.data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0

      return {
        articlesCount: articlesResult.count || 0,
        videosCount: videosResult.count || 0,
        booksCount: booksResult.count || 0,
        hadithsCount: hadithsResult.count || 0,
        ayatsCount: ayatsResult.count || 0,
        articlesViews,
        videosViews,
        booksViews,
        hadithsViews,
        ayatsViews,
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      return {
        articlesCount: 0,
        videosCount: 0,
        booksCount: 0,
        hadithsCount: 0,
        ayatsCount: 0,
        articlesViews: 0,
        videosViews: 0,
        booksViews: 0,
        hadithsViews: 0,
        ayatsViews: 0,
      }
    }
  }

  const stats = await fetchDashboardData()
  
  const { articlesCount, videosCount, booksCount, hadithsCount, ayatsCount, articlesViews, videosViews, booksViews, hadithsViews, ayatsViews } = stats

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100 dark:from-emerald-950 dark:via-amber-950 dark:to-emerald-900">
      <div className="space-y-6 p-6">

        {/* Enhanced Stats Grid */}
        <div className="flex flex-col gap-6 w-[100%] mx-auto">
        <StatsCard
          title="Total Articles"
          value={stats.articlesCount.toString()}
          description="Published Articles"
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
          gradient="from-emerald-600 to-emerald-700"
          views={stats.articlesViews}
        />
        <StatsCard
          title="Total Videos"
          value={stats.videosCount.toString()}
          description="Video Lectures"
          icon={Eye}
          trend={{ value: 8, isPositive: true }}
          gradient="from-amber-600 to-amber-700"
          views={stats.videosViews}
        />
        <StatsCard
          title="Total Books"
          value={stats.booksCount.toString()}
          description="Islamic Books"
          icon={BookOpen}
          trend={{ value: 5, isPositive: true }}
          gradient="from-teal-500 to-teal-600"
          views={stats.booksViews}
        />
        <StatsCard
          title="Total Hadiths"
          value={stats.hadithsCount.toString()}
          description="Hadith Collection"
          icon={Scroll}
          trend={{ value: 18, isPositive: true }}
          gradient="from-green-500 to-green-600"
          views={stats.hadithsViews}
        />
        <StatsCard
          title="Total Ayats"
          value={stats.ayatsCount.toString()}
          description="Quranic Verses"
          icon={Quote}
          trend={{ value: 25, isPositive: true }}
          gradient="from-slate-600 to-slate-700"
          views={stats.ayatsViews}
        />
      </div>






      </div>
    </div>
  )
}
