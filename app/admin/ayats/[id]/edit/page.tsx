"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { QuillEditor } from "@/components/ui/quill-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface EditAyatPageProps {
  params: { id: string }
}

export default function EditAyatPage({ params }: EditAyatPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    address: "",
    revelation: "",
    category: "",
    arabic_text: "",
    translation_eng: "",
    translation_urdu: "",
    tafseer_eng: "",
    tafseer_urdu: ""
  })

  const supabase = createClient()

  useEffect(() => {
    const fetchAyat = async () => {
      try {
        const { data, error } = await supabase
          .from('ayats')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          console.error('Error fetching ayat:', error)
          toast.error('Failed to load ayat')
          router.push('/admin/ayats')
          return
        }

        if (data) {
          setFormData({
            address: data.address || '',
            revelation: data.revelation || '',
            category: data.category || '',
            arabic_text: data.arabic_text || '',
            translation_eng: data.translation_eng || '',
            translation_urdu: data.translation_urdu || '',
            tafseer_eng: data.tafseer_eng || '',
            tafseer_urdu: data.tafseer_urdu || ''
          })
        }
      } catch (error) {
        console.error('Error in fetchAyat:', error)
        toast.error('An unexpected error occurred')
        router.push('/admin/ayats')
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchAyat()
  }, [params.id, router, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTafseerEngChange = (content: string) => {
    setFormData(prev => ({ ...prev, tafseer_eng: content }))
  }

  const handleTafseerUrduChange = (content: string) => {
    setFormData(prev => ({ ...prev, tafseer_urdu: content }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.address.trim() || !formData.arabic_text.trim()) {
      toast.error("Please fill in the required fields (Address and Arabic Text)")
      return
    }

    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('ayats')
        .update({
          address: formData.address,
          revelation: formData.revelation,
          category: formData.category,
          arabic_text: formData.arabic_text,
          translation_eng: formData.translation_eng,
          translation_urdu: formData.translation_urdu,
          tafseer_eng: formData.tafseer_eng,
          tafseer_urdu: formData.tafseer_urdu
        })
        .eq('id', params.id)
        .select()
      
      if (error) throw error
      
      toast.success("Ayat updated successfully!")
      router.push("/admin/ayats")
    } catch (error) {
      console.error("Error updating ayat:", error)
      toast.error("Failed to update ayat")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/ayats">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Ayat</h1>
            <p className="text-muted-foreground">Loading ayat data...</p>
          </div>
        </div>
        <Card className="max-w-4xl">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/ayats">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Ayat</h1>
          <p className="text-muted-foreground">Update the Quranic verse information</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Ayat Details</CardTitle>
          <CardDescription>
            Update the information below to modify the Quranic verse entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g., Surah Al-Fatiha 1:1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revelation">Revelation</Label>
                <Input
                  id="revelation"
                  name="revelation"
                  value={formData.revelation}
                  onChange={handleInputChange}
                  placeholder="e.g., Meccan, Medinan"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Faith, Prayer, Charity"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arabic_text">Arabic Text *</Label>
              <Textarea
                id="arabic_text"
                name="arabic_text"
                value={formData.arabic_text}
                onChange={handleInputChange}
                placeholder="أدخل النص العربي للآية"
                rows={6}
                dir="rtl"
                className="arabic-input"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="translation_eng">English Translation</Label>
                <Textarea
                  id="translation_eng"
                  name="translation_eng"
                  value={formData.translation_eng}
                  onChange={handleInputChange}
                  placeholder="Enter English translation"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="translation_urdu">Urdu Translation</Label>
                <Textarea
                  id="translation_urdu"
                  name="translation_urdu"
                  value={formData.translation_urdu}
                  onChange={handleInputChange}
                  placeholder="Enter Urdu translation"
                  rows={4}
                  dir="rtl"
                  className="text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tafseer_eng">English Tafseer</Label>
                <QuillEditor
                  value={formData.tafseer_eng}
                  onChange={handleTafseerEngChange}
                  placeholder="Enter English commentary/explanation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tafseer_urdu">Urdu Tafseer</Label>
                <QuillEditor
                  value={formData.tafseer_urdu}
                  onChange={handleTafseerUrduChange}
                  placeholder="Enter Urdu commentary/explanation"
                  className="[&_.ProseMirror]:text-right [&_.ProseMirror]:dir-rtl"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Updating..." : "Update Ayat"}
              </Button>
              <Link href="/admin/ayats">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}