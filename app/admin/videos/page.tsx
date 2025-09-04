"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { toast } from "sonner"

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Placeholder videos data - matches database schema
    const placeholderVideos = [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Introduction to Islamic History",
        youtube_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        description: "An educational video covering the rich history of Islam from its origins to the modern era, exploring key events and influential figures.",
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "The Five Pillars of Islam Explained",
        youtube_link: "https://www.youtube.com/watch?v=abc123def456",
        description: "A comprehensive guide to understanding the five fundamental pillars of Islam and their significance in a Muslim's life.",
        created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        title: "Beautiful Quranic Recitation - Surah Al-Fatiha",
        youtube_link: "https://www.youtube.com/watch?v=xyz789uvw012",
        description: "Learn the proper pronunciation and recitation techniques for Surah Al-Fatiha with this guided tutorial.",
        created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      }
    ]
    
    setVideos(placeholderVideos)
    setIsLoading(false)
  }, [])

  const handleEdit = (id: string) => {
    // Navigate to edit page
    window.location.href = `/admin/videos/${id}/edit`
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return

    try {
      // Placeholder for actual delete functionality
      toast.success("Video deleted successfully")
      setVideos(videos.filter(video => video.id !== id))
    } catch (error) {
      console.error("Error deleting video:", error)
      toast.error("Failed to delete video")
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      // Placeholder for actual toggle functionality
      toast.success(`Video ${published ? "published" : "unpublished"} successfully`)
      setVideos(videos.map(video => 
        video.id === id ? { ...video, status: published ? "published" : "draft" } : video
      ))
    } catch (error) {
      console.error("Error updating video:", error)
      toast.error("Failed to update video")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Videos Management</h1>
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Videos Management</h1>
        <p className="text-muted-foreground">Manage your video content, lectures, and educational materials</p>
      </div>

      <ContentTable
        data={videos}
        type="videos"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublished={handleTogglePublished}
      />
    </div>
  )
}