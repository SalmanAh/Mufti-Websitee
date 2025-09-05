"use client"

import { useState } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Article {
  id: string
  title: string
  author: string
  published: boolean
  views: number
  created_at: string
}

interface AdminArticlesClientProps {
  initialData: Article[]
}

export function AdminArticlesClient({ initialData }: AdminArticlesClientProps) {
  const [articles, setArticles] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching articles:', error)
        toast.error('Failed to fetch articles')
        return
      }

      const transformedData = data?.map(article => ({
        id: article.id,
        title: article.title,
        author: article.author,
        published: article.published,
        views: article.views || 0,
        created_at: article.created_at
      })) || []

      setArticles(transformedData)
    } catch (error) {
      console.error('Error in fetchArticles:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting article:', error)
        toast.error('Failed to delete article')
        return
      }

      toast.success('Article deleted successfully')
      fetchArticles() // Refresh the list
    } catch (error) {
      console.error('Error in handleDelete:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !currentStatus })
        .eq('id', id)

      if (error) {
        console.error('Error updating article:', error)
        toast.error('Failed to update article')
        return
      }

      toast.success('Article updated successfully')
      fetchArticles() // Refresh the list
    } catch (error) {
      console.error('Error in handleTogglePublished:', error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <ContentTable
      data={articles}
      type="articles"
      onDelete={handleDelete}
      onTogglePublished={handleTogglePublished}
    />
  )
}