"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { toast } from "sonner"

export default function AdminBooksPage() {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Placeholder books data - matches database schema
    const placeholderBooks = [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Tafsir Ibn Kathir - Complete Commentary",
        pdf_url: "https://example.com/books/tafsir-ibn-kathir.pdf",
        description: "A comprehensive commentary on the Quran by the renowned Islamic scholar Ibn Kathir. This complete work provides detailed explanations of Quranic verses with historical context and scholarly insights.",
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "Sahih al-Bukhari - Authentic Hadith Collection",
        pdf_url: "https://example.com/books/sahih-bukhari.pdf",
        description: "The most authentic collection of hadith compiled by Imam Bukhari. Contains thousands of verified sayings and actions of Prophet Muhammad (peace be upon him).",
        created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        title: "The Sealed Nectar - Biography of the Prophet",
        pdf_url: "https://example.com/books/sealed-nectar.pdf",
        description: "An award-winning biography of Prophet Muhammad (peace be upon him) by Safi-ur-Rahman al-Mubarakpuri, providing a comprehensive account of his life and teachings.",
        created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        title: "Fiqh us-Sunnah - Islamic Jurisprudence Guide",
        pdf_url: "https://example.com/books/fiqh-us-sunnah.pdf",
        description: "A comprehensive guide to Islamic jurisprudence by Sayyid Sabiq, covering various aspects of Islamic law and practice in an accessible format.",
        created_at: new Date(Date.now() - 345600000).toISOString() // 4 days ago
      }
    ]
    
    setBooks(placeholderBooks)
    setIsLoading(false)
  }, [])

  const handleEdit = (id: string) => {
    // Navigate to edit page
    window.location.href = `/admin/books/${id}/edit`
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return

    try {
      // Placeholder for actual delete functionality
      toast.success("Book deleted successfully")
      setBooks(books.filter(book => book.id !== id))
    } catch (error) {
      console.error("Error deleting book:", error)
      toast.error("Failed to delete book")
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      // Placeholder for actual toggle functionality
      toast.success(`Book ${published ? "published" : "unpublished"} successfully`)
      setBooks(books.map(book => 
        book.id === id ? { ...book, status: published ? "published" : "draft" } : book
      ))
    } catch (error) {
      console.error("Error updating book:", error)
      toast.error("Failed to update book")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Books Management</h1>
          <p className="text-muted-foreground">Loading books...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Books Management</h1>
        <p className="text-muted-foreground">Manage Islamic books, literature, and scholarly works</p>
      </div>

      <ContentTable
        data={books}
        type="books"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublished={handleTogglePublished}
      />
    </div>
  )
}