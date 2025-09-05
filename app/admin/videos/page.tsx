export const dynamic = 'force-dynamic'

import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/server"
import { AdminVideosClient } from "./admin-videos-client"

export default async function AdminVideosPage() {
  const supabase = await createClient()

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching videos:', error)
    return <div className="p-6"><p className="text-red-600">Failed to fetch videos: {error.message}</p></div>
  }

  const transformedData = videos?.map(video => ({
    id: video.id,
    title: video.title,
    youtube_link: video.youtube_link,
    published: video.published,
    views: video.views || 0,
    created_at: video.created_at
  })) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">Videos Management</h1>
      </div>
      
      <AdminVideosClient initialData={transformedData} />
    </div>
  )
}