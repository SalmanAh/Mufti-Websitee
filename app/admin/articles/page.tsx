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
    // Placeholder articles data - database functionality removed
    const placeholderArticles = [
      {
        id: "1",
        title: "Understanding Islamic Principles",
        content: "Sample article content...",
        author: { full_name: "Dr. Ahmad" },
        category: { name: "Islamic Studies" },
        created_at: new Date().toISOString(),
        status: "published"
      },
      {
        id: "2",
        title: "The Importance of Prayer",
        content: "Sample article content...",
        author: { full_name: "Scholar Ali" },
        category: { name: "Worship" },
        created_at: new Date().toISOString(),
        status: "published"
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
