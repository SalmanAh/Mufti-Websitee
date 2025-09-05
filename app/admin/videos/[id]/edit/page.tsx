"use client"

import { useState, useEffect } from "react"
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

interface EditVideoPageProps {
  params: { id: string }
}

export default function EditVideoPage({ params }: EditVideoPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    youtube_link: "",
    description: ""
  })

  const supabase = createClient()

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          console.error('Error fetching video:', error)
          toast.error('Failed to load video')
          router.push('/admin/videos')
          return
        }

        if (data) {
          setFormData({
            title: data.title || '',
            youtube_link: data.youtube_link || '',
            description: data.description || ''
          })
        }
      } catch (error) {
        console.error('Error in fetchVideo:', error)
        toast.error('An unexpected error occurred')
        router.push('/admin/videos')
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchVideo()
  }, [params.id, router, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.youtube_link.trim()) {
      toast.error("Title and YouTube link are required")
      return
    }

    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('videos')
        .update({
          title: formData.title,
          youtube_link: formData.youtube_link,
          description: formData.description
        })
        .eq('id', params.id)
        .select()
      
      if (error) throw error
      
      toast.success("Video updated successfully!")
      router.push("/admin/videos")
    } catch (error) {
      console.error("Error updating video:", error)
      toast.error("Failed to update video")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/videos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Video</h1>
            <p className="text-muted-foreground">Loading video data...</p>
          </div>
        </div>
        <Card className="max-w-2xl">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
        <Link href="/admin/videos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Video</h1>
          <p className="text-muted-foreground">Update the video information</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>
            Update the information below to modify the video
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
                placeholder="Enter YouTube video URL"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter video description (optional)"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Updating..." : "Update Video"}
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