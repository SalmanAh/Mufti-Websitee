"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function NewVideoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    youtube_link: "",
    description: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateYouTubeLink = (url: string) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    return youtubeRegex.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.youtube_link.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!validateYouTubeLink(formData.youtube_link)) {
      toast.error("Please enter a valid YouTube URL")
      return
    }

    setIsLoading(true)
    
    try {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('videos')
        .insert([{
          title: formData.title,
          youtube_link: formData.youtube_link,
          description: formData.description
        }])
        .select()
      
      if (error) throw error
      
      toast.success("Video created successfully!")
      router.push("/admin/videos")
    } catch (error) {
      console.error("Error creating video:", error)
      toast.error("Failed to create video")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/videos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Video</h1>
          <p className="text-muted-foreground">Create a new video entry for your website</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>
            Fill in the information below to create a new video entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter video title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube_link">YouTube Link *</Label>
              <Input
                id="youtube_link"
                name="youtube_link"
                value={formData.youtube_link}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
                type="url"
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter video description (optional)"
                rows={6}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Creating..." : "Create Video"}
              </Button>
              <Link href="/admin/videos">
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