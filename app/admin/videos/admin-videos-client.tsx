"use client"

import { useState } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Video {
  id: string
  title: string
  youtube_link: string
  published: boolean
  views: number
  created_at: string
}

interface AdminVideosClientProps {
  initialData: Video[]
}

export function AdminVideosClient({ initialData }: AdminVideosClientProps) {
  const [videos, setVideos] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const fetchVideos = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching videos:', error)
        toast.error('Failed to fetch videos')
        return
      }

      const transformedData = data?.map(video => ({
        id: video.id,
        title: video.title,
        youtube_link: video.youtube_link,
        published: video.published,
        views: video.views || 0,
        created_at: video.created_at
      })) || []

      setVideos(transformedData)
    } catch (error) {
      console.error('Error in fetchVideos:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting video:', error)
        toast.error('Failed to delete video')
        return
      }

      toast.success('Video deleted successfully')
      fetchVideos() // Refresh the list
    } catch (error) {
      console.error('Error in handleDelete:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ published: !currentStatus })
        .eq('id', id)

      if (error) {
        console.error('Error updating video:', error)
        toast.error('Failed to update video')
        return
      }

      toast.success('Video updated successfully')
      fetchVideos() // Refresh the list
    } catch (error) {
      console.error('Error in handleTogglePublished:', error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <ContentTable
      data={videos}
      type="videos"
      isLoading={isLoading}
      onDelete={handleDelete}
      onTogglePublished={handleTogglePublished}
      onRefresh={fetchVideos}
    />
  )
}