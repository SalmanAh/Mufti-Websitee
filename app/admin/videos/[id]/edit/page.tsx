"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function EditVideoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    youtube_link: "",
    description: ""
  })
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [currentThumbnail, setCurrentThumbnail] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const supabase = createClient()
  // Define id from params (supports string or array)
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('id', id)
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
          setCurrentThumbnail(data.thumbnail || "")
        }
      } catch (error) {
        console.error('Error in fetchVideo:', error)
        toast.error('An unexpected error occurred')
        router.push('/admin/videos')
      } finally {
        setIsLoadingData(false)
      }
    }

    if (id) {
      fetchVideo()
    }
  }, [id, router, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file)
    } else {
      toast.error('Please select a valid image file')
    }
  }

  const uploadThumbnailToSupabase = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `video-thumbnails/${fileName}`

      const { error } = await supabase.storage
        .from('E-Books')
        .upload(filePath, file)

      if (error) {
        console.error('Supabase upload error:', error)
        throw error
      }

      const { data: { publicUrl } } = supabase.storage
        .from('E-Books')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.youtube_link.trim()) {
      toast.error("Title and YouTube link are required")
      return
    }

    setIsLoading(true)
    
    try {
      let thumbnailUrl = currentThumbnail
      if (thumbnailFile) {
        setIsUploading(true)
        thumbnailUrl = await uploadThumbnailToSupabase(thumbnailFile)
      }

      const { data, error } = await supabase
        .from('videos')
        .update({
          title: formData.title,
          youtube_link: formData.youtube_link,
          description: formData.description,
          thumbnail: thumbnailUrl || null
        })
        .eq('id', id)
        .select()
      
      if (error) throw error
      
      toast.success("Video updated successfully!")
      router.push("/admin/videos")
    } catch (error) {
      console.error("Error updating video:", error)
      toast.error("Failed to update video")
    } finally {
      setIsLoading(false)
      setIsUploading(false)
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
              <Label htmlFor="thumbnail">Thumbnail Image (optional)</Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="cursor-pointer"
              />
              {thumbnailFile ? (
                <p className="text-sm text-muted-foreground">
                  Selected: {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              ) : currentThumbnail ? (
                <p className="text-sm text-muted-foreground">
                  Current thumbnail set
                </p>
              ) : null}
              {isUploading && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  </div>
                  <span>Uploading thumbnail...</span>
                </div>
              )}
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
              <Button type="submit" disabled={isLoading || isUploading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading || isUploading ? "Updating..." : "Update Video"}
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