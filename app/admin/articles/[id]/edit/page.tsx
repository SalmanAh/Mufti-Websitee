"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QuillEditor } from "@/components/ui/quill-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface EditArticlePageProps {
  params: { id: string }
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: ""
  })

  const supabase = createClient()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          console.error('Error fetching article:', error)
          toast.error('Failed to load article')
          router.push('/admin/articles')
          return
        }

        if (data) {
          setFormData({
            title: data.title || '',
            author: data.author || '',
            content: data.content || ''
          })
        }
      } catch (error) {
        console.error('Error in fetchArticle:', error)
        toast.error('An unexpected error occurred')
        router.push('/admin/articles')
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchArticle()
  }, [params.id, router, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.author.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('articles')
        .update({
          title: formData.title,
          author: formData.author,
          content: formData.content
        })
        .eq('id', params.id)
        .select()
      
      if (error) throw error
      
      toast.success("Article updated successfully!")
      router.push("/admin/articles")
    } catch (error) {
      console.error("Error updating article:", error)
      toast.error("Failed to update article")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Article</h1>
            <p className="text-muted-foreground">Loading article data...</p>
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
        <Link href="/admin/articles">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Article</h1>
          <p className="text-muted-foreground">Update the article information</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Update the information below to modify the article
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
                placeholder="Enter article title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <QuillEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Write your article content here..."
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Updating..." : "Update Article"}
              </Button>
              <Link href="/admin/articles">
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