"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { ContentTable } from "@/components/admin/content-table"
// Supabase client removed
import { toast } from "sonner"

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Placeholder articles data - matches database schema
    const placeholderArticles = [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Understanding Islamic Principles",
        content: "This is a comprehensive article about the fundamental principles of Islam, covering the five pillars and their significance in a Muslim's daily life.",
        author: "Dr. Ahmad Hassan",
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "The Importance of Prayer in Islam",
        content: "An in-depth exploration of Salah (prayer) as one of the five pillars of Islam, discussing its spiritual significance and practical implementation.",
        author: "Sheikh Ali Rahman",
        created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        title: "Zakat: The Third Pillar of Islam",
        content: "Understanding the concept of Zakat, its calculation, and its role in creating social justice and economic balance in Islamic society.",
        author: "Dr. Fatima Al-Zahra",
        created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      }
    ]
    
    setArticles(placeholderArticles)
    setIsLoading(false)
  }, [])

  const handleEdit = (id: string) => {
    // Navigate to edit page
    window.location.href = `/admin/articles/${id}/edit`
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const { error } = await supabase.from("articles").delete().eq("id", id)
      if (error) throw error

      toast.success("Article deleted successfully")
      fetchArticles()
    } catch (error) {
      console.error("Error deleting article:", error)
      toast.error("Failed to delete article")
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase.from("articles").update({ published }).eq("id", id)
      if (error) throw error

      toast.success(`Article ${published ? "published" : "unpublished"} successfully`)
      fetchArticles()
    } catch (error) {
      console.error("Error updating article:", error)
      toast.error("Failed to update article")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Articles Management</h1>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Articles Management</h1>
        <p className="text-muted-foreground">Manage your articles, drafts, and publications</p>
      </div>

      <ContentTable
        data={articles}
        type="articles"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublished={handleTogglePublished}
      />
    </div>
  )
}
