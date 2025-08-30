import { createClient } from "@/lib/supabase/server"
import { StatsCard } from "@/components/admin/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Video, BookOpen, Mic, Users, Eye, TrendingUp, MessageCircle } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch statistics
  const [
    { count: articlesCount },
    { count: videosCount },
    { count: booksCount },
    { count: lecturesCount },
    { count: usersCount },
    { count: chatRoomsCount },
  ] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("videos").select("*", { count: "exact", head: true }),
    supabase.from("books").select("*", { count: "exact", head: true }),
    supabase.from("lectures").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("chat_rooms").select("*", { count: "exact", head: true }),
  ])

  // Fetch total views
  const { data: articlesViews } = await supabase.from("articles").select("views")
  const { data: videosViews } = await supabase.from("videos").select("views")
  const { data: lecturesViews } = await supabase.from("lectures").select("views")

  const totalViews =
    (articlesViews?.reduce((sum, item) => sum + (item.views || 0), 0) || 0) +
    (videosViews?.reduce((sum, item) => sum + (item.views || 0), 0) || 0) +
    (lecturesViews?.reduce((sum, item) => sum + (item.views || 0), 0) || 0)

  // Fetch recent content
  const { data: recentArticles } = await supabase
    .from("articles")
    .select("id, title, created_at, author:profiles(full_name)")
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("id, full_name, created_at, role")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Islamic Scholar Platform admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Articles"
          value={articlesCount || 0}
          description="Published and draft articles"
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Videos"
          value={videosCount || 0}
          description="Video content library"
          icon={Video}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Books"
          value={booksCount || 0}
          description="Digital book collection"
          icon={BookOpen}
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Total Lectures"
          value={lecturesCount || 0}
          description="Audio lecture library"
          icon={Mic}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Total Users"
          value={usersCount || 0}
          description="Registered platform users"
          icon={Users}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Total Views"
          value={totalViews.toLocaleString()}
          description="Content engagement"
          icon={Eye}
          trend={{ value: 18, isPositive: true }}
        />
        <StatsCard
          title="Chat Rooms"
          value={chatRoomsCount || 0}
          description="Active discussion rooms"
          icon={MessageCircle}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Growth Rate"
          value="23%"
          description="Monthly user growth"
          icon={TrendingUp}
          trend={{ value: 4, isPositive: true }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentArticles?.map((article) => (
                <div key={article.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium line-clamp-1">{article.title}</p>
                    <p className="text-sm text-muted-foreground">By {article.author?.full_name}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(article.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers?.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      {user.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
