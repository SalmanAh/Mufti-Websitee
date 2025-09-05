export const dynamic = 'force-dynamic'

import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/server"
import { AdminArticlesClient } from "./admin-articles-client"

export default async function AdminArticlesPage() {
  const supabase = await createClient()

  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return <div className="p-6"><p className="text-red-600">Failed to fetch articles: {error.message}</p></div>
  }

  const transformedData = articles?.map(article => ({
    id: article.id,
    title: article.title,
    author: article.author,
    published: article.published,
    views: article.views || 0,
    created_at: article.created_at
  })) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">Articles Management</h1>
      </div>
      
      <AdminArticlesClient initialData={transformedData} />
    </div>
  )
}
