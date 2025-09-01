export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { ContentViewer } from "@/components/content-viewer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

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
      author:profiles(full_name),
      category:categories(name)
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
    .update({ views: article.views + 1 })
    .eq("id", id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ContentViewer content={article} type="article" />
      </main>
    </div>
  )
}
