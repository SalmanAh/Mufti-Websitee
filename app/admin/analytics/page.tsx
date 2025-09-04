export const dynamic = 'force-dynamic'

// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
import { StatsCard } from "@/components/admin/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Video, Mic, Eye, Download, Users, TrendingUp } from "lucide-react"

export default async function AdminAnalyticsPage() {
  // COMMENTED OUT: Server-side authentication and data fetching
  // const supabase = await createClient()

  // // Fetch detailed analytics
  // const { data: articles } = await supabase.from("articles").select("views, created_at")
  // const { data: videos } = await supabase.from("videos").select("views, created_at")
  // const { data: books } = await supabase.from("books").select("downloads, created_at")
  // const { data: lectures } = await supabase.from("lectures").select("views, created_at")
  // const { data: users } = await supabase.from("profiles").select("created_at")

  // Temporary placeholder data for development
  const articles = [
    { views: 1250, created_at: '2024-01-15' },
    { views: 980, created_at: '2024-01-20' },
    { views: 750, created_at: '2024-01-25' }
  ]
  const videos = [
    { views: 2100, created_at: '2024-01-10' },
    { views: 1800, created_at: '2024-01-18' }
  ]
  const books = [
    { downloads: 450, created_at: '2024-01-12' },
    { downloads: 320, created_at: '2024-01-22' }
  ]
  const lectures = [
    { views: 890, created_at: '2024-01-14' },
    { views: 670, created_at: '2024-01-24' }
  ]
  const users = [
    { created_at: '2024-01-01' },
    { created_at: '2024-01-15' },
    { created_at: '2024-01-20' }
  ]

  // Calculate totals
  const totalArticleViews = articles?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
  const totalVideoViews = videos?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
  const totalLectureViews = lectures?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
  const totalBookDownloads = books?.reduce((sum, item) => sum + (item.downloads || 0), 0) || 0

  // Calculate monthly growth
  const currentMonth = new Date()
  const lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)

  const thisMonthUsers = users?.filter((user) => new Date(user.created_at) >= lastMonth).length || 0
  const lastMonthUsers =
    users?.filter((user) => {
      const userDate = new Date(user.created_at)
      const twoMonthsAgo = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 2)
      return userDate >= twoMonthsAgo && userDate < lastMonth
    }).length || 0

  const userGrowthRate = lastMonthUsers > 0 ? ((thisMonthUsers - lastMonthUsers) / lastMonthUsers) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Detailed insights into platform performance and user engagement</p>
      </div>

      {/* Content Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Article Views"
          value={totalArticleViews.toLocaleString()}
          description="Total article engagement"
          icon={FileText}
          trend={{ value: 15, isPositive: true }}
          gradient="from-emerald-600 to-emerald-700"
        />
        <StatsCard
          title="Video Views"
          value={totalVideoViews.toLocaleString()}
          description="Total video engagement"
          icon={Video}
          trend={{ value: 22, isPositive: true }}
          gradient="from-amber-600 to-amber-700"
        />
        <StatsCard
          title="Lecture Listens"
          value={totalLectureViews.toLocaleString()}
          description="Total lecture engagement"
          icon={Mic}
          trend={{ value: 18, isPositive: true }}
          gradient="from-emerald-700 to-emerald-800"
        />
        <StatsCard
          title="Book Downloads"
          value={totalBookDownloads.toLocaleString()}
          description="Total book downloads"
          icon={Download}
          trend={{ value: 8, isPositive: true }}
          gradient="from-amber-700 to-amber-800"
        />
      </div>

      {/* User Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Users"
          value={users?.length || 0}
          description="Registered platform users"
          icon={Users}
          trend={{ value: Math.round(userGrowthRate), isPositive: userGrowthRate > 0 }}
          gradient="from-emerald-600 to-emerald-700"
        />
        <StatsCard
          title="New Users (30d)"
          value={thisMonthUsers}
          description="Users joined this month"
          icon={TrendingUp}
          trend={{ value: 25, isPositive: true }}
          gradient="from-amber-600 to-amber-700"
        />
        <StatsCard
          title="Engagement Rate"
          value="78%"
          description="Average user engagement"
          icon={Eye}
          trend={{ value: 5, isPositive: true }}
          gradient="from-emerald-700 to-emerald-800"
        />
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles
                ?.sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, 5)
                .map((article, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-600/10 rounded-full flex items-center justify-center text-sm font-semibold text-emerald-700">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">Article {index + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{(article.views || 0).toLocaleString()} views</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videos
                ?.sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, 5)
                .map((video, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-600/10 rounded-full flex items-center justify-center text-sm font-semibold text-amber-700">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">Video {index + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(video.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{(video.views || 0).toLocaleString()} views</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
