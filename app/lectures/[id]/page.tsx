import { Navigation } from "@/components/navigation"
import { ContentViewer } from "@/components/content-viewer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface LecturePageProps {
  params: Promise<{ id: string }>
}

export default async function LecturePage({ params }: LecturePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: lecture } = await supabase
    .from("lectures")
    .select(`
      *,
      author:profiles(full_name),
      category:categories(name)
    `)
    .eq("id", id)
    .eq("published", true)
    .single()

  if (!lecture) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("lectures")
    .update({ views: lecture.views + 1 })
    .eq("id", id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ContentViewer content={lecture} type="lecture" />
      </main>
    </div>
  )
}
