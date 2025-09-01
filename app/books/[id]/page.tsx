export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { ContentViewer } from "@/components/content-viewer"
// COMMENTED OUT: Server-side Supabase implementation using placeholder environment variables
// import { createClient } from "@/lib/supabase/server"
// import { notFound } from "next/navigation"

interface BookPageProps {
  params: Promise<{ id: string }>
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params
  // COMMENTED OUT: Server-side data fetching and download count increment
  // const supabase = await createClient()

  // const { data: book } = await supabase
  //   .from("books")
  //   .select(`
  //     *,
  //     author:profiles(full_name),
  //     category:categories(name)
  //   `)
  //   .eq("id", id)
  //   .eq("published", true)
  //   .single()

  // if (!book) {
  //   notFound()
  // }

  // // Increment download count when accessed
  // await supabase
  //   .from("books")
  //   .update({ downloads: book.downloads + 1 })
  //   .eq("id", id)

  // Temporary placeholder data for development
  const book = {
    id: id,
    title: "The Sealed Nectar (Ar-Raheeq Al-Makhtum)",
    description: "A comprehensive biography of Prophet Muhammad (PBUH) - Winner of the World Muslim League Prize.",
    author: { full_name: "Safi-ur-Rahman al-Mubarakpuri" },
    category: { name: "Biography" },
    downloads: 15420,
    created_at: "2024-01-20T00:00:00Z",
    cover_image: "/arabic-manuscript-and-books.png",
    pages: 635,
    language: "English"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ContentViewer content={book} type="book" />
      </main>
    </div>
  )
}
