export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { ContentViewer } from "@/components/content-viewer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface BookPageProps {
  params: Promise<{ id: string }>
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: book } = await supabase
    .from("books")
    .select(`
      *,
      author:profiles(full_name),
      category:categories(name)
    `)
    .eq("id", id)
    .eq("published", true)
    .single()

  if (!book) {
    notFound()
  }

  // Increment download count when accessed
  await supabase
    .from("books")
    .update({ downloads: book.downloads + 1 })
    .eq("id", id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ContentViewer content={book} type="book" />
      </main>
    </div>
  )
}
