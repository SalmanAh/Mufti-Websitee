"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { toast } from "sonner"

export default function AdminHadithsPage() {
  const [hadiths, setHadiths] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Placeholder hadiths data - matches database schema
    const placeholderHadiths = [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        address: "Sahih Bukhari, Book 3, Hadith 47",
        revelation: "Medina",
        category: "Knowledge",
        arabic_text: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        translation_eng: "Seeking knowledge is an obligation upon every Muslim.",
        translation_urdu: "علم حاصل کرنا ہر مسلمان پر فرض ہے۔",
        tafseer_eng: "This hadith emphasizes the importance of seeking knowledge in Islam. It shows that learning is not just recommended but obligatory for all Muslims, regardless of gender or social status.",
        tafseer_urdu: "یہ حدیث اسلام میں علم حاصل کرنے کی اہمیت پر زور دیتی ہے۔ یہ ظاہر کرتی ہے کہ سیکھنا صرف مستحب نہیں بلکہ تمام مسلمانوں کے لیے فرض ہے۔",
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        address: "Sahih Muslim, Book 32, Hadith 6180",
        revelation: "Medina",
        category: "Family Relations",
        arabic_text: "الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ",
        translation_eng: "Paradise lies at the feet of mothers.",
        translation_urdu: "جنت ماؤں کے قدموں تلے ہے۔",
        tafseer_eng: "This hadith highlights the elevated status of mothers in Islam and emphasizes the importance of being dutiful and kind to one's mother as a path to Paradise.",
        tafseer_urdu: "یہ حدیث اسلام میں ماؤں کے بلند مقام کو اجاگر کرتی ہے اور اپنی ماں کے ساتھ نیکی اور احسان کو جنت کا راستہ قرار دیتی ہے۔",
        created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        address: "Sunan Tirmidhi, Book 2, Hadith 616",
        revelation: "Mecca",
        category: "Prayer",
        arabic_text: "الصَّلاَةُ عِمَادُ الدِّينِ",
        translation_eng: "Prayer is the pillar of religion.",
        translation_urdu: "نماز دین کا ستون ہے۔",
        tafseer_eng: "This hadith emphasizes that prayer (Salah) is fundamental to the Islamic faith, serving as its main pillar and support, without which the structure of faith cannot stand properly.",
        tafseer_urdu: "یہ حدیث اس بات پر زور دیتی ہے کہ نماز اسلامی عقیدے کی بنیاد ہے، جو اس کا اصل ستون اور سہارا ہے، جس کے بغیر ایمان کی عمارت مضبوط نہیں رہ سکتی۔",
        created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      }
    ]
    
    setHadiths(placeholderHadiths)
    setIsLoading(false)
  }, [])

  const handleEdit = (id: string) => {
    // Navigate to edit page
    window.location.href = `/admin/hadiths/${id}/edit`
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hadith?")) return

    try {
      // Placeholder for actual delete functionality
      toast.success("Hadith deleted successfully")
      setHadiths(hadiths.filter(hadith => hadith.id !== id))
    } catch (error) {
      console.error("Error deleting hadith:", error)
      toast.error("Failed to delete hadith")
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      // Placeholder for actual toggle functionality
      toast.success(`Hadith ${published ? "published" : "unpublished"} successfully`)
      setHadiths(hadiths.map(hadith => 
        hadith.id === id ? { ...hadith, status: published ? "published" : "draft" } : hadith
      ))
    } catch (error) {
      console.error("Error updating hadith:", error)
      toast.error("Failed to update hadith")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hadiths Management</h1>
          <p className="text-muted-foreground">Loading hadiths...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hadiths Management</h1>
        <p className="text-muted-foreground">Manage hadith collections, narrations, and Islamic teachings</p>
      </div>

      <ContentTable
        data={hadiths}
        type="hadiths"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublished={handleTogglePublished}
      />
    </div>
  )
}