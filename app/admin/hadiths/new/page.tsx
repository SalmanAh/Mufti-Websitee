"use client"

import { useState } from "react"
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

export default function NewHadithPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
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
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('hadiths')
        .insert([{
          address: formData.address,
          revelation: formData.revelation,
          category: formData.category,
          arabic_text: formData.arabic_text,
          translation_eng: formData.translation_eng,
          translation_urdu: formData.translation_urdu,
          tafseer_eng: formData.tafseer_eng,
          tafseer_urdu: formData.tafseer_urdu
        }])
        .select()
      
      if (error) throw error
      
      toast.success("Hadith created successfully!")
      router.push("/admin/hadiths")
    } catch (error) {
      console.error("Error creating hadith:", error)
      toast.error("Failed to create hadith")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/hadiths">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Hadith</h1>
          <p className="text-muted-foreground">Create a new hadith entry for your website</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Hadith Details</CardTitle>
          <CardDescription>
            Fill in the information below to create a new hadith entry
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
                  placeholder="e.g., Sahih Bukhari 1:1"
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
                placeholder="Enter Arabic text of the hadith"
                rows={4}
                dir="rtl"
                className="text-right"
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
                {isLoading ? "Creating..." : "Create Hadith"}
              </Button>
              <Link href="/admin/hadiths">
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