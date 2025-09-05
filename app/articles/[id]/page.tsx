export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { ContentViewer } from "@/components/content-viewer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, User } from "lucide-react"
import Link from "next/link"

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from("articles")
    .select(`
      *,
      users!articles_author_id_fkey(full_name),
      categories(name)
    `)
    .eq("id", id)
    .eq("published", true)
    .single()

  if (!article) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("articles")
    .update({ views: (article.views || 0) + 1 })
    .eq("id", id)

  // Format the article data for ContentViewer
  const formattedArticle = {
    ...article,
    author: { full_name: article.users?.full_name || 'Islamic Scholar' },
    category: { name: article.categories?.name || 'Article' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-700 via-teal-800 to-green-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/islamic-calligraphy-and-geometric-patterns.png')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-900/70 to-green-900/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/articles" className="inline-flex items-center text-emerald-200 hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Articles
              </Link>
            </div>
            
            {/* Article Meta */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {formattedArticle.category.name}
                </Badge>
                <div className="flex items-center text-emerald-200">
                  <Eye className="h-4 w-4 mr-1" />
                  {formattedArticle.views.toLocaleString()} views
                </div>
                <div className="text-emerald-200">
                  {new Date(formattedArticle.created_at).toLocaleDateString()}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent drop-shadow-lg leading-tight">
                {formattedArticle.title}
              </h1>
              
              <div className="flex items-center text-emerald-100">
                <User className="h-4 w-4 mr-2" />
                <span>By {formattedArticle.author.full_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <ContentViewer content={formattedArticle} type="article" />
      </main>
    </div>
  )
}
