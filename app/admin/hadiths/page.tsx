export const dynamic = 'force-dynamic'

import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/server"
import { AdminHadithsClient } from "./admin-hadiths-client"

export default async function AdminHadithsPage() {
  const supabase = await createClient()

  const { data: hadiths, error } = await supabase
    .from('hadiths')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching hadiths:', error)
    return <div className="p-6"><p className="text-red-600">Failed to fetch hadiths: {error.message}</p></div>
  }

  const transformedData = hadiths?.map(hadith => ({
    id: hadith.id,
    address: hadith.address,
    revelation: hadith.revelation,
    category: hadith.category,
    arabic_text: hadith.arabic_text,
    published: hadith.published,
    created_at: hadith.created_at
  })) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">Hadiths Management</h1>
      </div>
      
      <AdminHadithsClient initialData={transformedData} />
    </div>
  )
}