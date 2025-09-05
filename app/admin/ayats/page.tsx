export const dynamic = 'force-dynamic'

import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/server"
import { AdminAyatsClient } from "./admin-ayats-client"

export default async function AdminAyatsPage() {
  const supabase = await createClient()

  const { data: ayats, error } = await supabase
    .from('ayats')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching ayats:', error)
    return <div className="p-6"><p className="text-red-600">Failed to fetch ayats: {error.message}</p></div>
  }

  const transformedData = ayats?.map(ayat => ({
    id: ayat.id,
    address: ayat.address,
    revelation: ayat.revelation,
    category: ayat.category,
    arabic_text: ayat.arabic_text,
    published: ayat.published,
    created_at: ayat.created_at
  })) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">Ayats Management</h1>
      </div>
      
      <AdminAyatsClient initialData={transformedData} />
    </div>
  )
}