export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import { StatsCard } from "@/components/admin/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Search, Check, FileText, Eye } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return <div>Please log in to access the admin dashboard.</div>
  }

  // Fetch statistics with error handling
  const fetchStats = async () => {
    try {
      const [
        articlesResult,
        videosResult,
        booksResult,
        lecturesResult,
        usersResult,
        chatRoomsResult,
      ] = await Promise.all([
        supabase.from("articles").select("*", { count: "exact", head: true }),
        supabase.from("videos").select("*", { count: "exact", head: true }),
        supabase.from("books").select("*", { count: "exact", head: true }),
        supabase.from("lectures").select("*", { count: "exact", head: true }),
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("chat_messages").select("*", { count: "exact", head: true }),
      ])

      return {
        articlesCount: articlesResult.count || 0,
        videosCount: videosResult.count || 0,
        booksCount: booksResult.count || 0,
        lecturesCount: lecturesResult.count || 0,
        usersCount: usersResult.count || 0,
        chatRoomsCount: chatRoomsResult.count || 0,
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      return {
        articlesCount: 0,
        videosCount: 0,
        booksCount: 0,
        lecturesCount: 0,
        usersCount: 0,
        chatRoomsCount: 0,
      }
    }
  }

  // Fetch recent data
  const fetchRecentData = async () => {
    try {
      const [articlesResult, usersResult] = await Promise.all([
        supabase
          .from("articles")
          .select("id, title, created_at, author_name")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("users")
          .select("id, full_name, created_at, role")
          .order("created_at", { ascending: false })
          .limit(5)
      ])

      return {
        recentArticles: articlesResult.data || [],
        recentUsers: usersResult.data || []
      }
    } catch (error) {
      console.error('Error fetching recent data:', error)
      return {
        recentArticles: [],
        recentUsers: []
      }
    }
  }

  const stats = await fetchStats()
  const { recentArticles, recentUsers } = await fetchRecentData()
  
  const { articlesCount, videosCount, booksCount, lecturesCount, usersCount, chatRoomsCount } = stats
  const totalViews = 12450 // This would need to be calculated from actual view data

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100 dark:from-emerald-950 dark:via-amber-950 dark:to-emerald-900">
      <div className="space-y-6 p-6">

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Articles"
          value={stats.articlesCount.toString()}
          description="Published Articles"
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
          gradient="from-emerald-600 to-emerald-700"
        />
        <StatsCard
          title="Total Videos"
          value={stats.videosCount.toString()}
          description="Video Lectures"
          icon={Eye}
          trend={{ value: 8, isPositive: true }}
          gradient="from-amber-600 to-amber-700"
        />
        <StatsCard
          title="Total Users"
          value={stats.usersCount.toString()}
          description="Registered Users"
          icon={Users}
          trend={{ value: 15, isPositive: true }}
          gradient="from-teal-600 to-teal-700"
        />
        <StatsCard
          title="Total Views"
          value={(stats.articlesCount + stats.videosCount * 10).toString()}
          description="Content Views"
          icon={TrendingUp}
          trend={{ value: 23, isPositive: true }}
          gradient="from-emerald-700 to-teal-700"
        />
      </div>



        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Analytics */}
          <Card className="border border-emerald-200 dark:border-emerald-700 bg-white/80 dark:bg-emerald-900/30 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                Content Analytics
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-emerald-50 to-amber-50 dark:from-emerald-900/50 dark:to-amber-900/50 rounded-lg flex items-center justify-center border border-emerald-200/50 dark:border-emerald-700/50">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <p className="text-emerald-700 dark:text-emerald-300">Content performance analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Engagement */}
          <Card className="border border-emerald-200 dark:border-emerald-700 bg-white/80 dark:bg-emerald-900/30 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                User Engagement
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/50 dark:to-emerald-900/50 rounded-lg flex items-center justify-center border border-teal-200/50 dark:border-teal-700/50">
                <div className="text-center">
                  <Users className="h-12 w-12 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
                  <p className="text-teal-700 dark:text-teal-300">User activity and engagement metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  )
}
