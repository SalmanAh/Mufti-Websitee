"use client"

import { useState } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Book {
  id: string
  title: string
  pdf_url: string
  description: string
  published: boolean
  downloads: number
  created_at: string
}

interface AdminBooksClientProps {
  initialData: Book[]
}

export function AdminBooksClient({ initialData }: AdminBooksClientProps) {
  const [books, setBooks] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const fetchBooks = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching books:', error)
        toast.error('Failed to fetch books')
        return
      }

      const transformedData = data?.map(book => ({
        id: book.id,
        title: book.title,
        pdf_url: book.pdf_url,
        description: book.description,
        published: book.published,
        downloads: book.downloads || 0,
        created_at: book.created_at
      })) || []

      setBooks(transformedData)
    } catch (error) {
      console.error('Error in fetchBooks:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting book:', error)
        toast.error('Failed to delete book')
        return
      }

      toast.success('Book deleted successfully')
      fetchBooks() // Refresh the list
    } catch (error) {
      console.error('Error in handleDelete:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('books')
        .update({ published: !currentStatus })
        .eq('id', id)

      if (error) {
        console.error('Error updating book:', error)
        toast.error('Failed to update book')
        return
      }

      toast.success('Book updated successfully')
      fetchBooks() // Refresh the list
    } catch (error) {
      console.error('Error in handleTogglePublished:', error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <ContentTable
      data={books}
      type="books"
      isLoading={isLoading}
      onDelete={handleDelete}
      onTogglePublished={handleTogglePublished}
      onRefresh={fetchBooks}
    />
  )
}