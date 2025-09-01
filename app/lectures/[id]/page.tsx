export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { ContentViewer } from "@/components/content-viewer"
// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
// import { notFound } from "next/navigation"

interface LecturePageProps {
  params: Promise<{ id: string }>
}

export default async function LecturePage({ params }: LecturePageProps) {
  const { id } = await params
  // COMMENTED OUT: Server-side data fetching and view count increment
  // const supabase = await createClient()

  // const { data: lecture } = await supabase
  //   .from("lectures")
  //   .select(`
  //     *,
  //     author:profiles(full_name),
  //     category:categories(name)
  //   `)
  //   .eq("id", id)
  //   .eq("published", true)
  //   .single()

  // if (!lecture) {
  //   notFound()
  // }

  // // Increment view count
  // await supabase
  //   .from("lectures")
  //   .update({ views: lecture.views + 1 })
  //   .eq("id", id)

  // Temporary placeholder data for development
  const lecture = {
    id: id,
    title: "Understanding Islamic Jurisprudence (Fiqh)",
    description: "A comprehensive introduction to Islamic legal methodology and its practical applications.",
    author: { full_name: "Dr. Abdullah Al-Faqih" },
    category: { name: "Jurisprudence" },
    views: 12345,
    created_at: "2024-01-15T00:00:00Z",
    audio_url: "/sample-lecture.mp3",
    duration: "45:30"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ContentViewer content={lecture} type="lecture" />
      </main>
    </div>
  )
}
