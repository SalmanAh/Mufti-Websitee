export const dynamic = 'force-dynamic'

import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/server"
import { AdminBooksClient } from "./admin-books-client"

export default async function AdminBooksPage() {
  const supabase = await createClient()

  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching books:', error)
    return <div className="p-6"><p className="text-red-600">Failed to fetch books: {error.message}</p></div>
  }

  const transformedData = books?.map(book => ({
    id: book.id,
    title: book.title,
    pdf_url: book.pdf_url,
    description: book.description,
    published: book.published,
    downloads: book.downloads || 0,
    created_at: book.created_at
  })) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">Books Management</h1>
      </div>
      
      <AdminBooksClient initialData={transformedData} />
    </div>
  )
}