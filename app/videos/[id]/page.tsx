export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { ContentViewer } from "@/components/content-viewer"
// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
// import { notFound } from "next/navigation"

interface VideoPageProps {
  params: Promise<{ id: string }>
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params
  // COMMENTED OUT: Server-side data fetching and view count increment
  // const supabase = await createClient()

  // const { data: video } = await supabase
  //   .from("videos")
  //   .select(`
  //     *,
  //     author:profiles(full_name),
  //     category:categories(name)
  //   `)
  //   .eq("id", id)
  //   .eq("published", true)
  //   .single()

  // if (!video) {
  //   notFound()
  // }

  // // Increment view count
  // await supabase
  //   .from("videos")
  //   .update({ views: video.views + 1 })
  //   .eq("id", id)

  // Temporary placeholder data for development
  const video = {
    id: id,
    title: "The Beautiful Names of Allah - Complete Series",
    description: "A comprehensive exploration of the 99 beautiful names of Allah and their meanings in our daily lives.",
    author: { full_name: "Sheikh Muhammad Al-Shareef" },
    category: { name: "Theology" },
    views: 45672,
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
    thumbnail_url: "/islamic-calligraphy-allah-names-golden.png",
    youtube_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: 9930
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ContentViewer content={video} type="video" />
      </main>
    </div>
  )
}
