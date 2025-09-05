"use client"

import { useState } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Hadith {
  id: string
  address: string
  revelation: string
  category: string
  arabic_text: string
  published: boolean
  created_at: string
}

interface AdminHadithsClientProps {
  initialData: Hadith[]
}

export function AdminHadithsClient({ initialData }: AdminHadithsClientProps) {
  const [hadiths, setHadiths] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const fetchHadiths = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('hadiths')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching hadiths:', error)
        toast.error('Failed to fetch hadiths')
        return
      }

      const transformedData = data?.map(hadith => ({
        id: hadith.id,
        address: hadith.address,
        revelation: hadith.revelation,
        category: hadith.category,
        arabic_text: hadith.arabic_text,
        published: hadith.published,
        created_at: hadith.created_at
      })) || []

      setHadiths(transformedData)
    } catch (error) {
      console.error('Error in fetchHadiths:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('hadiths')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting hadith:', error)
        toast.error('Failed to delete hadith')
        return
      }

      toast.success('Hadith deleted successfully')
      fetchHadiths() // Refresh the list
    } catch (error) {
      console.error('Error in handleDelete:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('hadiths')
        .update({ published: !currentStatus })
        .eq('id', id)

      if (error) {
        console.error('Error updating hadith:', error)
        toast.error('Failed to update hadith')
        return
      }

      toast.success('Hadith updated successfully')
      fetchHadiths() // Refresh the list
    } catch (error) {
      console.error('Error in handleTogglePublished:', error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <ContentTable
      data={hadiths}
      type="hadiths"
      isLoading={isLoading}
      onDelete={handleDelete}
      onTogglePublished={handleTogglePublished}
      onRefresh={fetchHadiths}
    />
  )
}