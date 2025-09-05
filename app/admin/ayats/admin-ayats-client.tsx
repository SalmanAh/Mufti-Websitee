"use client"

import { useState } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface AyatData {
  id: string
  address: string
  revelation: string
  category: string
  arabic_text: string
  published: boolean
  created_at: string
}

interface AdminAyatsClientProps {
  initialData: AyatData[]
}

export function AdminAyatsClient({ initialData }: AdminAyatsClientProps) {
  const [ayats, setAyats] = useState<AyatData[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const fetchAyats = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('ayats')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching ayats:', error)
        toast.error('Failed to fetch ayats')
        return
      }

      const transformedData = data?.map(ayat => ({
        id: ayat.id,
        address: ayat.address,
        revelation: ayat.revelation,
        category: ayat.category,
        arabic_text: ayat.arabic_text,
        published: ayat.published,
        created_at: ayat.created_at
      })) || []

      setAyats(transformedData)
    } catch (error) {
      console.error('Error fetching ayats:', error)
      toast.error('Failed to fetch ayats')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (id: string) => {
    window.location.href = `/admin/ayats/${id}/edit`
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ayat?")) return

    try {
      const { error } = await supabase
        .from('ayats')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting ayat:', error)
        toast.error('Failed to delete ayat')
        return
      }

      toast.success("Ayat deleted successfully")
      setAyats(ayats.filter(ayat => ayat.id !== id))
    } catch (error) {
      console.error("Error deleting ayat:", error)
      toast.error("Failed to delete ayat")
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('ayats')
        .update({ published })
        .eq('id', id)

      if (error) {
        console.error('Error updating ayat:', error)
        toast.error('Failed to update ayat')
        return
      }

      toast.success(`Ayat ${published ? "published" : "unpublished"} successfully`)
      setAyats(ayats.map(ayat => 
        ayat.id === id ? { ...ayat, published } : ayat
      ))
    } catch (error) {
      console.error("Error updating ayat:", error)
      toast.error("Failed to update ayat")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <ContentTable
      data={ayats}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onTogglePublished={handleTogglePublished}
      type="ayats"
    />
  )
}