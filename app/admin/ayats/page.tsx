"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { ContentTable } from "@/components/admin/content-table"
import { toast } from "sonner"

export default function AdminAyatsPage() {
  const [ayats, setAyats] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Placeholder ayats data - matches database schema
    const placeholderAyats = [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        address: "Surah Al-Fatiha, Verse 1",
        revelation: "Mecca",
        category: "Opening",
        arabic_text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation_eng: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        translation_urdu: "اللہ کے نام سے جو نہایت مہربان، رحم والا ہے۔",
        tafseer_eng: "This is the opening verse of the Quran, known as the Basmala. It begins every chapter except one and is recited before starting any good deed. It emphasizes Allah's mercy and compassion.",
        tafseer_urdu: "یہ قرآن کی ابتدائی آیت ہے جسے بسم اللہ کہا جاتا ہے۔ یہ ایک کے علاوہ ہر سورت کی شروعات میں آتی ہے اور ہر نیک کام سے پہلے پڑھی جاتی ہے۔",
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        address: "Surah Al-Baqarah, Verse 255",
        revelation: "Medina",
        category: "Throne Verse",
        arabic_text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
        translation_eng: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
        translation_urdu: "اللہ کے سوا کوئی معبود نہیں، وہ زندہ ہے، سب کا تھامنے والا ہے، اسے نہ اونگھ آتی ہے نہ نیند۔",
        tafseer_eng: "This is Ayat al-Kursi, one of the most powerful verses in the Quran. It describes Allah's absolute sovereignty, knowledge, and power over all creation.",
        tafseer_urdu: "یہ آیت الکرسی ہے، قرآن کی سب سے طاقتور آیات میں سے ایک۔ یہ اللہ کی مطلق بادشاہت، علم اور تمام مخلوقات پر قدرت کو بیان کرتی ہے۔",
        created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        address: "Surah Al-Ikhlas, Verse 1",
        revelation: "Mecca",
        category: "Monotheism",
        arabic_text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        translation_eng: "Say, He is Allah, [who is] One.",
        translation_urdu: "کہہ دو کہ وہ اللہ ایک ہے۔",
        tafseer_eng: "This verse begins Surah Al-Ikhlas, which is considered equivalent to one-third of the Quran. It establishes the absolute oneness and uniqueness of Allah.",
        tafseer_urdu: "یہ آیت سورہ اخلاص کی شروعات ہے، جو قرآن کے ایک تہائی کے برابر سمجھی جاتی ہے۔ یہ اللہ کی مطلق وحدانیت کو ثابت کرتی ہے۔",
        created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      }
    ]
    
    setAyats(placeholderAyats)
    setIsLoading(false)
  }, [])

  const handleEdit = (id: string) => {
    // Navigate to edit page
    window.location.href = `/admin/ayats/${id}/edit`
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ayat?")) return

    try {
      // Placeholder for actual delete functionality
      toast.success("Ayat deleted successfully")
      setAyats(ayats.filter(ayat => ayat.id !== id))
    } catch (error) {
      console.error("Error deleting ayat:", error)
      toast.error("Failed to delete ayat")
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      // Placeholder for actual toggle functionality
      toast.success(`Ayat ${published ? "published" : "unpublished"} successfully`)
      setAyats(ayats.map(ayat => 
        ayat.id === id ? { ...ayat, status: published ? "published" : "draft" } : ayat
      ))
    } catch (error) {
      console.error("Error updating ayat:", error)
      toast.error("Failed to update ayat")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Ayats Management</h1>
          <p className="text-muted-foreground">Loading ayats...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ayats Management</h1>
        <p className="text-muted-foreground">Manage Quranic verses, translations, and interpretations</p>
      </div>

      <ContentTable
        data={ayats}
        type="ayats"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublished={handleTogglePublished}
      />
    </div>
  )
}