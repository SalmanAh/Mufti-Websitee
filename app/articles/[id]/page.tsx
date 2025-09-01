export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { ContentViewer } from "@/components/content-viewer"
// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
// import { notFound } from "next/navigation"

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params
  // COMMENTED OUT: Server-side data fetching and view count increment
  // const supabase = await createClient()

  // const { data: article } = await supabase
  //   .from("articles")
  //   .select(`
  //     *,
  //     author:profiles(full_name),
  //     category:categories(name)
  //   `)
  //   .eq("id", id)
  //   .eq("published", true)
  //   .single()

  // if (!article) {
  //   notFound()
  // }

  // // Increment view count
  // await supabase
  //   .from("articles")
  //   .update({ views: article.views + 1 })
  //   .eq("id", id)

  // Temporary placeholder data for development
  const article = {
    id: id,
    title: "Understanding the Concept of Tawheed in Modern Context",
    content: "An in-depth exploration of monotheism and its relevance in contemporary Islamic thought and practice.",
    author: { full_name: "Dr. Ahmad Hassan" },
    category: { name: "Theology" },
    views: 2847,
    created_at: "2024-01-15T00:00:00Z",
    featured_image: "/islamic-calligraphy-and-geometric-patterns.png"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ContentViewer content={article} type="article" />
      </main>
    </div>
  )
}
